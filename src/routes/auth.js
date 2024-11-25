import express from "express";
import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";
import { dirname } from "path";
import { fileURLToPath } from "url";
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDir = path.join(__dirname, "..");
const mockUserDbPath = path.join(srcDir, "utils", "users.json");

router.get("/login", (req, res, next) => {
  res.sendFile(path.join(srcDir, "views", "Login.html"));
});

router.get("/cadastro", (req, res, next) => {
  res.sendFile(path.join(srcDir, "views", "Cadastro.html"));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("error", { msg: "E-mail e senha são obrigatórios." });
  }

  fs.readFile(mockUserDbPath, (err, data) => {
    if (err) {
      return res.render("error", {
        msg: "Erro ao acessar o banco de dados de usuários.",
      });
    }

    const users = JSON.parse(data);

    const user = users.find((user) => user.email === email);
    if (!user) {
      return res.render("error", { msg: "E-mail ou senha inválidos." });
    }

    bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
      if (bcryptErr || !isMatch) {
        return res.render("error", { msg: "E-mail ou senha inválidos." });
      }

      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      res.render("success", { msg: "Login realizado com sucesso!" });
    });
  });
});

router.post("/cadastro", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
    city,
    state,
  } = req.body;

  if (!firstName || !lastName || !email || !password || !passwordConfirmation) {
    return res.render("error", {
      msg: "Todos os campos são obrigatórios para o cadastro.",
    });
  }

  if (password !== passwordConfirmation) {
    return res.render("error", { msg: "As senhas não coincidem." });
  }

  fs.readFile(mockUserDbPath, (err, data) => {
    if (err) {
      return res.render("error", {
        msg: "Erro ao acessar o banco de dados de usuários.",
      });
    }

    const users = JSON.parse(data);

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.render("error", { msg: "Este e-mail já está registrado." });
    }

    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        return res.render("error", { msg: "Erro ao processar a senha." });
      }

      const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        city,
        state,
      };

      users.push(newUser);

      fs.writeFile(
        mockUserDbPath,
        JSON.stringify(users, null, 2),
        (writeErr) => {
          if (writeErr) {
            return res.render("error", {
              msg: "Erro ao salvar o novo usuário.",
            });
          }

          res.render("success", { msg: "Usuário registrado com sucesso!" });
        }
      );
    });
  });
});

export default router;
