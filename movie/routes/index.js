var express = require("express");
const { addMovie, deleteMovie } = require("../controllers/movie");
var router = express.Router();
const User = require("../models/index");
const Movie = require("../models/movie");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/user", async (req, res) => {
  var { fullname, password, email, roll } = req.body;

  try {
    const user = await new User({
       fullname: fullname,
       password: password,
       email: email, 
       roll: roll 
      });
    const savedTodo = await user.save();
    res.status(200).json(savedTodo);
  }
  catch (err) {
    res.status(400).json({ message: "err occured" });
  }
});

// router.post("/movie", async (req, res) => {
//   var { moviename, img, ratings, time } = req.body;
//   try {
//     const newmovie = await new Movie({
//       moviename: moviename,
//       img: img,
//       ratings: ratings,
//       time: time,
//     });
//     const savedimage = await newmovie.save();
//     res.status(200).json(savedimage);
//   }
//   catch (err) { res.status(400).json({ message: "err occured" }) };

// });

router.post("/movie",addMovie);
router.delete("/deletemovie/:id",deleteMovie)

// router.get("/movie")

module.exports = router;
