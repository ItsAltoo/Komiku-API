import { load } from "cheerio";
import { api } from "../lib/api.js";

type genreList = { genre: string; items: any[] }[];

export const listGenreService = async (name?: string) => {
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

    const genreList: genreList = [];

    $("section.ls.lsgenre").each((_, section) => {
      const sectionEl = $(section);
      const genreLabel = sectionEl.find("h2.lsh3").text().trim();

      if (targetGenre && genreLabel !== targetGenre) return;

      const items: any[] = [];

      sectionEl.find("article.ls2").each((_, el) => {
        const v = $(el).find(".ls2v");
        const j = $(el).find(".ls2j");

        // Element V
        const slug = v.find("a").attr("href") || "";
        const thumbnail = v.find("a img").attr("data-src") || "";
        const flagRaw = v.find("img.flag").attr("src") || "";
        const flag = flagRaw ? process.env.BASE_URL + flagRaw : "";

        // Element J
        const title = j.find("h3 a").text().trim();
        const genreViews = j.find("span.ls2t").text().trim();
        const latestChapter = j.find("a.ls2l").text().trim();
        const chapterSlug = j.find("a.ls2l").attr("href") || "";

        items.push({
          title,
          slug,
          thumbnail,
          flag,
          genreViews,
          latestChapter,
          chapterSlug,
        });
      });

      genreList.push({ genre: genreLabel, items });
    });

    return { data: genreList };
  } catch (error) {
    throw error instanceof Error ? error : new Error(String(error));
  }
};
