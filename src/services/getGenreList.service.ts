import { load } from "cheerio";
import { api } from "../shared/lib/api.js";

export const genreListService = async () => {
  try {
    const res = await api.get("/pustaka");
    const $ = load(res.data);

    const genreList: { value: string | undefined; text: string }[] = [];

    $("form.filer2 select[name='genre'] option").each((_, element) => {
      const ele = $(element);
      const value = ele.attr("value");
      const text = ele.text().trim();

      genreList.push({
        value,
        text,
      });
    });

    return { data: genreList.slice(1) };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
