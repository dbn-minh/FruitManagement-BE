import { responseData } from "../config/Response.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

let model = initModels(sequelize);

export const getInfo = async (req, res) => {
  // try {
  //   let data = await model.imports.findAll({
  //     include: ["supplier"],
  //   });
  //   responseData(res, "Success", data, 200);
  // } catch {
  //   responseData(res, "Error ...", "", 500);
  // }
};
