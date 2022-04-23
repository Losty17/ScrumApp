import Sequelize, { Model } from "sequelize";
import db from "../db";

class Produto extends Model {
  declare id: number;
  declare nome: string;
}
Produto.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "produtos",
    sequelize: db,
  }
);

export default Produto;
