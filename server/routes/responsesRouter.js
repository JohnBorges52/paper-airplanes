module.exports = (db) => {
  // GET all users
  router.get("/", (req, res) => {
    const queryString = "SELECT * FROM responses";
    db.query(queryString).then((data) => {
      res.json(data.rows);
    });
  });


  // GET a specific response
  router.get("/:id", (req, res) => {
    const queryString = `SELECT * FROM response WHERE id = ${id}`; /* <= check here to prevent sql injection*/
    db.query(queryString).then((data) => {
      res.json(data.rows);
    });
  });
  // GET a new response page
  router.get("/new", (req, res) => {

  });










};