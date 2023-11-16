const express = require('express');
const Bank = require('../models/model');


const router = express.Router()


module.exports = router;


//Get by ID Method
// router.get('/', (req, res) => {
//     res.send('Get by ID API')
// })

router.get('/', async (req, res) => {
    try{
        const data = await Bank.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})