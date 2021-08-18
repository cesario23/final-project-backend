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
        console.log(e)
    }
}

async function login(req, res){
    
}