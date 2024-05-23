import { responseData } from "../config/Response.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

const bcrypt = require('bcrypt');

let model = initModels(sequelize);

export const login = async (req, res) => {
    let { roleID, userName, password } = req.body;

  // check email and password == table user
  let checkUser = await model.account.findOne({
    where: {
      roleID: roleID,
      userName: userName,
    },
  });

  // exist => login successfully
  if (checkUser) {
    if (checkUser.password == password) {
      let token = { userID: checkUser.userID };
      responseData(res, "Login successfully", token, 200);
    } else {
      // wrong password
      responseData(res, "wrong password", "", 400);
    }
  } else {
    // not exist
    responseData(res, "Account doesn't exist", "", 400);
  }
};

export const signup = async (req, res) => {
    try{
        let {full_name,
             email,
             userName, 
             pass_word,
             phone,
             address,
             bankAccount
            } = req.body;

            let checkUser = await model.users.findOne({
                where: {
                    email
                }
            })

            if (checkUser) {
                responseData(res,"Email already exists", "", 400);
            }

        //hash the pass
        let hashedPassword = bcrypt.hashSync(pass_word, 10);

        let newData = {
          full_name,
          email,
          userName,
          password: hashedPassword,
          role_id: 'user',
          phone,
          address,
          bankAccount
      };

        await model.users.create({newData})

        responseData(res, "Sucessfully sign up","", 200);
        
    } catch {
        responseData(res, "Error", "", 500);
    }
};
