const express = require('express');
const cors = require('cors');

const planetRouter = require('./routes/planets/planets.router');

const launchesRouter = require('./routes/launches/launches.router');
const path = require('path');
const morgan = require('morgan');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(morgan('combined'));

app.use('/planets', planetRouter);
app.use('/launches', launchesRouter);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});



module.export = app;