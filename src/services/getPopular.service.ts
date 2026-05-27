import { load } from "cheerio";
import { apiSecond } from "../shared/lib/api.js";
import type { KomikType } from "../shared/types/index.js";
import { slugFilter } from "../shared/lib/utils/index.js";

type PopularQuery = {
  page: number;
  orderby?: "modified" | "date" | "rand" | "meta_value_num";
  type?: KomikType;
};

export const popularService = async (query: PopularQuery) => {
  try {
    const res = await apiSecond.get(`/other/hot/page/${query.page}`, {
      params: { ...query, tipe: query.type },
    });
    const $ = load(res.data);

    const popular: any[] = [];

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
      const parts = judul2.split("•").map((p) => p.trim());

      const views = parts[0] || "";
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

      popular.push({
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

    return { data: popular };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
