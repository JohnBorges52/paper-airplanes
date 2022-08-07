const { response } = require("../app");

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
    userID = req.session.user_id

    if (!userID) {
      res.redirect("/register")
    }
    res.redirect("/")
    // if logged in:
    //   redirect home
    // if not logged in:
    //   render the registration form
  });

  //POST create a new user
  router.post("/register", (req, res) => {
    // email = req.body.email
    // password = req.body.password

    // const username = user.username;
    // const email = user.email;
    // const password = user.password;

    // db.query(`
    // INSERT INTO users (username, email, password) VALUES ($1, $2, $3);
    // `, [usernamegenerator(), email, password])
    //   .then((user) => {
    //     if (!user) {
    //       res.send({ error: "error" });
    //       return;
    //     }
    //     req.session.userId
    //   });

    // res.render("")
  });

  // GET login form
  router.get("/login", (req, res) => { });

  // POST logout
  router.post("/logout", (req, res) => { });

  /*************SECONDARY FEATURES ***********/

  // GET a user info
  router.get("/info", (req, res) => { });

  // GET edit form
  router.get("/edit", (req, res) => { });

  // POST edit form
  router.post("/edit", (req, res) => { });

  return router;
};
