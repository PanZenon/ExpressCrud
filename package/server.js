require("./modules/dbOperations");
const { connection, getAllFilms } = require("./modules/dbOperations");
const mysql = require("mysql");
const { urlencoded } = require("express");
const express = require("express");
const router = require("./routes/films");
const app = express();
app.set("view engine", "pug");

const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

const filmsRouter = require("./routes/films");

app.use("/films", filmsRouter);

app.listen(3000);
