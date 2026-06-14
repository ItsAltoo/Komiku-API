import { load } from "cheerio";
import { apiSecond } from "../shared/lib/api.js";
import type { ApiResponse, BaseChapter, BaseComic, GenreType, KomikType } from "../shared/types/index.js";
import { slugFilter } from "../shared/lib/utils/slugFilter.js";

type LatestQuery = {
  page: number;
  orderBy?: "modified" | "date" | "rand" | "ranking";
  type?: KomikType;
  genre?: GenreType;
  genre2?: GenreType;
  status?: "ongoing" | "end";
};

export type LatestComic = BaseComic & {
  description: string;
  updateCount: string;
  status: {
    views: string;
    timeAgo: string;
    isColored: boolean;
  };
  chapters: {
    initial: BaseChapter;
    latest: BaseChapter;
  };
};

export const latestService = async (
  query: LatestQuery,
): Promise<ApiResponse<LatestComic[]>> => {
  try {
    const { orderBy, type, ...rest } = query;
    const mappedOrderBy = orderBy === "ranking" ? "meta_value_num" : orderBy;

    const res = await apiSecond.get(`/manga/page/${query.page}`, {
      params: { ...rest, tipe: type, orderby: mappedOrderBy },
    });

    const $ = load(res.data);

    const latest: LatestComic[] = [];

    $("body div.bge").each((_, el) => {
      const bgei = $(el).find(".bgei");
      const kan = $(el).find(".kan");

      // Element bgei
      const slug = slugFilter(bgei.find("a").attr("href") || "");
      const thumbnail = bgei.find("a img").attr("src") || "";
      const updateCount = bgei.find("span.up").text().trim();

      // Element kan
      const title = kan.find("a h3").text().trim();
      const description = kan.find("p").text().trim();

      const judul2 = kan.find("span.judul2").text().trim();
      const parts = judul2.split("|").map((p) => p.trim());

      const views = kan.find("span.judul2 span>b").text().trim();
      const timeAgo = parts[1] || "";
      const isColored = parts[2]?.toLowerCase().includes("berwarna") ?? false;

      const chapters = kan.find("div.new1");

      const initialChapter = chapters.eq(0).find("a>span").eq(1).text().trim();
      const initialChapterSlug = slugFilter(
        chapters.eq(0).find("a").attr("href") || "",
      );

      const latestChapter = chapters.eq(1).find("a>span").eq(1).text().trim();
      const latestChapterSlug = slugFilter(
        chapters.eq(1).find("a").attr("href") || "",
      );

      latest.push({
        title,
        slug,
        thumbnail,
        description,
        updateCount,
        status: {
          views,
          timeAgo,
          isColored,
        },
        chapters: {
          initial: {
            title: initialChapter,
            slug: initialChapterSlug,
          },
          latest: {
            title: latestChapter,
            slug: latestChapterSlug,
          },
        },
      });
    });

    return { data: latest };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
