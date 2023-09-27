const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  console.log(req.session.userId);
  db.query("SELECT * FROM dishes ORDER BY id;", (err, dbRes) => {
    let dishes = dbRes.rows;
    res.render("home", { dishes });
  });
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
