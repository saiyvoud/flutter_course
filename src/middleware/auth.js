import  jwt  from "jsonwebtoken";
import {_Response} from './respone.js'
import dotenv from 'dotenv'
import con from './db.js'
import  bcrypt from 'bcryptjs'
import { SELECT_PHONE, SELECT_TOKEN} from "../model/user.js";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const SALT_I = parseInt(process.env.SALT);
//
export const generateToken =(data)=>{
return jwt.sign({data},SECRET_KEY,{expiresIn:'7d'})

}
//
export const auth = (req,res,next)=>{
    const token = req.headers['token'];
    if(!token) return res.json({msg:"no found token"});
  const data = verifyTokens(token)
  const values = data.id
   con.query(SELECT_TOKEN,[values],function(err,result){
     if(err) throw err
     if(!result) return res.json(result)
    next()
   });
}
//
export const verifyTokens= (token) => {
  const decodeToken = jwt.verify(token, SECRET_KEY, (err, decode) => {
    return decode
  });
  return decodeToken
};
export const genPassword = async (password)=>{
  const saltHash = await bcrypt.genSalt(SALT_I)
  const hashPassword = await bcrypt.hash(password, saltHash)
  return hashPassword
}
export const comparePassword = async (loginPassword, password)=>{
  return await bcrypt.compare(loginPassword, password)
}