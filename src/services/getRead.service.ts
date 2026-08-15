import { load } from "cheerio";
import { api } from "../shared/lib/api.js";
import { slugFilter } from "../shared/lib/utils/slugFilter.js";
import type { ApiResponse } from "../shared/types/index.js";

export type ReadComicData = {
  title: string;
  navigation: {
    list: string;
    next: string;
    prev: string;
  };
  images: string[];
};

export const readService = async (
  slug: string,
): Promise<ApiResponse<ReadComicData>> => {
  try {
    const res = await api.get(`/${slug}`);
    const $ = load(res.data);

    let readData: Partial<ReadComicData> = {};

    $("div.main").each((_, element) => {
      const ele = $(element);

      const title = ele.find("div#Judul header h1").text().trim();

      const nxpr = ele.find("div.botmenu div.nxpr");
      const listRaw = slugFilter(nxpr.find("a:not(.rl)").attr("href") || "");
      const prevRaw = slugFilter(
        nxpr.find("a.rl:has(svg.fa-caret-left)").attr("href") || "",
      );
      const nextRaw = slugFilter(
        nxpr.find("a.rl:has(svg.fa-caret-right)").attr("href") || "",
      );

      let imageList: string[] = [];
      ele.find("div#Baca_Komik img").each((_, img) => {
        const imgSrc = $(img).attr("src");
        if (imgSrc) {
          imageList.push(`/api/proxy-image?url=${encodeURIComponent(imgSrc)}`);
        }
      });

      readData = {
        title,
        navigation: {
          list: listRaw,
          next: nextRaw,
          prev: prevRaw,
        },
        images: imageList,
      };
    });

    return { data: readData as ReadComicData };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
