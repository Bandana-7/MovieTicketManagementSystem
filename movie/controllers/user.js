const User = require("../models");
const { check, validationResult } = require('express-validator');

var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');




exports.getUserById = async (req, res, next, id) => {
    //  console.log(id+"  ID  ");
    const user = await User.findOne(
        {
            where: {
                [id]: req.params.id
            }
        }
    );

    if (!user) {
        res.status(401).json({
            err: "no user found in database"
        })
    }
    console.log(user);
    req.profile = user;
    next();
}


//protected routes
// exports.isSignedIn = expressJwt({
//     secret: "vvhbhjk",
//     userProperty: "auth"
// });


//custom middlewares
exports.isAuthenticated = (req, res, next) => {

    let checker = req.profile  && req.profile.id == req.auth.id
    if (!checker) {
        res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next();
};
exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        res.status(403).json({
            error: "you are not ADMIN,ACCESS DENIED"
        })
    }
    next();
};