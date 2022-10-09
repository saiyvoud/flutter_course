import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import con from "../middleware/db.js";
import { CREATE, FINDONE, LOGIN, REGEISTER,SELECT_PHONE } from "../model/user.js";
import {
  genPassword,
  generateToken,
  comparePassword,
  verifyTokens,
} from "../middleware/auth.js";
import { v4 as uuidv4 } from "uuid";
import { _Response } from "../middleware/respone.js";
import { _Code, _Status } from "../middleware/status.js";
import { fail, success } from "../middleware/message.js";
import ValidCreateUser from "../validator/user.js";
dotenv.config();
const uid = uuidv4();

export const creatTableUser = () => {
  try {
    con.query(CREATE, function (err, row) {
      if (err) throw err;
      return console.log("Table User created");
    });
  } catch (error) {
    console.log("ຳerror:", +error);
  }
};

export const login = async (req, res) => {
  try {
    const values = req.body.phone;
    const _password = req.body.password;
    con.query(SELECT_PHONE, [values], async function (err, result) {
      //  console.log(result[0].password)
      if (err) return res.json({ msg: "Invaild phone or password" });
      if (!result) return res.json({ msg: "Invaild phone or password" });
      const checkpassword = await comparePassword(
        _password,
        result[0].password
      );
      if (!checkpassword)
        return res.json({ msg: "Invaild phone or password" });
      const token = generateToken(result);
      return res.json({msg: "login successful",token});
    });
  } catch (error) {
    console.log("ຳerror:", +error);
  }
};
// =====> Register <========
export const Register = async (req, res) => {
  try {
    const { errors, isValid } = ValidCreateUser(req.body);
    if (!isValid) return res.json({ msg: errors });
    const password = await genPassword(req.body.password);

    const values = [
      [uid, req.body.firstName, req.body.lastName, req.body.phone, password],
    ];
    // check phone
    con.query(SELECT_PHONE, req.body.phone, function (err,result1) {
     if(err) throw err
      if (result1.length > 0) {
        return res.json({ msg: "phone is already" });
      }
      con.query(REGEISTER, [values], function (err, resData) {
        if (err) throw err;
        const token = generateToken(resData);
        return res.status(201).json({ msg: "register successful:" , token });
      });
    });
  } catch (error) {
    console.log("ຳerror:", error);
  }
};
export const getUserOne=(req,res)=>{
try {
  const token = verifyTokens(req.headers["token"]);

  con.query(FINDONE, [token.data[0].id],function(err,result){
    if(err) throw err 
    return res.status(200).json(result)
  })
} catch (error) {
  console.log("error",error);
}
}