export const CREATE = `create table user (
    id varchar(50) PRIMARY KEY,
    firstName varchar(20),
    lastName varchar(20),
    phone int,
    password varchar(30),
    profile varchar(100)
)`
export const REGEISTER = 'insert into user (id,firstName,lastName,phone,password) value ?'
export const FINDONE = 'select * from user where id=?';
export const SELECT_PHONE = 'select * from user where phone=?';
export const SELECT_TOKEN = 'select * from user where id=?';
export const LOGIN = 'select * from user where phone = ? And password = ? ';