const router = require("express").Router();

module.exports = (db) => {
  //GET all active letters
  router.get("/", (req, res) => {
    // let queryString = "";
    console.log(req.query.userID);
    if (!req.query.userID) {
      const queryString = `
      SELECT * FROM letters
      WHERE active = true AND flag_count <= 3`;
      db.query(queryString)
        .then((data) => {
          res.json(data.rows);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } else {
      const queryString = `
        SELECT * FROM letters
        WHERE active = true
        AND sender_id != $1 AND flag_count <= 3`;
      db.query(queryString, [req.query.userID])
        .then((data) => {
          res.json(data.rows);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  });

  // router.get("/mine", (req, res) => {
  //   const queryString = `
  //   SELECT * 
  //   FROM letters WHERE sender_id = 1`;
  //   db.query(queryString)
  //   .then((data) => {
  //     res.json(data.rows);
  //   })
  //   .catch((err) => {
  //     res.status(500).json({ error: err.message });
  //   });
  // });


  router.get("/profile", (req, res) => {
    const queryString = `
    SELECT *
    FROM letters WHERE sender_id = $1 AND flag_count <= 3`;
    db.query(queryString, [req.query.userID])
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //GET subset of letters based on logged in user
  // router.get("/profile/:id", (req, res) => {
  //   const queryString = `
  //   SELECT *
  //   FROM letters WHERE sender_id = $1`;
  //   db.query(queryString, [req.params.id])
  //     .then((data) => {
  //       res.json(data.rows);
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });

  //GET new letter form
  router.post("/new", (req, res) => {
    const queryString = `INSERT INTO letters (letter_message, type, sender_id)
    VALUES ($1, $2, $3)
    `;
    db.query(queryString, [req.body.message, req.body.letterType, req.body.senderID]);
    // console.log(req.body)


    return;
  });

  router.put("/:id", (req, res) => {
    const queryString = `
    UPDATE letters SET flag_count = flag_count + 1
    WHERE id = $1`;
    db.query(queryString, [req.params.id])
      .then(res.send("updated"))
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });


  router.get("/:id", (req, res) => {
    db.query(`SELECT * FROM letters WHERE id = $1;`, [req.params.id]).then(
      (data) => {
        res.json(data.rows);
      }
    );
  });
  //GET letter by ID
  // router.get("/:letter_id", (req, res) => {
  //   const queryString = `
  //   SELECT *
  //   FROM letters where letters.id = $1
  //   `;
  //   db.query(queryString, [req.params.letter_id])
  //     .then((data) => {
  //       res.json(data.rows);
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });

  return router;
};
