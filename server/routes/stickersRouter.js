const { response } = require("../app");

const router = require("express").Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    const queryString = "SELECT * FROM users where email=$1";
    db.query(queryString, [req.query.email])
      .then((data) => {
        res.json(data.rows);
      })
      .then(()=>{
        console.log(12,req.query.email)

      })
  });

  return router;
};
