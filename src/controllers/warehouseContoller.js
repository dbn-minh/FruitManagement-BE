import { responseData } from "../config/Response.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

let model = initModels(sequelize);

export const getInventory = async (req, res) => {
  try {
    let data = await model.warehouse_products.findAll({
      include: ["product"],
    });
    responseData(res, "Success", data, 200);
  } catch {
    responseData(res, "Error ...", "", 500);
  }
};
