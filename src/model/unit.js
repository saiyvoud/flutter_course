export const CREATE = `create table unit (
    id varchar(50) PRIMARY KEY,
    name nvarchar(50),
    created_at Date,
    updated_at Date
)`
export const INSERT = 'insert into unit (id,name,created_at,updated_at) value ?'
export const SELECT_TOKEN = 'select * from user where id=?';
export const SELECT_PHONE = 'select * from user where phone=?';
export const LOGIN = 'select * from user where phone = ? And password = ? ';