const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "epn_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Database is connected successfully !");
});

var createFilms =
  "CREATE TABLE if not exists films ( id INT NOT NULL AUTO_INCREMENT , name TEXT NOT NULL , type TEXT NOT NULL ,img TEXT NOT NULL,premiere TEXT NOT NULL, PRIMARY KEY (id));";
connection.query(createFilms);

var insertFilm =
  "INSERT INTO films (name,type,img,premiere) SELECT * FROM (SELECT 'Spider-Man: Far From Home' AS name, 'Action' AS type,'https://fwcdn.pl/fpo/98/69/789869/7892960.6.jpg' as img,'2019-06-26' as premiere) AS temp WHERE NOT EXISTS (SELECT name FROM films) LIMIT 1;";

connection.query(insertFilm);

function getAllFilms() {
  return "Select * from films";
}
function insertNewFilms(name, type, img, premiere) {
  return `insert into films(name,type,img,premiere) values ('${name}','${type}','${img}','${premiere}')`;
}
function deleteFilm(id) {
  return `delete from films where id = ${id}`;
}
function getFilmById(id) {
  return `select * from films where id = ${id}`;
}
function editFilm(id, name, type, img, premiere) {
  return `update films set name = '${name}',type = '${type}',img = '${img}',premiere = '${premiere}' where id = ${id} `;
}

module.exports = {
  getAllFilms,
  connection,
  insertNewFilms,
  deleteFilm,
  getFilmById,
  editFilm,
};
