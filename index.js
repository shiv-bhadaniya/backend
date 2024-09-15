import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Check } from "./util/envCheck.js";
import authRoute from "./routes/Auth.js";

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

if (!Check.verifyEnvironment()) {
  throw Error("Please include all environment variables.");
}

const PORT = process.env.PORT;
const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;

app.get("/healthcheck", (req, res) => {
  res.status(200).send("Server is running");
});

app.use("/user/auth/", authRoute);

mongoose
  .connect(DB_CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running and Database connect successfully.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
