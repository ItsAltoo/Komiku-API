import { load } from "cheerio";
import { apiSecond } from "../shared/lib/api.js";
import { slugFilter } from "../shared/lib/utils/index.js";
import type { ApiResponse, SearchComic } from "../shared/types/index.js";

export const searchService = async (
  query: string,
): Promise<ApiResponse<SearchComic[]>> => {
  try {
    const res = await apiSecond.get(
      `/?post_type=manga&s=${encodeURIComponent(query)}`,
    );

    const $ = load(res.data);

    const searchList: SearchComic[] = [];

    $(".bge").each((_, el) => {
      const parent = $(el);

      // Image & Type
      const imgWrap = parent.find(".bgei");
      const imageStr =
        imgWrap.find("img").attr("data-src") ||
        imgWrap.find("img").attr("src") ||
        "";
      const thumbnail = imageStr.replace(/\?.*$/, ""); // Clean up query params if any
      const type =
        imgWrap.find(".tpe1_inf b").text().trim() ||
        imgWrap.find(".tpe1_inf").text().trim() ||
        "";

      // Details
      const kan = parent.find(".kan");
      const title = kan.find("h3").text().trim();
      const endpointStr = kan.find("a").attr("href") || "";
      const slug = slugFilter(endpointStr);
      const status = kan.find("p").text().trim();

      // Chapters
      let initial = { title: "", slug: "" };
      let latest = { title: "", slug: "" };
      const chapterEls = kan.find(".new1");

      if (chapterEls.length > 0) {
        const firstEl = $(chapterEls[0]);
        initial = {
          title: firstEl.find("span").last().text().trim(),
          slug: slugFilter(firstEl.find("a").attr("href") || ""),
        };

        const lastEl = $(chapterEls[chapterEls.length - 1]);
        latest = {
          title: lastEl.find("span").last().text().trim(),
          slug: slugFilter(lastEl.find("a").attr("href") || ""),
        };
      }

      searchList.push({
        title,
        slug,
        thumbnail,
        type,
        status,
        chapters: {
          initial,
          latest,
        },
      });
    });

    return { data: searchList };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
