import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

// middleware configuration
app.use(cors());
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes
import userRouter from "./routes/user.route.js";

app.use("/api/user", userRouter);
export default app;
