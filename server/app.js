import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware.js";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.status(200).json({ message: "server is running" });
});

app.use(errorMiddleware);

export default app;
