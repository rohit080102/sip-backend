require('dotenv').config();
const cors = require('cors');


const routes = require('./routes/routes');

const express = require('express');
const mongoose = require('mongoose');

const app = express();




app.use(express.json());
app.use(cors());
app.use('/api', routes)


const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})


const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
