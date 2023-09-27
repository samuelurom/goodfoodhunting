const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/users", (req, res) => {
  // insert new user record
  const email = req.body.email;
  const password = req.body.password;
  const saltRounds = 10;

  const sql = `
    INSERT INTO users (email, password_digest)
    VALUES ($1, $2)
    RETURNING *;
  `;

  // 1. generate salt
  bcrypt.genSalt(saltRounds, function (err, salt) {
    // 2. hash the password
    bcrypt.hash(password, salt, function (err, hash) {
      // 3. insert user into db
      db.query(sql, [email, hash], (err, dbRes) => {
        if (err) {
          console.log(err);
        } else {
          console.log("user created");
        }
      });
    });
  });

  res.redirect("/login");
});

module.exports = router;
