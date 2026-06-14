import { load } from "cheerio";
import { api } from "../shared/lib/api.js";
import { slugFilter } from "../shared/lib/utils/slugFilter.js";
import type { ApiResponse, BaseComic } from "../shared/types/index.js";

export type SimilarComic = BaseComic & {
  views: string;
  description: string;
};

export const similarComicsService = async (
  slug: string,
): Promise<ApiResponse<SimilarComic[]>> => {
  try {
    const res = await api.get(`/manga/${slug}`);
    const $ = load(res.data);

    const similarComics: SimilarComic[] = [];

    $(".grd-wrap div.grd").each((_, element) => {
      const el = $(element);

      const title = el.find("a div.h4").text().trim();
      const slug = slugFilter(el.find("a").attr("href") || "");
      const thumbnail = el.find(".gmbr1 img").attr("data-src") || "";
      const views = el.find("div.vw").text().trim();
      const description = el.find("p").text().trim();

      similarComics.push({
        title,
        slug,
        thumbnail,
        views,
        description,
      });
    });

    return { data: similarComics };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
