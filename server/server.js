// web server config
const express = require("express");
const db = require("./configs/db.config");
const path = require("path");
const cookieParser = require("cookie-parser"); /***/
const logger = require("morgan");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// separated routes for each resourse
const usersRouter = require("./routes/usersRouter");
const lettersRouter = require("./routes/lettersRouter");
const responsesRouter = require("./routes/responses");
const stickersRouter = require("./routes/stickers");

// mount all resources
app.use("/users", usersRouter(db));
app.use("/letters", lettersRouter(db));
app.use("/responses", responsesRouter(db));
app.use("/stickers", stickersRouter(db));

module.exports = app;
