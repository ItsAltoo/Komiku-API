import { load } from "cheerio";
import { api } from "../lib/api.js";

export const latestService = async () => {
  try {
    const res = await api.get("/");
    const $ = load(res.data);

    const latest: any[] = [];

    $("#Terbaru .ls2-wrap article.ls2").each((_, el) => {
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

      latest.push({
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

    return { data: latest };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
