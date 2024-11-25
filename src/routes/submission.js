import express from "express";
import path from "path";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDir = path.join(__dirname, "..");

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.status(401).render("error", {
      msg: "Você precisa estar logado para registrar uma memória.",
    });
  }
}

router.post("/submit-memory", isAuthenticated, (req, res) => {
  const { firstName, lastName, place, deathDate, message } = req.body;

  if (!firstName || !lastName || !place || !deathDate || !message) {
    return res.status(400).render("error", {
      msg: "Todos os campos são obrigatórios para registrar a memória.",
    });
  }

  const mockDbPath = path.join(srcDir, "utils", "memories.json");

  fs.readFile(mockDbPath, (err, data) => {
    if (err) {
      return res.status(500).render("error", {
        msg: "Erro ao acessar o banco de dados. Por favor, tente novamente mais tarde.",
      });
    }

    let mockDb = [];
    try {
      mockDb = data.length ? JSON.parse(data) : [];
    } catch (parseErr) {
      return res.status(500).render("error", {
        msg: "Erro no formato do banco de dados. Contate o administrador do sistema.",
      });
    }

    const nextId = mockDb.length > 0 ? mockDb[mockDb.length - 1].id + 1 : 1;

    const memory = {
      id: nextId,
      firstName,
      lastName,
      place,
      deathDate,
      message,
      visualizacoes: 0,
    };

    mockDb.push(memory);

    fs.writeFile(mockDbPath, JSON.stringify(mockDb, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).render("error", {
          msg: "Erro ao salvar a memória no banco de dados. Por favor, tente novamente.",
        });
      }

      res.status(201).render("success", {
        msg: "Memória registrada com sucesso!",
      });
    });
  });
});

export default router;
