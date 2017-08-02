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

let counterAttempts;
let attemptedLetters = [];
let message;
let result;
let loseMessage;
//To show how many attempts they have left, the counter of that,
// and the underscores that will appear
const word = words[Math.floor(Math.random()*words.length)];

//Underscores
const hideWord = (word) => word.split('').map(character => '_').join('');
let displayedWord = hideWord(word).split('');
//whenever you load the page, it'll set the counter to 0 and pushes
//the word that it found to the underscores empty array
app.get('/', (req,res) => {
  const displayedWord = hideWord(word);
  counterAttempts = 8;
  res.render('home', { word, displayedWord, counterAttempts});
})

// this isn't working yet, but when you click on the button it should
// check whether the input is valid
app.post('/attempt', (req, res) => {
  const guessedLetter = req.body.letter.toLowerCase();
  for (let i = 0; i < word.length; i++) {
    const displayedLetter = word[i];
    if (displayedLetter === guessedLetter) {
      displayedWord[i] = displayedLetter;
    }
  }

  if (attemptedLetters.includes(guessedLetter)) {
    message = "You have already guessed this letter!"
  }

  if (!word.includes(guessedLetter) && (!attemptedLetters.includes(guessedLetter))) {
    if (counterAttempts === 1){
      loseMessage = "You lose!"
      res.redirect('lose', {loseMessage})
    }else{
      counterAttempts--
    }
  }

  if (!attemptedLetters.includes(guessedLetter)){
    attemptedLetters.push(guessedLetter);
  }

  //It has to show the word when the player doesn't get it right

  //If the player loses or wins, it has to show a "Play again?" button
  res.render('home', { displayedWord: displayedWord.join(''), counterAttempts, attemptedLetters, message, loseMessage});
});


app.listen(3000, () => {
  console.log('Listening on port 3000')
})
