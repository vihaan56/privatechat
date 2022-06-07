var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"chat-system",
  charset : 'utf8mb4'
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
})


module.exports = con;