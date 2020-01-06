
/* eslint-disable no-undef */
/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');

const GameIASchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  savePositions: {
    type: Array,

  },
  saveScorePlayer1: {
    type: String,

  },
  saveScoreIA: {
    type: String,

  },
  saveWinners: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = GameIA = mongoose.model('gameIA', GameIASchema);
