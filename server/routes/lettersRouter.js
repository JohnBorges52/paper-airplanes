const router = require("express").Router();

//GET all active letters
module.exports = (db) => {
  router.get("/", (req, res) => {
    //// This query is to show all letters when I am not logged in
    if (!req.query.userID) {
      const queryString = `
      SELECT users.id as user_id, letters.id 
      AS letter_id, letter_message, type, username,flag_count, sender_id, emote 
      FROM users JOIN letters on users.id = letters.sender_id
      WHERE active IS true AND flag_count <= 3 
      ORDER BY created_at DESC`;
      db.query(queryString)
        .then((data) => {
          res.json(data.rows);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } else {
      //// This query is for the 'all letters' page to show all letters that are not mine when I am logged in
      const queryString = `
        SELECT users.id as user_id, letters.id as letter_id, letter_message, type, username,flag_count, sender_id, emote from users join letters on users.id = letters.sender_id
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
    select letters.id as letter_id, letter_message, type, flag_count, sender_id, emote from letters
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

  //POST a new letter
  router.post("/new", (req, res) => {
    const queryString = `INSERT INTO letters (letter_message, type, sender_id, emote)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    db.query(queryString, [
      req.body.message,
      req.body.letterType,
      req.body.senderID,
      req.body.emote,
    ])
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
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
    const queryString = `
      SELECT * FROM letters WHERE id = $1`;
    db.query(queryString, [req.params.id])
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
