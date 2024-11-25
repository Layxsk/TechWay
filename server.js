import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import session from "express-session";
import dotenv from "dotenv";
const app = express();
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
import userRoute from "./src/routes/auth.js";
import viewRoute from "./src/routes/views.js";
import submitRoute from "./src/routes/submission.js";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
    },
  })
);
app.use(express.static(path.join(__dirname, "src", "public")));
app.use(viewRoute);
app.use(userRoute);
app.use(submitRoute);

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "src", "views", "landingPage.html"));
});

app.get("/memories", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "utils", "memories.json"));
});

app.use((req, res, next) => {
  res.status(404).send("Address not found");
});

app.listen(3000);
