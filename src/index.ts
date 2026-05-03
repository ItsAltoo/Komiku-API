import dotenv from "dotenv";
import express from "express";
import router from "./routes/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use("/api", router);

app.get("/", (req, res) => res.redirect("/api"));

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to Komiku Rest API",
    version: "2.0.0",
    endpoints: [
      "/recommended",
      "/trending",
      "/latest",
      "/pustaka",
      "/berwarna",
      "/komik-populer",
      "/detail-komik/:slug",
      "/baca-chapter/:slug/:chapter",
      "/search?q=keyword",
      "/genre-detail/:slug",
    ],
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
