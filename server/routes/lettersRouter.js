const router = require("express").Router();

module.exports = (db) => {
  //GET all active letters
  router.get("/", (req, res) => {
    const queryString = `
      SELECT * FROM letters
      WHERE active = true`;
    db.query(queryString)
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
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
  router.post("/profile", (req,res)=>{
    const queryString = `
    SELECT *
    FROM letters where sender_id = $1`;
    db.query(queryString, [req.body.userID])
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    })
  
  //GET subset of letters based on logged in user
  router.get("/profile/:id", (req, res) => {
    const queryString = `
    SELECT *
    FROM letters where sender_id = $1`;
    db.query(queryString, [req.params.id])
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    });
    
      
      //GET new letter form
      router.get("/new", (req, res) => {
        // if logged in
        //    render page with form for new letter
        return;
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
