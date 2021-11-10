const express = require('express');
const mongoose = require('mongoose');
const Cards = require('./model/dbCards.js');
const cors = require('cors');
const dotenv = require('dotenv');


// app config
dotenv.config({ path: '.env' });
const app = express();
const port = process.env.PORT || 8000;

// middlewares 
app.use(express.json());
app.use(cors());


// db config 
const db_url = process.env.db_url;

mongoose.connect(db_url)
    .then((conn) => {
        console.log("connection successfull");
    })
    .catch((error) => {
        console.log(error);
    })


// api endpont 
// get request from home route 
app.get('/', (req, res) => {
    res.status(200).send('hello world');
})

// post request from tinder/cards route 
app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    })

})

// get cards data from database 
app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    })
})

// listners 
app.listen(port, () => {
    console.log("you app is running");
})