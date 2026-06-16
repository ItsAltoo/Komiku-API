import serverless from "serverless-http";
import app from "../../src/index.js";

export const handler = serverless(app, {
  binary: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "application/octet-stream",
  ],
});
