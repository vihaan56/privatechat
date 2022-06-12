const express = require("express");
const router = express.Router();
const con = require("../connections/db");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_TOKEN = "IAMVIHAANSINGLA";
const fetchuserdata = require("../middlewares/fetchuserdata");

router.post("/checktoken", fetchuserdata, async (req, res) => {
  if (req.user.status === "error") {
    res.send({ status: "error" });
  } else {
    res.send({ status: "success" });
  }
});


router.post(
  "/register",
  async (req, res) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json([{ status: 200, error: errors.array() }]);
    }
    const name = req.body.name;
    const surname = req.body.surname;
    const phone = req.body.phone;
    const username = req.body.username
    const password = req.body.password;
    var timestamp = new Date().toString();

    con.query(
      "SELECT * FROM `users` WHERE `username`=?",
      [username],
      (error, result) => {
        if (result.length > 0) {
          return res.json({ status: "error", message: "Username already exist" });
        } else {
          con.query(
            "SELECT * FROM `users` WHERE `phone_number`=?",
            [phone],
            (error, result2) => {
              if (result2.length > 0) {
                return res.json({
                  status: "error",
                  message: "Phone number already exist",
                });
              } else {
                const salt = bcrypt.genSaltSync(10);
                const newpass = bcrypt.hashSync(password, salt);
                con.query(
                  "INSERT INTO `users`(`name`, `surname`, `username`, `phone_number`, `password`, `timestamp`) VALUES(?,?,?,?,?,?)",
                  [
                    name,
                    surname,
                    username,
                    phone,
                    newpass,
                    timestamp
                    
                  ],
                  (err, success) => {
                    // console.log(err)
                    if (success.affectedRows === 1) {
                      const data = {
                        user: {
                          id: success.insertId,
                        },
                      };

                      const authtoken = jwt.sign(data, JWT_TOKEN);
                      return res.json({
                        status: "success",
                        authtoken: authtoken,
                        userid: success.insertId,
                      });
                    } else {
                      return res.json({
                        status: "error",
                        message: "Some error ocuured",
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
);


router.post(
    "/login",
    body("username", "Enter a valid username").isLength({min:3}),
    body("password", "Enter a password").isLength({min:5}),
  
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({
          status: "error",
          message: "You miss some input fields",
        });
      }
      const { username, password } = req.body;
      try {
        con.query(
          "SELECT * FROM `users` WHERE `username`=?",
          [username],
          (error, result) => {
            if (result.length === 1) {
              bcrypt.compare(password, result[0].password, (err, success) => {
                if (success) {
                  const data = {
                    user: {
                      id: result[0].user_id,
                      name:result[0].name,
                      surname:result[0].surname,
                      username:username
                    },
                  };
                  const authtoken = jwt.sign(data, JWT_TOKEN);
                  res.cookie("token",authtoken,{domain:"http://localhost:3000/",httpOnly:true,})
                  return res.json({
                    status: "success",
                    authtoken: authtoken,
                    userid: result[0].user_id,
                  });
                } else {
                  return res.json({
                    status: "error",
                    message: "You entered credentials are not valid",
                  });
                }
              });
            } else {
              return res.json({
                status: "error",
                message: "You entered credentials are not valid",
              });
            }
          }
        );
      } catch (error) {
        return res.json({ status: "error", message: "Some error occured" });
      }
    }
  );


router.post(
    "/register",
    [
      body("name").isLength({ min: 3 }),
      body("surname").isLength({ min: 3 }),
      body('username').isLength({min:3}),
      body('phone').isLength({min:10,max:10}),
      body("password").isLength({ min: 5 }),

    ],
    async (req, res) => {
     
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json([{ status: 200, error: errors.array() }]);
      }

      const name = req.body.name;
      const username = req.body.username;
      const surname = req.body.surname;
      const phone = req.body.phone;
      const password = req.body.password;
      const created_at = new Date().toString();
      con.query(
        "SELECT * FROM `users` WHERE `username`=?",
        [username],
        (error, result) => {
          if (result.length > 0) {
            return res.json({ status: "error", message: "username already exist" });
          } else {
            con.query(
              "SELECT * FROM `users` WHERE `phone_number`=?",
              [phone],
              (error, result2) => {

                if (result2.length > 0) {
                  return res.json({
                    status: "error",
                    message: "Phone number already exist",
                  });
                } else {
                  const salt = bcrypt.genSaltSync(10);
                  const newpass = bcrypt.hashSync(password, salt);
                  con.query(
                    "INSERT INTO `users`( `name`, `surname`, `username`, `phone_number`, `password`, `timestamp`) VALUES(?,?,?,?,?,?)",
                    [
                      name,
                      surname,
                      username,
                      phone,
                      newpass,
                      created_at,
                    ],
                    (error, success) => {

                      if (success.affectedRows === 1) {
                        const data = {
                          user: {
                            id: success.insertId,
                            name:name,
                            surname:surname,
                            username:username,
                          },
                        };
  
                        const authtoken = jwt.sign(data, JWT_TOKEN);
                        return res.json({
                          status: "success",
                          authtoken: authtoken,
                          userid: success.insertId,
                        });
                      } else {
                        return res.json({
                          status: "error",
                          message: "Some error ocuured",
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  );



module.exports = router;
