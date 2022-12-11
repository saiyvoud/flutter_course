import mysql from 'mysql'
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'course',
    })
    con.connect(function(err){
        if (err) {
            return console.error('error: ' , err.message);
        }
        console.log("Mysql Connected....");
        
    })
export default con;





