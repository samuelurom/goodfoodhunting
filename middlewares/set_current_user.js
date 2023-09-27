const db = require("../db");

// another middleware to check userId of wether a user is logged in
// create user object by fetchin user record from db
function setCurrentUser(req, res, next) {
  res.locals.user = null;

  if (!req.session.userId) {
    return next();
  }

  // fetch user from db with id
  const sql = "SELECT * FROM users WHERE id = $1";

  db.query(sql, [req.session.userId], (err, dbRes) => {
    if (err) {
      console.log(err);
      process.exit(1); // stop the program
    } else {
      // and access user everywhere
      const user = dbRes.rows[0];
      res.locals.user = user;
    }

    next();
  });
}

module.exports = setCurrentUser;
