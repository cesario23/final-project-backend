const express = require("express")
const router = express.Router();
const {createUser, login} = require("./controller/userController");

router.get("/", function (req, res, next){
    res.send("respond with a resource")
});

router.post("/create-user", createUser);
router.post("/login", login);

router.get("/logout", function(req, res){
    res.clearCookie("jwt-cookie");
    res.send("Logged out!")
});

module.exports = router;