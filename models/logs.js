const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logsSchema = new Schema(
  {
    boardLog: [String],
    playerLog: String,
    winnerLog: String
  }
);

module.exports = mongoose.model('Log', logsSchema);
