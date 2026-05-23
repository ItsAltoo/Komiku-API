import { load } from "cheerio";
import { api } from "../lib/api.js";

export const popularUpdateService = async (type: string) => {
  try {
    const res = await api.get("/");
    const html = res.data;
    const $ = load(html);

    const selectorMap: Record<string, string> = {
      manga: "manga",
      manhwa: "manhwa",
      manhua: "manhua",
    };
    const filteredType = selectorMap[type]
      ?.charAt(0)
      .toUpperCase()
      .concat(selectorMap[type]?.slice(1));

    const popularUpdate: any[] = [];

    $(
      `#Komik_Populer #ls12-populer article.ls2${filteredType ? `[data-tipe="${filteredType}"]` : ""}`,
    ).each((_, el) => {
      const v = $(el).find(".ls2v");
      const j = $(el).find(".ls2j");

      // Element V
      const slug = v.find("a").attr("href") || "";
      const thumbnail = v.find("a img").attr("data-src") || "";
      const flagRaw = v.find("img.flag").attr("src") || "";
      const flag = flagRaw ? process.env.BASE_URL + flagRaw : "";
      const updateCount = v.find("span.up").text().trim();

      // Element J
      const title = j.find("h3 a").text().trim();
      const status = j.find("span.ls2t").text().trim();
      const latestChapter = j.find("a.ls2l").text().trim();
      const chapterSlug = j.find("a.ls2l").attr("href") || "";

      popularUpdate.push({
        title,
        slug,
        thumbnail,
        updateCount,
        status,
        latestChapter,
        chapterSlug,
        flag,
      });
    });

    return { data: popularUpdate };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
