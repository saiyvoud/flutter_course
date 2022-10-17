export const CREATE = `create table user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName varchar(20),
    lastName varchar(20),
    phone varchar(15),
    password varchar(100),
    profile varchar(100)
)`
export const REGEISTER = 'insert into user (firstName,lastName,phone,password) value ?'
export const FINDONE = `select * from user where id=?`;
export const UPDATE_USER = "UPDATE  user SET `firstName` = ?,`lastName` = ?, `profile` = ? where id = ?" ;
export const SELECT_PHONE = 'select * from user where phone=?';
export const SELECT_TOKEN = 'select * from user where id=?';
export const LOGIN = `select * from user where phone = ? `;