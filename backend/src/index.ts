import express from "express";
import logger from "./logger"; // 👈 Import here
import router from "./router/route";
import cookieParser from "cookie-parser";

const app = express();
app.use((err: any, _req: any, res: any, _next: any) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).json({ message: "Internal Server Error" });
});
app.use(express.json());
app.use(cookieParser());
// basic route
app.get("/", (_req, res) => {
  res.send("Hello Express + TS");
});

app.use("/", router);

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
});

const PORT = process.env["PORT"] || 3000;
app.listen(PORT, () => {
  console.log("Server listning on port " + PORT);
});
