const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/mensagem", (req: any, res: any) => {
  res.send({ express: "Hello From Express" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
