const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const Logs = require('./models/logs');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res, next) => {
  try {
    const gameLogs = await Logs.find().exec();
    res.json(gameLogs);
  } catch(err) {
    console.log(err)
  }
});

app.post('/', async (req, res, next) => {
  try {
    const newGameLog = new Logs({
      boardLog: req.body.board,
      playerLog: req.body.player,
      winnerLog: req.body.winner
    });
    const result = await newGameLog.save()
    res.json(result);
  } catch(err) {
    console.log(err);
  }
});

mongoose
  .connect(
    'mongodb+srv://user:tictactoe@cluster0.o8chy.mongodb.net/game-logs?retryWrites=true&w=majority', {
      useNewUrlParser: true
    }
  )
  .then(() =>
    app.listen(3000, () => console.log('Server is listening on PORT 3000'))
  )
  .catch((err) => console.log(err, 'Connection failed!'));
