
import express from "express";
import { auth } from "../middleware/auth.js";
import { CreateProduct,GetProduct,UpdateProduct,DeleteProduct,InsertProduct, GetOneProduct } from "../controller/product_controller.js";

import { creatTableUser, getUserOne, login, Register } from "../controller/user_controller.js";

const router = express.Router();
//====> product
const product = "/product";
router.post(product +"/create", CreateProduct)
router.get(product + "/get",auth, GetProduct)
router.post(product + "/add", auth,InsertProduct)
router.put(product + "/update", auth,UpdateProduct)
router.get(product + "/get/:id",auth, GetOneProduct)
router.delete(product + '/:id',auth, DeleteProduct);

//===> user
 router.post("/user/register",Register);
 router.get("/user/profile",getUserOne);
 router.post("/user/login",login);
 router.post("/user/create",creatTableUser);
 
export default router;
