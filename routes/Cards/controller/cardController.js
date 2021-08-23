const Card = require("../model/Card")

async function getAllCards(req, res){
    try{
    let allCards = await Card.find({});
    res.json({payload: allCards})
    }catch(e){
        res.status(500).json({message: e.message, error: e})
    }
}

async function createCard(req, res){
    try{
     let createdCard = new Card({
         title: req.body.title,
         rank:  req.body.rank,
     })
     let savedCard = await createdCard.save();
     res.json({message: "card created", payload: savedCard })
    }catch(e){
        res.status(500).json({message: e.message, error: e})
    }
}
async function deleteCard(req, res){
    try{
     let deletedCard = await Card.findOneAndDelete({title: req.body.title});
     res.json({ payload: deletedCard})

    }catch(e){
    res.status(500).json({message: e.message, error: e})
    }
}

module.exports ={
    getAllCards,
    createCard,
    deleteCard,
}