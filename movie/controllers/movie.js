const Movie = require("../models/movie");

//add by admin
exports.addMovie = async (req, res, next) => {
   
    const { moviename, img, ratings,time,numberofseats} = req.body;

    if (!moviename) {
        return res
            .status(400)
            .json({ message: "yo! come on, you gotta write something!" });
    }

    const newMovie = new Movie({
        moviename:moviename, img:img, ratings:ratings,time:time,numberofseats:numberofseats
    });

    const savedMovie = await newMovie.save();

    res.status(201).json({ message: "Movie created Successfully", savedMovie });
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
            message: "movie not found or the movie does not belong to you!",
        });
    }
};



exports.getAllMovie = async (req, res) => {
    await Movie.findAll({
        where: {
            UserId: req.user.id,
        },
    });

    if (movies.length > 0) {
        return res.status(200).json(
            movies.map((item) => {
                if (item.description) {
                    return {
                        todo: item.todo,
                        description: item.description,
                        id: item.id,
                    };
                } else {
                    return {
                        todo: item.todo,
                        id: item.id,
                    };
                }
            })
        );
    } else {
        return res.status(200).json({
            message:
                "Hey, you haven't got anything to do rn. Hit the 'addtodo' route with a task!",
        });
    }
};

exports.getTodo = async (req, res) => {
    try {
        const todo = await Todo.findOne({
            where: {
                id: req.params.id,
                UserId: req.user.id,
            },
        });
        if (todo) {
            return res.status(200).json({
                todo,
            });
        } else {
            return res.json({
                message: "no such todo exists",
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: "Todo not found or the todo does not belong to you!",
            err,
        });
    }
};

exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { description, todo } = req.body;
    try {
        if (
            await Todo.update(
                {
                    todo: todo,
                    description: description,
                },
                { where: { id: id, UserId: req.user.id } }
            )
        ) {
            return res.status(200).json({
                message: "todo updated",
            });
        } else {
            return res.status(404).json({
                message: "invalid request",
            });
        }
    } catch (err) {
        return res.status(404).json({
            message: "Todo not found or the todo does not belong to you!",
            err,
        });
    }
};

exports.getMovieById=(req,res,next,id)=>{
    Movie.findById(id).exec((err,movie)=>{
        if(err||!movie){
           return  res.status(400).json({
               error:"No product in db"
           })
        }
        req.movie=movie;
        next();
    })
}

exports.getMovie=(req,res)=>{
    return res.json(req.movie);
}
