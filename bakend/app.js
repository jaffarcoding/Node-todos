import express from "express";
import userrout from "./routes/user.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskrouter from "./routes/taskR.js";
import { errorMiddleware } from "./middleware/error.js";
import corse from "cors";
//import java from "../bakend/database/"
export const app = express();

config({
  path: "bakend/database/config.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(corse({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST","PUT","DELETE"],
  credentials: true
}))
app.get("/", (req, res) => {
  res.send("syed omer khan");
});

app.use("/api", userrout);
app.use("/api", taskrouter);

app.use(errorMiddleware);
