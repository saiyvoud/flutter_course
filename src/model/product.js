export const CREATE = `CREATE TABLE product( 
      id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(30), 
    price varchar(10),
    image varchar(100)
    )`;

export const INSERT =
  `INSERT INTO product (name,description,price,image) VALUES ?`;

export const UPDATE =
 "UPDATE  product SET `name` = ?,`description` = ?, `price` = ?, `image` = ? where id = ?" ;
export const DELETE = `DELETE FROM product where id =?`;
export const SELECT =  `SELECT * FROM product`
export const SELECT_ONE =  `SELECT * FROM product where id =?`