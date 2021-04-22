const express = require('express');
const Apple = require('./apple');
const AppleRepository = require('./apple_repository')

const app = express();
const port = 3500;
const appleRepository = new AppleRepository();

app.listen(port, () => {
    console.log(`App listening at  http://localhost:${port}`);
});

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.get('/find/apples', (req, res) =>{
    res.json(appleRepository.appleList);
});

app.post('/add/apple', (req, res)=> {
    let apple = new Apple(null, req.body.name, req.body.color);
    apple = appleRepository.addApple(apple);
    res.send(apple);
});

app.delete('/delete/apple/:id', (req,res) => {
    const id = req.params.id;
    console.log(`ID to delete: ${id}`);
    let deleted = appleRepository.deleteAppleById(id);
    if (deleted) {
        res.send('deleted');
    }
    else {
        res.status(400);
        res.send('Apple not found: nothing to delete');
    }
});
