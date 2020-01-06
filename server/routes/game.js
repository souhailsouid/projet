/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const Game = require('../models/Game');
const GameIA = require('../models/GameIA');

router.get('/', async (req, res) => {
  const allGames = await Game.find({});
  res.json(allGames.map((game) => game.toJSON()));
});

router.get('/gameia', async (req, res) => {
  const allGames = await GameIA.find({});
  res.json(allGames.map((game) => game.toJSON()));
});
router.get('/:id', async (req, res, next) => {
  try {
    const foundOnlineGame = await Game.findById(req.params.id);
    if (foundOnlineGame) {
      res.json(foundOnlineGame.toJSON());
    } else {
      res.status(404).end();
    }
  } catch (e) {
    next(e);
  }
});

router.get('/ia/:id', async (req, res, next) => {
  try {
    const foundOnlineGame = await GameIA.findById(req.params.id);
    if (foundOnlineGame) {
      res.json(foundOnlineGame.toJSON());
    } else {
      res.status(404).end();
    }
  } catch (e) {
    next(e);
  }
});

router.post('/', async (request, response, next) => {
  const game = new Game({ ...request.body });
  try {
    const savedGame = await game.save();
    response.json(savedGame.toJSON());
  } catch (exception) {
    next(exception);
  }
});

router.put('/:id', async (request, response, next) => {
  const { body } = request;

  try {
    const positionToUpdate = await Game.findByIdAndUpdate(request.params.id, body, { new: true });
    response.json(positionToUpdate.toJSON());
  } catch (error) {
    next(error);
  }
});
router.put('/ia/:id', async (request, response, next) => {
  const { body } = request;

  try {
    const positionToUpdate = await GameIA.findByIdAndUpdate(request.params.id, body, { new: true });
    response.json(positionToUpdate.toJSON());
  } catch (error) {
    next(error);
  }
});
module.exports = router;
