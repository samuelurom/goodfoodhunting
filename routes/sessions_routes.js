const express = require("express");
const db = require("../db");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = $1;";
  const { email } = req.body;
  values = [email];

  db.query(sql, values, (err, dbRes) => {
    err && res.send(err);

    if (!dbRes.rows.length) {
      res.render("login");
    }

    const inputPassword = req.body.password;
    const hashedPassword = dbRes.rows[0].password_digest;

    bcrypt.compare(inputPassword, hashedPassword, (err, result) => {
      if (result) {
        // log user in
        // req.session()
        req.session.userId = dbRes.rows[0].id;

        res.redirect("/");
      } else {
        // incorrect password
        res.render("login");
      }
    });
  });
});

router.delete("/logout", (req, res) => {
  req.session.userId = null;
  res.redirect("/login");
});

module.exports = router;
