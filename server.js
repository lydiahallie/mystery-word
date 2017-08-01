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

let word;
let hiddenWord;

//it has to pick a random word from the file, then replace the
//letters with underscores, then return that
const getWord = () => {
  word = words[Math.floor(Math.random()*words.length)];
  hiddenWord = word.replace(/[a-z]/gi, '_').split('').join(' ');
  return hiddenWord
}

//whenever you load the page, it'll set the counter to 0 and pushes
//the word that it found to the underscores empty array
app.get('/', (req,res) => {
  counter = 0;
  let guessWord = getWord();
  res.render('home', {guessWord});
})

// this isn't working yet, but when you click on the button it should
// check whether the input is valid
app.post('/', (req, res) => {
  let guessedLetter = req.body.attempt.toLowerCase();
  console.log(guessedLetter)
  for (let i = 0; i < word.length; i++) {
    if (word[i] === guessedLetter){
      hiddenWord[i] = guessedLetter
    }else{
      counter++
    }
  }
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
