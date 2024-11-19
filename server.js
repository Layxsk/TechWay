import { express } from "express";

app = express();

app.get("/login", (req, res, next) => {
  res.sendFile();
});
app.listen(3000);
