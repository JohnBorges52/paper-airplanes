const router = require("express").Router();

module.exports = (db) => {
  // GET all responses
  router.get("/", (req, res) => {
    const queryString =
      "SELECT * FROM responses"; /* <= THINK ABOUT PUTTING A LIMIT OVER HOW MANY WILL APPEAR ON THE PAGE*/
    db.query(queryString).then((data) => {
      res.json(data.rows);
    });
  });

  // GET a specific response
  router.get("/:id", (req, res) => {
    db.query(`SELECT * FROM responses WHERE id = $1;`, [req.params.id]).then(
      (data) => {
        res.json(data.rows);
      }
    );
  });

  // GET a new response page
  router.get("/new", (req, res) => {
    userID = req.session.user_id;

    /*
    if (!userID) {
      //render USER NOT LOGGED IN PAGE  WITH THE FIELDS TO LOG IN?
    }
    res.redirect("/login")
    */
  });

  router.post("/letters/:id/responses/new", (req, res) => {
    const response = req.body.response;
    const responder_id = req.session.user_id;
    const letter_id = req.params.letter_id; /*??????? IDK IF THIS WORKS*/

    db.query(
      `INSERT INTO responses (message, letter_id, responder_id) 
    VALUES ($1, $2, $3);`,
      [response, letter_id, responder_id]
    ).then((data) => {
      res.send(data.rows); /*??????? IDK IF THIS WORKS*/
    });
  });

  return router;
};
