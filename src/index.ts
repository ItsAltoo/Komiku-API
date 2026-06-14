import dotenv from "dotenv";
import express from "express";
import router from "./routes/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use("/api", router);

app.get("/", (_, res) => res.redirect("/api"));

app.get("/api", (_, res) => {
  res.json({
    message: "Welcome to Komiku Rest API",
    version: "2.0.0",
    endpoints: [
      "/ranking?period=[daily|weekly|all]",
      "/latest-list",
      "/popular-update?type=[manga|manhwa|manhua]",
      "/just-added",
      "/list-genre?name=[isekai|fantasy|romance|ecchi|drama|sliceOfLife|schoolLife|comedy|action|adventure]",
      "/latest/?page=[number]&type=[manga|manhwa|manhua]&genre=[genreName]&genre2=[genreName2]&status=[ongoing|end]&orderby=[modified|date|rand|meta_value_num]",
      "/popular/?page=[number]&type=[manga|manhwa|manhua]&orderby=[modified|date|rand|meta_value_num]",
      "/comic-list?page=[number]&type=[manga|manhwa|manhua]&letter=[A-Z]",
      "/detail/:slug",
      "/detail/:slug/similar-comics",
      "/genre-list",
      "/read/:slug",
    ],
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
