require("../modules/dbOperations");
const {
  connection,
  getAllFilms,
  insertNewFilms,
  deleteFilm,
  getFilmById,
  editFilm,
} = require("../modules/dbOperations");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  connection.query(getAllFilms(), function (err, rows) {
    res.render("films/filmsList", { data: rows });
  });
});
router.get("/new", (req, res) => {
  res.render("films/new");
});
router.get("/edit/:id", (req, res) => {
  var id = req.params.id;
  connection.query(getFilmById(id), function (err, rows) {
    res.render("films/edit", { data: JSON.parse(JSON.stringify(rows)) });
  });
});
router.post("/", (req, res) => {
  if (
    req.body.name == "" ||
    req.body.type == "" ||
    req.body.img == "" ||
    req.body.premiere == ""
  ) {
    res.render("films/error");
  } else {
    connection.query(
      insertNewFilms(
        req.body.name,
        req.body.type,
        req.body.img,
        req.body.premiere
      )
    );
    connection.query(getAllFilms(), function (err, rows) {
      res.render("films/filmsList", { data: rows });
    });
  }
});

router
  .route("/:id")
  .get((req, res) => {
    var id = req.params.id;
    res.send(`get`);
  })
  .put((req, res) => {
    var id = req.params.id;
    connection.query(
      editFilm(
        id,
        req.body["name"],
        req.body["type"],
        req.body["img"],
        req.body["premiere"]
      )
    );
    connection.query(getAllFilms(), function (err, rows) {
      res.render("films/filmsList", { data: rows });
    });
  })
  .delete((req, res, next) => {
    var id = req.params.id;
    connection.query(deleteFilm(id));
    connection.query(getAllFilms(), function (err, rows) {
      res.render("films/filmsList", { data: rows });
    });
  });

router.param("id", (req, res, next, id) => {
  next();
});

module.exports = router;
