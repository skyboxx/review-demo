const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = 8080;
const {db, Cat, Owner} = require('../db')

app.use(morgan('dev'));

app.get('/', (req, res, next) => {
    res.send('<h1>Welcome to the main route!</h1>')
})

app.get('/cats', async (req, res, next) => {
    try {
        //eager loading example: 
        const cats = await Cattttt.findAll({include: Owner}); //throw an error
        res.send(cats);
    } catch (err) { 
        next(err);
    }
})

app.get('/owners', async (req, res, next) => {
    try {
        const owners = await Owner.findAll()
        res.send(owners);
    } catch (err) {
        next(err);
    }
})

//errors I should handle: 
//400 level errors - 404
//500 level error - 500/502

app.use((req, res) => {
    res.status(404).send('404 Not Found :(((((( ')
})

//custom error handler for 500 level errors
app.use((err, req, res, next) => {
    console.error(err.stack); //output the stack trace
    res.status(500).send('500 error sad :( ')
})

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))