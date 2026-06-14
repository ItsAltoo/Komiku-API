import { load } from "cheerio";
import { api } from "../shared/lib/api.js";
import { slugFilter } from "../shared/lib/utils/slugFilter.js";
import type { ApiResponse, BaseComic } from "../shared/types/index.js";

const selectorMap: Record<string, string> = {
  manga: "manga",
  manhwa: "manhwa",
  manhua: "manhua",
};

export type JustAddedComic = BaseComic & {
  updateCount: string;
  status: {
    genre: string;
    views: string;
  };
  latestChapter: string;
  latestChapterSlug: string;
  flag: string;
};

export const justAddedService = async (
  type: string,
): Promise<ApiResponse<JustAddedComic[]>> => {
  try {
    const res = await api.get("/");
    const $ = load(res.data);

    const filteredType = selectorMap[type]
      ?.charAt(0)
      .toUpperCase()
      .concat(selectorMap[type]?.slice(1));

    const justAdded: JustAddedComic[] = [];

    $(
      `#Baru_Ditambahkan #ls12-baru article.ls2${filteredType ? `[data-tipe="${filteredType}"]` : ""}`,
    ).each((_, el) => {
      const v = $(el).find(".ls2v");
      const j = $(el).find(".ls2j");

      // Element V
      const slug = slugFilter(v.find("a").attr("href") || "");
      const thumbnail = v.find("a img").attr("data-src") || "";
      const flagRaw = v.find("img.flag").attr("src") || "";
      const flag = flagRaw ? process.env.BASE_URL + flagRaw : "";
      const updateCount = v.find("span.up").text().trim();

      // Element J
      const title = j.find("h3 a").text().trim();

      const status = j.find("span.ls2t").text().trim();
      const parts = status.split("·").map((p) => p.trim());
      const genre = parts[0] || "";
      const views = parts[1] || "";

      const latestChapter = j.find("a.ls2l").text().trim();
      const latestChapterSlug = slugFilter(j.find("a.ls2l").attr("href") || "");

      justAdded.push({
        title,
        slug,
        thumbnail,
        updateCount,
        status: {
          genre,
          views,
        },
        latestChapter,
        latestChapterSlug,
        flag,
      });
    });

    return { data: justAdded };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
