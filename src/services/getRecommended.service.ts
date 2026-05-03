import { load } from "cheerio";
import { api } from "../lib/api.js";

const recommendedService = async (url: string) => {
  try {
    const res = await api.get(url);

    const html = res.data;
    const $ = load(html);
    const rekomendasi: any[] = [];

    $("#Rekomendasi_Komik article.ls2").each((i, el) => {
      const anchorTag = $(el).find("a").first();
      const imgTag = $(el).find("img");

      const title = (
        imgTag.attr("alt") ||
        anchorTag.attr("alt") ||
        $(el).find(".ls2j h3 a").text()
      )
        ?.replace(/^Baca (Komik|Manga|Manhwa|Manhua)\s+/i, "")
        .trim();

      const originalLinkPath = anchorTag.attr("href");

      let thumbnail = imgTag.attr("data-src");
      if (!thumbnail || thumbnail.trim() === "") {
        thumbnail = imgTag.attr("src");
      }

      let slug = "";
      if (originalLinkPath) {
        const matches = originalLinkPath.match(/\/manga\/([^/]+)/);
        if (matches && matches[1]) {
          slug = matches[1];
        }
      }

      const apiDetailLink = slug ? `/detail-komik/${slug}` : originalLinkPath;

      const finalOriginalLink = originalLinkPath?.startsWith("http")
        ? originalLinkPath
        : originalLinkPath
          ? `${url.slice(0, -1)}${originalLinkPath}`
          : null;

      if (title && thumbnail) {
        rekomendasi.push({
          title,
          originalLink: finalOriginalLink,
          apiDetailLink,
          thumbnail,
        });
      }
    });

    return { data: html };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export default recommendedService;
