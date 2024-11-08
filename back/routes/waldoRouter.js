const waldoController = require('../controllers/waldoController');

const { Router } = require('express');

const waldoRouter = Router();

// Get waldo location by id
waldoRouter.get("/:id", waldoController.getWaldo);

// Add waldo location
waldoRouter.post("/:id/:x/:y", waldoController.addWaldo);

module.exports = waldoRouter;