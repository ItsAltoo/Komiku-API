import { load } from "cheerio";
import { api } from "../shared/lib/api.js";
import { slugFilter } from "../shared/lib/utils/slugFilter.js";

const toSnakeCase = (str: string): string =>
  str.toLowerCase().replace(/\s+/g, "_");

export const detailService = async (slug: string) => {
  try {
    const res = await api.get(`/manga/${slug}`);
    const $ = load(res.data);

    let detailList: any = {};

    $("main.perapih article").each((_, el) => {
      const ele = $(el);

      const title = ele.find("div#Judul header h1 span>span").text().trim();
      const thumbnail = ele.find("div.ims img").attr("src") || "";
      const synopsis = ele.find("p.desc").text().trim();

      const meta: Record<string, any> = {};

      $("table.inftable tbody tr").each((_, row) => {
        const key = toSnakeCase(
          $(row).find("td").eq(0).text().replace(":", "").trim(),
        );
        const value = $(row).find("td").eq(1);

        if (key === "genre") {
          meta[key] = value
            .find("li.genre span")
            .map((_, el) => $(el).text().trim())
            .get();
        } else {
          meta[key] = value.text().trim();
        }
      });

      const chapters = ele.find("div.linkbutt div.new1");

      const initialChapter = chapters.eq(0).find("a span").eq(1).text().trim();
      const initialChapterSlug = slugFilter(
        chapters.eq(0).find("a").attr("href") || "",
      );

      const latestChapter = chapters.eq(1).find("a span").eq(1).text().trim();
      const latestChapterSlug = slugFilter(
        chapters.eq(1).find("a").attr("href") || "",
      );

      const chapterList: any[] = [];

      $("#daftarChapter tr[itemprop='itemListElement']").each((_, row) => {
        const td = $(row).find("td.judulseries");
        const title = td.find("span[itemprop='name'] b").text().trim();
        const slug = slugFilter(
          td.find("a[itemprop='url']").attr("href") || "",
        );
        const date = $(row).find("td.tanggalseries").text().trim();

        chapterList.push({ title, slug, date });
      });

      detailList = {
        title,
        thumbnail,
        synopsis,
        description: meta,
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
        chapterList,
      };
    });

    return { data: detailList };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
