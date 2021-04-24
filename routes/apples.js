const express = require('express');
const router = express. Router();
const Apple = require('../models/AppleEntity');

const AppleValidator = require('../validators/apple_input_validator');
const appleValidator = new AppleValidator();

// list apples
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

// add an Apple
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

// find Apple by ID
router.get('/find/id/:id', async (req, res) =>{
    const validationResult = appleValidator.validateInputMongoId(req.params);
    if (validationResult.error) {
        res.status(404).send('Index is invalid');
    }
    else {
        try {
            const appleFound = await Apple.findById(req.params.id);
            res.send(appleFound);
        }
        catch(err) {
            console.log(err);
            res.status(500).send('Errror while retrieving data');
        }
    }
});


// Delete Apple by id
router.delete('/delete/id/:id', async (req, res) => {
    const validationResult = appleValidator.validateInputMongoId(req.params);
    if (validationResult.error) {
        res.status(404).send('Index is invalid');
    }
    else {
        try {
            const appleRemoved = await Apple.remove({_id:  req.params.id});
            const result = {idInput: req.params.id, elemDeleted: appleRemoved.n}
            res.send(result);
            
        }
        catch(err) {
            console.log(err);
            res.status(500).send('Errror while deleting data');
        }
    }
});

// Update an Apple
router.patch('/update/id/:id', async (req, res) => {
    const validationResult = appleValidator.validateInputAppleForUpdate(req.params, req.body);
    if (validationResult.error) {
        console.log(validationResult.error);
        res.status(404).send(validationResult.error.details[0].message);
        return;
    }
    try {
        const resultUpdate = await Apple.updateOne(
            {_id: req.params.id},
            {$set: getUpdatableField(req.body)}
        );
        /*
        if (parseInt( resultUpdate.n) ===1) {
            res.send(appleUpdated)
        }
        */

        res.send(resultUpdate);
    }
    catch(err) {
        console.log(err);
        res.status(500).send('Errror while updating data');
    }
});

function getUpdatableField(reqBody) {
    if (reqBody.name && reqBody.color) {
        return {name: reqBody.name, color: reqBody.color};
    }
    else if (reqBody.name && !reqBody.color) {
        return {name: reqBody.name};
    }
    else if (!reqBody.name && reqBody.color) {
        return {color: reqBody.color};
    }
}

module.exports = router;