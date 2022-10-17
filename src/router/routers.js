
import express from "express";
import { auth } from "../middleware/auth.js";
import { CreateProduct,GetProduct,UpdateProduct,DeleteProduct,InsertProduct } from "../controller/product_controller.js";

import { creatTableUser, getUserOne, login, Register, updateProfile } from "../controller/user_controller.js";

const router = express.Router();
//====> product
const product = "/product";
router.post(product +"/create", CreateProduct)
router.get(product ,auth, GetProduct)
router.post(product, auth,InsertProduct)
router.put(product , auth,UpdateProduct)
router.delete(product + '/id',auth, DeleteProduct);

//===> user
 router.post("/user/register",Register);
 router.get("/user/profile",auth,getUserOne);
 router.put("/user/updateProfile",auth,updateProfile);
 router.post("/user/login",login);
 router.post("/user/create",creatTableUser);
 
export default router;
