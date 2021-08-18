const bcrypt = require("bcryptjs")
const User = require('../model/Users')
const dbErrorHelper = require("../error/dbErrorHelper")
const jwt = require("jsonwebtoken")

async function createUser(req, res){
    try{
        let createdUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        })
        let genSalt = await bcrypt.genSalt(12);
        let hashedPassword = await bcrypt.hash(createdUser.password, genSalt);

        createdUser.password = hashedPassword;
        await createdUser.save();
        res.json({message: "user created"})

    }catch(e){
        res.status(500).json({message: dbErrorHelper(e)})
    }
}

async function login(req, res){
    try{
    let foundUser = await User.findOne({email: req.body.email});
    if(!foundUser){
        throw Error ("user not found, please sign up");
    } 
    let comparedPassword = await bcrypt.compare(
        req.body.password,
        foundUser.password
    );
    if(!comparedPassword){
        throw Error("check email and passwords");
    }
    let jwtToken = jwt.sign({username: foundUser.username,
       email: foundUser.email,
    },
    process.env.JWT_USER_SECRET_KEY
    );
    res.cookie("jwt-cookie", jwtToken,{
        expires: new Date(Date.now() + 3600000),
        httpOnly: false,
        secure: false,
    });
    res.json({
        user:{
            email: foundUser.email,
            username: foundUser.username,
        },
    })
    }catch(e){
        res.status(500).json({message: dbErrorHelper(e)})
    }
}

module.exports = {
    createUser,
    login,
}