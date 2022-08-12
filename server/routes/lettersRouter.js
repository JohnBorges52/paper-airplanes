const router = require("express").Router();

//GET all active letters
module.exports = (db) => {
  router.get("/", (req, res) => {
    // let queryString = "";
    console.log(req.query.userID);
    //// This query is to show all letters when I am not logged in
    if (!req.query.userID) {
      const queryString = `
      Select * from letters join users on users.id = letters.sender_id
      WHERE active IS true AND flag_count <= 3 
      ORDER BY created_at DESC`;
      db.query(queryString)
        .then((data) => {
          res.json(data.rows);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } else { //// This query is for the 'all letters' page to show all letters that are not mine when I am logged in
      const queryString = `
        Select * from letters join users on users.id = letters.sender_id
        WHERE active IS true
        AND sender_id != $1 AND flag_count <= 3
        ORDER BY created_at DESC`;
      db.query(queryString, [req.query.userID])
        .then((data) => {
          res.json(data.rows);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  });
  ///// This query is for the 'my letters' page
  router.get("/profile", (req, res) => {
    const queryString = `
    SELECT * FROM letters 
    WHERE active IS true 
    AND sender_id = $1 AND flag_count <= 3 
    ORDER BY created_at DESC`;
    db.query(queryString, [req.query.userID])
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //GET new letter form
  router.post("/new", (req, res) => {
    const queryString = `INSERT INTO letters (letter_message, type, sender_id)
      VALUES ($1, $2, $3)
      `;
    db.query(queryString, [
      req.body.message,
      req.body.letterType,
      req.body.senderID,
    ]);
    // console.log(req.body)

    return;
  });

  router.put("/:id/flag", (req, res) => {
    const queryString = `
      UPDATE letters SET flag_count = flag_count + 1
      WHERE id = $1`;
    db.query(queryString, [req.params.id])
      .then(res.send("updated"))
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.put("/:id/delete", (req, res) => {
    const queryString = `
      UPDATE letters SET active = false
      WHERE id = $1`;
    db.query(queryString, [req.params.id])
      .then(res.send("deleted"))
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
