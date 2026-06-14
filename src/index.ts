import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import { rateLimiter } from "./shared/middlewares/rateLimiter.middleware.js";
import { apiKeyMiddleware } from "./shared/middlewares/apiKey.middleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(rateLimiter);

app.use("/api", apiKeyMiddleware, router);

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
      "/featured-genres?name=[isekai|fantasy|romance|ecchi|drama|sliceOfLife|schoolLife|comedy|action|adventure]",
      "/latest/?page=[number]&type=[manga|manhwa|manhua]&genre=[genreName]&genre2=[genreName2]&status=[ongoing|end]&orderBy=[modified|date|rand|ranking]",
      "/popular/?page=[number]&type=[manga|manhwa|manhua]&orderBy=[modified|date|rand|ranking]",
      "/comic-list?page=[number]&type=[manga|manhwa|manhua]&letter=[A-Z]",
      "/detail/:slug",
      "/detail/:slug/similar-comics",
      "/genres",
      "/read/:slug",
    ],
  });
});

if (process.env.NODE_ENV !== "serverless") {
  app.listen(port, () => console.log(`Server is running on port ${port}`));
}

export default app;
