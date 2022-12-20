const mysql = require("mysql2");
let conn = mysql.createConnection({
    host : 'project-db-stu.ddns.net',
    user : 'iamyourapp',
    password : "12345",
    port : "3307",
    database : "iamyourapp"
})
module.exports = conn;