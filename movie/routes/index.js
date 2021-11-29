var express = require("express");
const { addMovie, deleteMovie, getAllMovie, getMovie, updateMovie} = require("../controllers/movie");
var router = express.Router();
const {isAuthenticated, isAdmin} = require("../controllers/user");
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
    const savedMovie = await user.save();
    res.status(200).json(savedMovie);
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

router.post("/addmovie/:id",isAuthenticated,isAdmin,addMovie);
router.delete("/deletemovie/:id",isAuthenticated,isAdmin,deleteMovie);
router.get("/getallmovie",getAllMovie);
router.get("/getmovie/:moviename",getMovie);
router.put("/updatemovie/:moviename",updateMovie);
// router.get("/movie")

module.exports = router;
