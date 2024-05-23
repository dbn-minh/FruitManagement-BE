import { responseData } from "../config/Response.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import bcrypt from "bcrypt";

let model = initModels(sequelize);

export const login = async (req, res) => {
  let { user_name, user_password } = req.body;

  // check email and password == table user
  let checkUser = await model.users.findOne({
    where: {
      user_name,
    },
  });

  // exist => login successfully
  if (checkUser) {
    bcrypt.compare(user_password, checkUser.user_password, (err, result) => {
      if (err) {
        console.error(err);
        responseData(res, "An error occurred during login", "", 500);
        return;
      }

      if (result) {
        let token = { user_id: checkUser.user_id, role_id: checkUser.role_id };
        responseData(res, "Login successfully", token, 200);
      } else {
        // wrong password
        responseData(res, "Wrong password", "", 400);
      }
    });
  } else {
    // not exist
    responseData(res, "User doesn't exist", "", 400);
  }
};

export const signup = async (req, res) => {
  // try {
  let {
    full_name,
    address,
    user_name,
    bank_account,
    user_password,
    phone,
    email,
  } = req.body;

  let checkUser = await model.users.findOne({
    where: {
      user_name,
    },
  });

  if (checkUser) {
    return responseData(res, "Username already exists", "", 400);
  }

  //hash the pass
  let hashedPassword = bcrypt.hashSync(user_password, 10);

  let newData = {
    full_name,
    address,
    user_name,
    bank_account,
    user_password: hashedPassword,
    phone,
    email,
    role_id: 2,
  };

  await model.users.create(newData);

  responseData(res, "Sucessfully sign up", "", 200);
  // } catch {
  //   responseData(res, "Error", "", 500);
  // }
};
