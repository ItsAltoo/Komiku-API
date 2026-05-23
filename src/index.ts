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
      "/latest",
      "/popular-update?type=[manga|manhwa|manhua]",
      "/just-added"
    ],
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
