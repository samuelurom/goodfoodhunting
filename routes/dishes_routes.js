const express = require("express");
const router = express.Router();
const db = require("../db");
const ensureLoggedIn = require("../middlewares/ensure_logged_in");

router.get("/new", ensureLoggedIn, (req, res) => {
  res.render("new_form");
});

router.post("/", ensureLoggedIn, (req, res) => {
  const sql = `INSERT INTO dishes (title, image_url, user_id) VALUES ($1, $2, $3);`;
  const values = [req.body.title, req.body.image_url, req.session.userId];

  db.query(sql, values, (err, dbRes) => {
    err ? res.send(err) : res.redirect("/");
  });
});

router.delete("/:id", (req, res) => {
  const sql = `DELETE FROM dishes WHERE id = ${req.params.id};`;

  console.log(sql);

  db.query(sql, (err, dbRes) => {
    if (err) {
      console.log(err);
    }

    res.redirect("/");
  });
});

router.get("/:id", (req, res) => {
  // const sql = `SELECT * FROM dishes WHERE id = ${req.params.id}`;
  const sql = "SELECT * FROM dishes WHERE id = $1";
  const values = [req.params.id];

  db.query(sql, values, (err, dbRes) => {
    if (err) {
      res.send(err);
    }

    let dish = dbRes.rows[0];

    res.render("show", { dish });
  });
});

router.get("/:id/edit", (req, res) => {
  const sql = `SELECT * FROM dishes WHERE id = ${req.params.id}`;

  db.query(sql, (err, dbRes) => {
    if (err) {
      res.send(err);
    }

    let dish = dbRes.rows[0];

    res.render("edit_form", { dish });
  });
});

router.put("/:id", (req, res) => {
  const dishId = req.params.id;

  const sql = `
  UPDATE dishes
  SET title = '${req.body.title}', image_url = '${req.body.image_url}'
  WHERE id = ${dishId};
  `;

  db.query(sql, (err, dbRes) => {
    if (err) {
      res.send(err);
    }
    res.redirect(`/dishes/${dishId}`);
  });
});

module.exports = router;
