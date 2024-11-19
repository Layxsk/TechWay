import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDir = path.join(__dirname, "..");
router.get("/login", (req, res, next) => {
  res.sendFile(path.join(srcDir, "views", "Login.html"));
});

router.get("/cadastro", (req, res, next) => {
  res.sendFile(path.join(srcDir, "views", "Cadastro.html"));
});

router.post("/login", (req, res, next) => {
  const userData = req.body;
  console.log(userData);
});

router.post("/cadastro", (req, res, next) => {
  const userData = req.body;
  console.log(userData);
});

export default router;
