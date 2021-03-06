var express = require('express');
const { route } = require('.');
const User = require('../models');
var router = express.Router();
var jwt = require('jsonwebtoken');
const { DATE } = require('sequelize/dist');
var {getUserById} = require(`../controllers/user`);
router.param("Id",getUserById);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//Signin
router.post("/login", async function(req, res){
  const { email, password } = req.body;
    try {
        // find user by userName
        const user = await User.findOne({
            where: { email: email },
        });
       //console.log(user);
        if (user === null) {
            res.status(400).send("Invalid Credentials");
        } else {
            // if (await bcrypt.compare(password, user.password)) {
                // create a jwt token
                if( password===user.password){
                  console.log(user.dataValues);
                const accessToken = jwt.sign(
                   user.dataValues,
                    "vvhbhjk"
                );
                console.log("token",accessToken);

                //set cookie
                res.cookie("accessToken", accessToken, {
                    httpOnly:true,
                   expire: new DATE()+9999
                });

                res.status(200).json({
                    message: "loggedIn",
                    // accessToken: accessToken,
                    user,
                });
            } else {
                res.status(400).send("Invalid Credentials!");
            }
            // res.status(200).json({
            //           message: "loggedIn",
            //           // accessToken: accessToken,
            //           user,
            //       });

        }}
     catch (err) {
        res.status(500).json({ message: "something went wrong!", err });
    }
  
});
//signup
router.post("/signup",async function(req,res){
  const saltRounds = 10;
  const { fullname, email, password } = req.body;
console.log(fullname,"in signup.....");

  try {
      // check if user already exists with the same email
      // const alreadyExists = await User.findOne({
      //     where: {
      //         [Op.or]: [{ email: email }],
      //     },
      // });
      // if (alreadyExists) {
      //     res.status(401).send("User already exists");
      // } else {
      //     // hash the password
          // const salt = bcrypt.genSaltSync(saltRounds);
          // const hash = bcrypt.hashSync(password, salt);

          // create new user
          const newUser = await new User({
              fullname: fullname,
              email: email.toLowerCase(),
              password: password,
          });

          // save user
          const savedUser = await newUser.save();

          console.log("from frontend",savedUser);


          res.status(201).json({
              message: "User created successfully",
              savedUser,
          });

      
  } 
  catch (err) {
      res.status(500).send("Something went wrong");
  }

});
//signout
router.get("/signout",async function(req,res){
  try {
    res.clearCookie("accessToken");
    return res.status(200).send("Logged Out");
} catch (err) {
    return res.status(500).json({ message: "could not logout", err });
}
});
//
router.get("/getallusers",async function(req,res)  {
    
        const users = await User.findAll();

        console.log("users in getall",users);
        try {
            if (users.length > 0) {
                return res.status(200).json(
                    users.map((item) => {
                        return {
                            fullname: item.fullname,
                            email: item.email,
                            password: item.password,
                            
                        };
                    }
                    ));
            } else {
                return res.status(200).json({
                    message:
                        "Currently no users are available!",
                });
            }
        }
        catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    
})
//Book Tickets
router.get("/book",)

module.exports = router;
