const express = require('express');
const router = express. Router();
const Apple = require('../models/AppleEntity');

const AppleValidator = require('../validators/apple_input_validator');
const appleValidator = new AppleValidator();

/*
const appleList = [
    { id : '1',  name : 'gold', color : 'yellow'}
];
*/

router.get('/list', async (req, res) =>{
    try {
        const appleList = await Apple.find();
        res.send(appleList);
    }
            catch(err) {
            console.log(err);
            res.status(500).send('Errror while retrieving data');
        }
});

router.post('/add', async (req, res)=> {
    const validationResult = appleValidator.validateInputAppleForAdd(req.body);
    if (validationResult.error) {
        res.status(400).send(validationResult.error.details[0].message);
    }
    else {
        const newApple = new Apple( {name: req.body.name, color: req.body.color});
        try {
            const savedApple = await newApple.save(newApple);
            res.send(savedApple);
        }
        catch(err) {
            console.log(err);
            res.status(500).send('Errror while saving data');
        }
    }
});


module.exports = router;