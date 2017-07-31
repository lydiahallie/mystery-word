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

//To show how many attempts they have left, the counter of that,
// and the underscores that will appear
let attempts;
let counter;
let underscores = [];

//it has to pick a random word from the file
const guessWord = words[Math.floor(Math.random()*words.length)];

//get the underscores instead of the actual letters for now
const wordToGuess = guessWord.replace(/[a-z]/gi, '_');

//whenever you load the page, it'll set the counter to 0 and pushes
//the word that it found to the underscores empty array
app.get('/', (req,res) => {
  counter = 0;
  underscores.push(wordToGuess);
  res.render('home');
})

// this isn't working yet, but when you click on the button it should
// check whether the input is valid
app.post('/attempt', (req, res) => {
  req
  .checkBody("attemptedLetter", "It has to be a valid letter")
  .isAlpha()
  .notEmpty()
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
