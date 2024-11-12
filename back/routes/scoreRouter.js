const scoreController = require('../controllers/scoreController');

const { Router } = require('express');

const scoreRouter = Router();

scoreRouter.post("/", scoreController.createScore);

scoreRouter.get("/:name", scoreController.getScore);

scoreRouter.put("/", scoreController.updateScore);

scoreRouter.delete("/", scoreController.deleteScore);

module.exports = scoreRouter;