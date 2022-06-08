const express = require("express");
const router = express.Router();
const con = require("../connections/db");
const moment = require("moment");
router.post("/sendmessage", async (req, res) => {
  var uid = req.body.user_id;
  var rid = req.body.r_id;
  var mssg = req.body.message;
  var timestamp = Date.now();
  
  timestamp = Math.floor(timestamp / 1000);
  con.query(
    "SELECT * FROM `singlechat` WHERE (`user1`=? AND `user2`=?) OR (`user1`=? AND `user2`=?)",
    [uid, rid, rid, uid],
    (error, result) => {
      if (result.length > 0) {
        con.query(
          `INSERT INTO message(sender, content, chat_id, timestamp) VALUES (?,?,?,?)`,
          [uid, mssg, result[0].singlechat_id, timestamp],
          (error2, result2) => {
            var iid = result2.insertId;
            con.query(
              "UPDATE `singlechat` SET `lastmessage`=? WHERE `singlechat_id`=?",
              [iid, result[0].singlechat_id],
              (error, result) => {
                con.query(
                  "SELECT * FROM `message` WHERE `message_id`= ?",
                  [iid],
                  (error, result) => {
                    res.send(result);
                  }
                );
              }
            );
          }
        );
      } else {
        con.query(
          "INSERT INTO `singlechat`(`user1`, `user2`, `lastmessage`, `timestamp`) VALUES (?,?,?,?)",
          [uid, rid, -1, timestamp],
          (error, result) => {
            var chatid = result.insertId;
            con.query(
              `INSERT INTO message(sender, content, chat_id, timestamp) VALUES (?,?,?,?)`,
              [uid, mssg, chatid, timestamp],
              (error2, result2) => {
                var iid = result2.insertId;
                con.query(
                  "UPDATE `singlechat` SET `lastmessage`=? WHERE `singlechat_id`=?",
                  [iid, chatid],
                  (error, result) => {
                    con.query(
                      "SELECT * FROM `message` WHERE `message_id`= ?",
                      [iid],
                      (error, result) => {
                        res.send(result);
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    }
  );
});
router.get('/cookie',(req,res)=>{

   res.cookie("name","vihaan",{domain:"http://localhost:3000/"})
   res.send("vihaan")

})
router.post("/getallusers", async (req, res) => {
  var uid = req.body.user_id;
  con.query(
    "SELECT `user_id`,`name`,`username`,`timestamp` FROM users WHERE `user_id` != ?",
    [uid],
    (error, result) => {
      res.send(result);
    }
  );
});
router.post("/getusersforchat", async (req, res) => {
  var uid = req.body.user_id;
  con.query(
    `SELECT users.user_id,users.name,users.username,singlechat.lastmessage,singlechat.singlechat_id,singlechat.user1,singlechat.user2 FROM users,singlechat WHERE users.user_id!=${uid} AND (singlechat.user1 = ${uid} AND singlechat.user2 =users.user_id 
    )  `,
    (error, result) => {
      res.send({ result: result });
    }
  );
});
router.post("/fetchchat", async (req, res) => {
  var sid = req.body.user_id;
  var rid = req.body.r_id;
  var cid = [];

  con.query(
    "SELECT * FROM `singlechat` WHERE (`user1`=? AND `user2`=?) OR (`user1`=? AND `user2`=?)",
    [sid, rid, rid, sid],
    (error, result) => {
      if (result.length == 0) {
        res.send([]);
      } else if (result.length === 1) {
        con.query(
          "SELECT * FROM `message` where chat_id = ?",
          [result[0].singlechat_id],
          (error, result) => {
            if (result.length > 0) {
              res.json(result);
            } else {
              res.send([]);
            }
          }
        );
      } else {
        con.query(
          "SELECT * FROM `message` where chat_id = ? or chat_id= ?",
          [result[0].singlechat_id, result[1].singlechat_id],
          (error, result) => {
            if (result.length > 0) {
              res.json(result);
            } else {
              res.send([]);
            }
          }
        );
      }
    }
  );
});

module.exports = router;
