const express = require('express'); //riturn function
const app = express();  
const mongoose = require('mongoose');
require('dotenv/config');

//Imprt routes
const applesRoute = require('./routes/apples')

//enable json parsing inside body request. Default is off
app.use(express.json()); 
app.use(express.urlencoded({
    extended: true
}));

//proper way to assign port: if environment variable PORT is assignet it use it. Else it is 3500
const port = process.env.PORT || 3500; 

app.use('/apples', applesRoute);

app.listen(port, () => {
    console.log(`App listening at  http://localhost:${port}`);
});

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    ()=>console.log('Connected to DB')
);


