var mysql=require('mysql');
var pool=mysql.createPool({
    host:'localhost',
    port:3306,
    user:'root',
    password:'123',
    database:'inventory',
    connectionlimit:100,
    multipleStatement:true,
  
  })
  module.exports=pool;