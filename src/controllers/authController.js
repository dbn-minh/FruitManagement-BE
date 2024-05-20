import { responseData } from "../config/Response.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

let model = initModels(sequelize);

export const login = async (req, res) => {};
export const signup = async (req, res) => {};
