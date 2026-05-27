import { load } from "cheerio";
import { api } from "../shared/lib/api.js";

const rankingService = async (period: string = "all") => {
  try {
    const res = await api.get("/");
    const $ = load(res.data);

    const selectorMap: Record<string, string> = {
      daily: "#rank-harian",
      weekly: "#rank-mingguan",
      all: "#rank-total",
    };

    const targetSelector = selectorMap[period] || "#rank-total";
    const ranking: any[] = [];

    $(`${targetSelector} article.ls4`).each((_, el) => {
      const v = $(el).find(".ls4v");
      const j = $(el).find(".ls4j");

      // Element V
      const slug = v.find("a").attr("href") || "";
      const thumbnail = v.find("img").attr("data-src") || "";
      const rankNumber = v.find("span.rank-num").text().trim();

      // Element J
      const title = j.find("h4 a").text().trim();

      const status = j.find("span.ls4s").text().trim();
      const parts = status.split("·").map((p) => p.trim());
      const genre = parts[0] || "";
      const views = parts[1] || "";

      const latestChapter = j.find("a.ls24").text().trim();
      const chapterSlug = j.find("a.ls24").attr("href") || "";

      ranking.push({
        title,
        slug,
        thumbnail,
        status: {
          genre,
          views,
        },
        latestChapter,
        chapterSlug,
        rank: rankNumber,
      });
    });

    return { data: ranking };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export default rankingService;
