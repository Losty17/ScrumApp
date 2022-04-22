import express from "express";
import dotenv from "dotenv";
import db from "./db";
import Produto from "./models/Produto";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/mensagem", async (req: any, res: any) => {
  await db.sync();
  let newProduct = await Produto.findOrCreate({
    where: {
      nome: "Produto 2",
    },
  });
  res.send(typeof newProduct);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
