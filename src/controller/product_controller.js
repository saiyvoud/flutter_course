import json from "body-parser";
import con from "../middleware/db.js";
import { INSERT, CREATE, UPDATE, DELETE, SELECT, SELECT_ONE } from "../model/product.js";
import UploadImage from "../middleware/cloudinary.js";

export const CreateProduct = () => {
  try {
    con.query(CREATE, function (err, row) {
      if (err) throw err;
     return res.json({msg:"Table created"});
    });
  } catch (error) {
    console.log("ຳerror:", +error);
  }
};
export const GetProduct = (req,res) => {
  try {
    con.query(SELECT, function (err, result, fields) {
      if (err) throw err;
      // console.log(result)
       return res.json({msg:"get product sucessful",result})
    });
  } catch (error) {
    console.log("ຳerror:", +error);
  }
};
export const GetOneProduct = (req,res) => {
  try {

    con.query(SELECT_ONE,[req.params.id],function (err, result, fields) {
      if (err) throw err;
      // console.log(result)
       return res.json({msg:"get product sucessful",result})
    });
  } catch (error) {
    console.log("ຳerror:", +error);
  }
};

export const InsertProduct = async(req, res) => {
  try {
    if(!req.body.name){
    return res.json({name:"name is require"})
    }
    const image = await UploadImage(req.body.image)
    const values = [[req.body.name,req.body.description,req.body.price,image]];
    con.query(INSERT, [values], function (err, result) {
      if (err) throw err;
      return res.json({msg:"insert product successful"})
    });
  } catch (error) {
    console.log("ຳerror:", +error);
  }
};

export const UpdateProduct = (req,res) => {
  try {
    const name = req.body.name
    const price =req.body.price;
    const id =req.body.id;
    
    con.query(UPDATE,[name,price,id], function (err, result) {
      if (err) throw err;
     return res.json({msg:"update product successful"})
    });
  } catch (error) {
    console.log("ຳerror:", +error);
  }
};
export const DeleteProduct = (req,res) => {
  try {
    const values = req.params.id;
    con.query(DELETE,values, function (err, result) {
      if (err) throw err;
     return res.json({msg:"delete product successful"})
    });
  } catch (error) {
    console.log("ຳerror:", +error);
  }
};
