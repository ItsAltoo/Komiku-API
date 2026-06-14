import { load } from "cheerio";
import { api } from "../shared/lib/api.js";
import type { ApiResponse } from "../shared/types/index.js";

export type GenreItem = {
  value: string;
  text: string;
};

export const getGenresService = async (): Promise<ApiResponse<GenreItem[]>> => {
  try {
    const res = await api.get("/pustaka");
    const $ = load(res.data);

    const genreList: GenreItem[] = [];

    $("form.filer2 select[name='genre'] option").each((index, element) => {
      if (index === 0) return;
      
      const ele = $(element);
      const value = ele.attr("value") || "";
      const text = ele.text().trim();

      genreList.push({
        value,
        text,
      });
    });

    return { data: genreList };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
