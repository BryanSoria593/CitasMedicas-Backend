const express = require('express');
require('dotenv').config();
const morgan = require("morgan");
const cors = require('cors');

const app = express();

app.set("port", 4200);

app.use(morgan('dev'));
app.use(cors());

//Lectura y parseo del body
app.use(express.json());


// ROUTES
// AUTH
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


module.exports = {
    app
}
