require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const requestLogger = require("./middlewares/request_logger");
const reqBodymethodOverride = require("./middlewares/req_body_method_override");
const setCurrentUser = require("./middlewares/set_current_user");
const session = require("express-session");
const app = express();
port = 8080;
const dishesRouter = require("./routes/dishes_routes");
const sessionsRouter = require("./routes/sessions_routes");
const pagesRouter = require("./routes/pages_routes");
const usersRouter = require("./routes/users_routes");

app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));

// look into the request and parse the body in the url encoded format and turn it into an object and assign to req.body
app.use(express.urlencoded({ extended: true }));

// method override
app.use(reqBodymethodOverride);

app.use(
  session({
    secret: process.env.BCRYPT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(setCurrentUser);
app.use(requestLogger);
app.use(expressLayouts);

// routes
app.use("/", pagesRouter);
app.use("/dishes", dishesRouter);
app.use("/", sessionsRouter);
app.use("/", usersRouter);

app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});
