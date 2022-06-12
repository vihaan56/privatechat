var mysql = require('mysql');

var con = mysql.createConnection({
  host: "vihaan.cltt7kwbidtr.us-east-1.rds.amazonaws.com",
  user: "vihaan90",
  password: "Vihaan9092",
  database:"chatui",
  charset : 'utf8mb4'
  // host: "localhost",
  // user: "root",
  // password: "",
  // database:"chat-system",
  // charset : 'utf8mb4'

});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
})


module.exports = con;