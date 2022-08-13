const router = require("express").Router();

module.exports = (db) => {
    // Get a specific user's unread responses
    router.get('/unread', (req, res) =>{
      const queryString = `
      select count(*) 
      from responses 
      join letters on letters.id = responses.letter_id  
      join users on users.id = letters.sender_id 
      where users.id = $1 
      and responses.read is false;
      `
      db.query(queryString, [req.query.userID])
        .then((data) => {
          res.json(data.rows);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  
    router.put('/read', (req, res) => {
      const queryString = `
      UPDATE responses 
      SET read = true 
      WHERE letter_id = $1
      `;
      db.query(queryString, [req.params.id])
        .then(res.send("updated"))
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    })


  // GET a specific response
  router.get("/:id", (req, res) => {

    db.query(`SELECT * FROM responses WHERE active IS true AND letter_id = $1 ORDER BY created_at DESC;`, [req.params.id]).then(
      (data) => {

        res.json(data.rows);
      }
    );

  });


  router.put("/:id/delete", (req, res) => {
    const queryString = `
      UPDATE responses SET active = false
      WHERE id = $1`;
    db.query(queryString, [req.params.id])
      .then(res.send("deleted"))
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });


  // // GET a new response page
  // router.get("/new", (req, res) => {
  //   userID = req.session.user_id;

  //   /*
  //   if (!userID) {
  //     //render USER NOT LOGGED IN PAGE  WITH THE FIELDS TO LOG IN?
  //   }
  //   res.redirect("/login")
  //   */
  // });

  router.post("/new", (req, res) => {
    // const response = req.body.response;
    // const responder_id = req.session.user_id;
    // const letter_id = req.params.letter_id; /*??????? IDK IF THIS WORKS*/
    const queryString = `INSERT INTO responses (message, letter_id, responder_id) 
    VALUES ($1, $2, $3);`

    db.query(queryString, [req.body.message, req.body.letterID, req.body.responderID]);

    // db.query(
    //   `INSERT INTO responses (message, letter_id, responder_id) 
    // VALUES ($1, $2, $3);`,
    //   [response, letter_id, responder_id]
    // ).then((data) => {
    //   res.send(data.rows); /*??????? IDK IF THIS WORKS*/
    // });
  });

  return router;
};
