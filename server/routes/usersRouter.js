const router = require("express").Router();

module.exports = (db) => {
  // GET all users
  router.get("/", (req, res) => {
    const queryString = "SELECT * FROM users";
    db.query(queryString).then((data) => {
      res.json(data.rows);
    });
  });

  // GET new user form
  router.get("/register", (req, res) => {
    // if logged in:
    //   redirect home
    // if not logged in:
    //   render the registration form
  });

  //POST create a new user
  router.post("/", (req, res) => {});

  // GET login form
  router.get("/login", (req, res) => {});

  // POST logout
  router.post("/logout", (req, res) => {});

  /*************SECONDARY FEATURES ***********/

  // GET a user info
  router.get("/info", (req, res) => {});

  // GET edit form
  router.get("/edit", (req, res) => {});

  // POST edit form
  router.post("/edit", (req, res) => {});

  return router;
};
