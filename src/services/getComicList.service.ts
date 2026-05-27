import { load } from "cheerio";
import { api } from "../shared/lib/api.js";
import type { KomikType } from "../shared/types/index.js";
import { slugFilter } from "../shared/lib/utils/slugFilter.js";

type ComicListQuery = {
  page: number;
  type: KomikType;
  letter: string;
};

export const comicListService = async (query: ComicListQuery) => {
  try {
    const res = await api.get("/daftar-komik/", {
      params: {
        halaman: query.page,
        tipe: query.type,
        huruf: query.letter,
      },
    });
    const $ = load(res.data);

    const comicList: any[] = [];

    $("section#manga-list").each((_, element) => {
      const headingRaw = $(element).find("div.page-info").eq(0).text().trim();
      const heading =
        headingRaw
          .split("\n")
          .filter((s) => s.trim())[1]
          ?.trim() || headingRaw;

      const list: any[] = [];
      $(element)
        .find("div.manga-grid article.manga-card")
        .each((_, el) => {
          const element = $(el);

          const title = element.find("div h4 a").text().trim();
          const slug = slugFilter(element.find("a").attr("href") || "");
          const thumbnail = element.find("a img").attr("data-src");

          const meta = element.find("div p.meta").text().trim();

          const [typeLine = "", statusLine = ""] = meta
            .split("\n")
            .map((s) => s.trim());

          const [type, genre] = typeLine.split("•").map((s) => s.trim());

          const release = statusLine.replace("Status:", "").trim();
          list.push({
            title,
            slug,
            thumbnail,
            status: {
              release,
              type,
              genre,
            },
          });
        });

      comicList.push({
        heading,
        list,
      });
    });

    return { data: comicList };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
