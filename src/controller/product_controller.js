import json from "body-parser";
import con from "../middleware/db.js";
import {
  INSERT,
  CREATE,
  UPDATE,
  DELETE,
  SELECT,
  SELECT_ONE,
} from "../model/product.js";
import UploadImage from "../middleware/cloudinary.js";

export const CreateProduct = (req,res) => {
  try {
    con.query(CREATE, function (err, result) {
      if (err) throw err;
     
      return res.json({ msg: "Table product created" });
    });
  } catch (error) {
    console.log("ຳerror:", +error);
  }
};
export const GetProduct = (req, res) => {
  try {
    con.query(SELECT, function (err, data, fields) {
      if (err) throw err;
      // console.log(result)

      return res.json({ msg: "get product sucessful", data });
    });
  } catch (error) {
    console.log("ຳerror:", +error);
  }
};


export const InsertProduct = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ name: "name is require" });
    }
    if (!req.body.description) {
      return res.status(400).json({ description: "description is require" });
    }
    if (!req.body.price) {
      return res.status(400).json({ price: "price is require" });
    }
    if (!req.body.image) {
      return res.status(400).json({ image: "image is require" });
    }
    const image = await UploadImage(req.body.image);
    const values = [
      [req.body.name, req.body.description, req.body.price, image],
    ];
    con.query(INSERT, [values], function (err, result) {
      if (err) throw err;
      return res.status(200).json({ msg: "insert product successful" });
    });
  } catch (error) {
    console.log("ຳerror:", +error);
  }
};

export const UpdateProduct = (req, res) => {
  try {
  let {id,name,description,price,image} = req.body;
    if(!id){
      return res.status(400).json({ id: "id is require" });
    }
    if (!name) {
      return res.status(400).json({ name: "name is require" });
    }
    if (!description) {
      return res.status(400).json({ description: "description is require" });
    }
    if (!price) {
      return res.status(400).json({ price: "price is require" });
    }
    if (!image) {
      return res.status(400).json({ image: "image is require" });
    }
    con.query(UPDATE, [name,description,price,image,id], function (err, result) {
      if (err) throw err;
      return res.status(201).json({ msg: "update product successful" });
    });
  } catch (error) {
    console.log("error:", error);
  }
};
export const DeleteProduct = (req, res) => {
  try {

    const values = req.body.id;
    if(!values){
      return res.status(400).json({id: "id is require"})
    }
    con.query(DELETE, [values], function (err, result) {
      if (err) throw err;
      return res.json({ msg: "delete product successful" });
    });
  } catch (error) {
    console.log("error:", +error);
  }
};
