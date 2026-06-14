import { load } from "cheerio";
import { api } from "../shared/lib/api.js";
import { slugFilter } from "../shared/lib/utils/index.js";
import type { ApiResponse, BaseComic } from "../shared/types/index.js";

export type FeaturedGenreComic = BaseComic & {
  flag: string;
  status: {
    genre: string;
    views: string;
  };
  latestChapter: string;
  latestChapterSlug: string;
};

export type FeaturedGenreGroup = {
  genre: string;
  items: FeaturedGenreComic[];
};

export const getFeaturedGenresService = async (
  name?: string,
): Promise<ApiResponse<FeaturedGenreGroup[]>> => {
  try {
    const res = await api.get("/");
    const $ = load(res.data);

    const selectorMap: Record<string, string> = {
      isekai: "Komik Isekai",
      fantasy: "Komik Fantasi",
      romance: "Komik Romance",
      ecchi: "Komik Ecchi",
      drama: "Komik Drama",
      sliceOfLife: "Komik Slice of Life",
      schoolLife: "Komik School Life",
      comedy: "Komik Comedy",
      action: "Komik Action",
      adventure: "Komik Petualangan",
    };

    const targetGenre = name ? selectorMap[name] : undefined;

    const genreList: FeaturedGenreGroup[] = [];

    $("section.ls.lsgenre").each((_, section) => {
      const sectionEl = $(section);
      const genreLabel = sectionEl.find("h2.lsh3").text().trim();

      if (targetGenre && genreLabel !== targetGenre) return;

      const items: FeaturedGenreComic[] = [];

      sectionEl.find("article.ls2").each((_, el) => {
        const v = $(el).find(".ls2v");
        const j = $(el).find(".ls2j");

        // Element V
        const slug = slugFilter(v.find("a").attr("href") || "");
        const thumbnail = v.find("a img").attr("data-src") || "";
        const flagRaw = v.find("img.flag").attr("src") || "";
        const flag = flagRaw ? process.env.BASE_URL + flagRaw : "";

        // Element J
        const title = j.find("h3 a").text().trim();

        const status = j.find("span.ls2t").text().trim();
        const parts = status.split("·").map((p) => p.trim());
        const genre = parts[0] || "";
        const views = parts[1] || "";

        const latestChapter = j.find("a.ls2l").text().trim();
        const latestChapterSlug = slugFilter(j.find("a.ls2l").attr("href") || "");

        items.push({
          title,
          slug,
          thumbnail,
          flag,
          status: {
            genre,
            views,
          },
          latestChapter,
          latestChapterSlug,
        });
      });

      genreList.push({ genre: genreLabel, items });
    });

    return { data: genreList };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
