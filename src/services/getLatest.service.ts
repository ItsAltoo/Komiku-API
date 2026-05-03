import { load } from "cheerio";
import { api } from "../lib/api.js";
import { reqConfig } from "../lib/utils/requestConfig.js";

export const latestService = async () => {
  try {
    const { data } = await api.get("/", reqConfig);

    const $ = load(data);
    const komikTerbaru: any[] = [];

    $("#Terbaru div.ls4w article.ls4").each((_, el) => {
      const element = $(el);

      const linkElement = element.find(".ls4v > a").first();
      const imgElement = linkElement.find("img");
      const detailElement = element.find(".ls4j");

      const titleFromImgAlt = imgElement
        .attr("alt")
        ?.replace(/^Baca (Manga|Manhwa|Manhua)\s+/i, "")
        .trim();
      const titleFromH3 = detailElement.find("h3 > a").text().trim();
      const title = titleFromH3 || titleFromImgAlt || "Judul Tidak Tersedia";

      const originalLinkPath = linkElement.attr("href");
      const originalLink = originalLinkPath?.startsWith("http")
        ? originalLinkPath
        : originalLinkPath
          ? `${process.env.BASE_URL}${originalLinkPath}`
          : null;

      let thumbnail = imgElement.attr("data-src");
      if (!thumbnail || thumbnail.trim() === "") {
        thumbnail = imgElement.attr("src");
      }
      // Opsional: Membersihkan URL thumbnail jika ada parameter yang tidak diinginkan (misal ?resize=)
      // if (thumbnail && thumbnail.includes('?')) {
      //   thumbnail = thumbnail.split('?')[0];
      // }

      const typeGenreTimeString = detailElement.find("span.ls4s").text().trim();
      //   let type = "Unknown";
      //   let genre = "Unknown";
      //   let updateTime = "Unknown";

      //   const typeMatch = typeGenreTimeString.match(/^(Manga|Manhwa|Manhua)/i);
      //   if (typeMatch) {
      //     type = typeMatch[0];
      //     const restOfString = typeGenreTimeString.substring(type.length).trim();
      //     const timeMatch = restOfString.match(/(.+?)\s+([\d\w\s]+lalu)$/i);
      //     if (timeMatch) {
      //       genre = timeMatch[1].trim();
      //       updateTime = timeMatch[2].trim();
      //     } else {
      //       genre = restOfString;
      //     }
      //   } else {
      //     const parts = typeGenreTimeString.split(/\s+/);
      //     if (parts.length >= 2) {
      //       if (parts[parts.length - 1] === "lalu" && parts.length > 2) {
      //         updateTime = parts.slice(-2).join(" ");
      //         genre = parts.slice(0, -2).join(" ");
      //       } else {
      //         genre = typeGenreTimeString;
      //       }
      //     } else {
      //       genre = typeGenreTimeString;
      //     }
      //   }

      const latestChapterElement = detailElement.find("a.ls24");
      const latestChapterTitle = latestChapterElement.text().trim();
      const latestChapterLinkPath = latestChapterElement.attr("href");

      const isColored = element.find(".ls4v span.warna").length > 0;
      const updateCountText = element.find(".ls4v span.up").text().trim();

      let mangaSlug = "";
      if (originalLinkPath) {
        const slugMatches = originalLinkPath.match(/\/manga\/([^/]+)/);
        if (slugMatches && slugMatches[1]) {
          mangaSlug = slugMatches[1];
        }
      }
      const apiDetailLink = mangaSlug ? `/detail-komik/${mangaSlug}` : null;

      let apiChapterLink = null;
      if (latestChapterLinkPath && mangaSlug) {
        const chapterNumMatch =
          latestChapterLinkPath.match(/-chapter-([\d.]+)\/?$/i) ||
          latestChapterLinkPath.match(/\/([\d.]+)\/?$/i);
        if (chapterNumMatch && chapterNumMatch[1]) {
          const chapterNumber = chapterNumMatch[1];
          apiChapterLink = `/baca-chapter/${mangaSlug}/${chapterNumber}`;
        }
      }

      if (
        title &&
        title !== "Judul Tidak Tersedia" &&
        thumbnail &&
        originalLink
      ) {
        komikTerbaru.push({
          title,
          thumbnail,
          //   type,
          //   genre,
          //   updateTime,
          latestChapterTitle,
          isColored,
          updateCountText,
          apiDetailLink,
          apiChapterLink,
        });
      }
    });

    return komikTerbaru;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
