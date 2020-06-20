const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/userAuth');
// const moment = require('moment');

router.get('/', auth, async (req, res) => {
  try {
    const user = await db.query(
			"SELECT *, products.name FROM users JOIN orders ON orders.user_id=$1 JOIN products ON products.id=orders.product_id ORDER BY orders.id",
			[req.id]
		);
    res.json(user.rows[0]);
    console.log(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});


//DON'T DELETE: I used it to get all users and format their dob
// router.get('/', async (req, res)=> {
//   try {
//   const result = await db.query('SELECT * FROM users')
//   res.json(result.rows);

//   //testing the date format
//   console.log(result.rows[2].dob);
//   //formating the date format with moment library
//   console.log(moment(result.rows[2].dob).format('MMMM Do YYYY'))
//   } catch (error) {
//     console.log(error)
//   }
// })

module.exports = router;
