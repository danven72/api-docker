const Joi = require('joi');
const express = require('express'); //ritorna function
const Apple = require('./apple');
const AppleRepository = require('./apple_repository')

const app = express();  
app.use(express.json()); //abilita il parsing JSON nel body della request: di default non è abilitato
app.use(express.urlencoded({
    extended: true
}));

//proper way to assign port: if environment variable PORT is assignet it use it. Else it is 3500
const port = process.env.PORT || 3500; 
const appleRepository = new AppleRepository();

app.listen(port, () => {
    console.log(`App listening at  http://localhost:${port}`);
});

app.get('/find/apple/filter', (req, res) =>{
    const name = req.query.name;
    const color = req.query.color;
    console.log('name: '+name + ' color: ' + color);
    apple = null;//appleRepository.findAppleById(id);
    if (apple !== null) {
        res.json(apple);
    }
    else {
        res.status(404).send('Apple not found');
    }
});

app.get('/find/apple/id/:id', (req, res) =>{
    const id = req.params.id;
    apple = appleRepository.findAppleById(id);

    if (!apple) res.status(404).send('Apple not found');

    res.json(apple);
});

app.get('/find/apples', (req, res) =>{
    res.json(appleRepository.appleList);
});

app.post('/add/apple', (req, res)=> {
    const name = req.body.name;
    const color = req.body.color;
   
    const validationResult = validateInputAppleForAdd(req.body);
    //console.log(validateInputAppleForAdd(req.body));
    if (validationResult.error) {
        res.status(400).send(validationResult.error.details[0].message);
    }
    else {
        let apple = new Apple(null, name, color);
        apple = appleRepository.addApple(apple);
        res.send(apple);
    }
});

app.put('/update/apple', (req, res) => {
    //console.log('from body: ' + JSON.stringify(req.body));
    const id = req.body.id
    const name = req.body.name;
    const color = req.body.color;
    const validationResult = validateInputAppleForUpdate(req.body);
    if (validationResult.error ) {
        res.status(400).send(validationResult.error.details[0].message);
        return;
    }     
    let apple = new Apple(id, name, color);
    //console.log('apple built: ' + JSON.stringify(apple));
    let appleUpdated = appleRepository.updateApple(apple);
    if (appleUpdated) {
        res.send(appleUpdated);
    }
    else {
        res.status(404).send('Apple not found: nothing to update');
    }
});

app.delete('/delete/apple/id/:id', (req,res) => {
    const id = req.params.id;
    console.log(`ID to delete: ${id}`);
    const validationResult = validateInputParamsForDelete(req.params);
    if (validationResult.error ) {
        res.status(400).send(validationResult.error.details[0].message);
        return;
    }     

    let deleted = appleRepository.deleteAppleById(id);
    if (deleted) {
        res.send('deleted');
    }
    else {
        res.status(404).send('Apple not found: nothing to delete');
    }
});

/* Validation done using Joi library */
function validateInputAppleForAdd(apple) {
    const schema = Joi.object({ 
        name: Joi.string() .min(2) .required(),
        color: Joi.string() .min(2) .required() 
    });        
    return schema.validate(apple);
}

function validateInputAppleForUpdate(apple) {
    const schema = Joi.object({ 
        id: Joi.number().min(1).required(),
        name: Joi.string() .min(2) ,
        color: Joi.string() .min(2) 
    }).min(2);  // at least 2 values required in input (id always required and min ine field to Update)       
    return schema.validate(apple);
}

function validateInputParamsForDelete(params) {
    const schema = Joi.object({ 
        id: Joi.number().min(1).required()
    });
    return schema.validate(params);
}