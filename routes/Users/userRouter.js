const express = require("express")
const router = express.Router();
const {createUser, login} = require("./controller/userController");
const {createCard, getAllCards, deleteCard} = require("../Cards/controller/cardController")

router.get("/", function (req, res, next){
    res.send("respond with a resource")
});

router.post("/create-user", createUser);
router.post("/login", login);
router.post("/create-card", createCard);
router.get("/get-all-cards", getAllCards);
router.get("/delete-card-by-title/:title", deleteCard);

router.get("/logout", function(req, res){
    res.clearCookie("jwt-cookie");
    res.send("Logged out!")
});

module.exports = router;