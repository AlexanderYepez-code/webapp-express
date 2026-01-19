import mysql, { createConnection } from "mysql2"

const connetion = mysql.createConnection({
    host: process.env.DB_HOST, 
    user : process.env.DB_USER ,
    password : process.env.DB_PASSWORD ,
    database : process.env.DB_DATABASE,                  

});

connetion.connect((err) =>{
    if(err) throw err;
    console.log("Connection from Mysql")
});

export default connetion;