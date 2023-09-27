const db = require("./");
const bcrypt = require("bcrypt");

const email = "sam@email.com";
const password = "pudding";
const saltRounds = 10;

const sql = `
  INSERT INTO users (email, password_digest)
  VALUES ($1, $2);
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
