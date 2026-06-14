import { load } from "cheerio";
import { api } from "../shared/lib/api.js";
import { slugFilter } from "../shared/lib/utils/slugFilter.js";
import { reqConfig } from "../shared/lib/utils/requestConfig.js";

export const readService = async (slug: string) => {
  try {
    const res = await api.get(`/${slug}`, reqConfig);
    const $ = load(res.data);

    let readData: any = {};

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

    return { data: readData };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
