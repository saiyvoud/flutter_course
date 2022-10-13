
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
    let {phone,password}= req.body;
    
    if(!phone){
      return res.status(400).json({msg:"phone is require"})
    } 
    if(!password){
      return res.status(400).json({msg:"password is require"})
    }
    con.query(LOGIN, [phone], async function (err, result) {
      if (err) return res.json({ msg: "Invaild phone or password" });
      if (!result) return res.json({ msg: "Invaild phone or password" });
      const checkpassword = await comparePassword(
        password,
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
   let {firstName,lastName,phone,_password} = req.body;
   if(!firstName){
    return res.status(400).json({firstName: "firstName is require"})
   }
   if(!lastName){
    return res.status(400).json({lastName: "lastName is require"})
   }
   if(!phone){
    return res.status(400).json({phone: "phone is require"})
   }
   if(!_password){
    return res.status(400).json({password: "password is require"})
   }
    const password = await genPassword(req.body._password);
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