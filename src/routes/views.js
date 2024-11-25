import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDir = path.join(__dirname, "..");

router.get("/ongs", (req, res, next) => {
  res.sendFile(path.join(srcDir, "views", "ONGS.html"));
});

router.get("/campanhas", (req, res, next) => {
  res.sendFile(path.join(srcDir, "views", "Campanhas.html"));
});

router.get("/memorial", (req, res, next) => {
  res.sendFile(path.join(srcDir, "views", "MemorialPost.html"));
});

router.get("/memorial-cadastro", (req, res, next) => {
  res.sendFile(path.join(srcDir, "views", "MemorialCadastro.html"));
});

router.get("/quemsomos", (req, res, next) => {
  res.sendFile(path.join(srcDir, "views", "QuemSomos.html"));
});

export default router;
