const express = require('express');
const router = express.Router();

router.get ('/', (req,res)=>{
    res.json("you got the privat route")
})

module.exports = router;
