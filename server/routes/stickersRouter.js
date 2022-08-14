const { response } = require("../app");

const router = require("express").Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    const queryString = "select * from stickers order by random() limit 1;";
    db.query(queryString)
      .then((data) => {
        res.json(data.rows);
      })
  });

  return router;
};
