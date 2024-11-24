import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import userRoute from "./src/routes/auth.js";
import viewRoute from "./src/routes/views.js";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "src", "public")));
app.use(viewRoute);
app.use(userRoute);

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
