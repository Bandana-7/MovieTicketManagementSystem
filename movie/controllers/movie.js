const Movie = require("../models/movie");

//add by admin
exports.addMovie = async (req, res, next) => {

    const { moviename, img, ratings, time, numberofseats } = req.body;
    console.log(numberofseats);
    try {
        if (!moviename) {
            return res
                .status(400)
                .json({ message: "yo! come on, you gotta write something!" });
        }

        const newMovie = new Movie({
            moviename: moviename, img: img, ratings: ratings, time: time, numberofseats: numberofseats
        });

        const savedMovie = await newMovie.save();

        res.status(200).json({ message: "Movie created Successfully", savedMovie });
    }

    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

};

//admin detes movie
exports.deleteMovie = async (req, res) => {
    try {
        await Movie.destroy({
            where: {
                id: req.params.id,
                // UserId: req.user.id,
            },
        });

        return res.status(200).json({
            message: "movie deleted!",
        });
    } catch {
        return res.status(500).json({
            message: "movie not found!",
        });
    }
};



exports.getAllMovie = async (req, res) => {
    const movies = await Movie.findAll();
    try {
        if (movies.length > 0) {
            return res.status(200).json(
                movies.map((item) => {
                    return {
                        moviename: item.moviename,
                        img: item.img,
                        ratings: item.ratings,
                        time: item.time,
                        numberofseats: item.numberofseats,
                    };
                }
                ));
        } else {
            return res.status(200).json({
                message:
                    "Currently no movies are available!",
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
};


exports.getMovie = async (req, res) => {
    try {
        const movie = await Movie.findOne({
            where: {
                moviename: req.params.moviename,
            },
        });
        if (movie) {
            return res.status(200).json({
                movie,
            });
        } else {
            return res.json({
                message: "no such movies exists",
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: "Movie not found",
            err,
        });
    }
};


exports.updateMovie = async (req, res) => {
   
    const { moviename, img, ratings, time, numberofseats } = req.body;
    console.log(moviename, req.params.moviename);
    try {
        if (
            await Movie.update(
                {
                moviename: moviename, img: img, ratings: ratings, time: time, numberofseats: numberofseats
                },
                { 
                    where: { moviename: req.params.moviename } }
            )
        ) {
            console.log(moviename);
            return res.status(200).json({
                message: "Movie updated",
            });
        } else {
            return res.status(404).json({
                message: "invalid request",
            });
        }
    } catch (err) {
        return res.status(404).json({
            message: "Movie not found!",
            err,
        });
    }
};


