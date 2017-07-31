const bodyParser = require('body-parser')
const express = require('express')
const mustacheExpress = require('mustache-express')
const fs = require('fs')
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const expressValidator = require('express-validator')

const app = express();

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let attempts;
let counter;
let guessWord = words[Math.floor(Math.random()*words.length)];
let underscores = guessWord.replace(/[a-z]/gi, '_');

app.get('/', (req,res) => {
  attempts = [];
  counter = 0;
  res.render('home')
})

app.post('/attempt', (req, res) => {
  req
  .checkBody("attemptedLetter", "It has to be a valid letter")
  .isAlpha()
  .notEmpty()
})


app.listen(3000, () => {
  console.log('Listening on port 3000')
})

// Create an input field
// Create an array, push the req.body of the input field to that array (attempts)
// Give the Guess button a function
