const express = require('express');
const router = express.Router();
const conversations = require("./conversations");

router.get("/:idx", ( req, res )=>{
    if(Number(req.params.idx)>=conversations.createEventFlow.length){
        console.log("No predefined dilog available...");
        return res.end();
    }else{
        res.json({message: conversations.createEventFlow[req.params.idx], index: req.params.idx});
    }
});
module.exports = router;