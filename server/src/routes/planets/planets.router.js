const express = require('express');
const {
    httpGetAllPlanets,
} = require('./planets.controller')

const planetsController = require('./planets.controller')
const planetRouter = express.Router();
planetRouter.get('/', httpGetAllPlanets);

module.exports = planetRouter;