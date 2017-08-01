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
const word = words[Math.floor(Math.random()*words.length)];

//Underscores
const hideWord = (word) => word.split('').map(character => '_').join('');


//whenever you load the page, it'll set the counter to 0 and pushes
//the word that it found to the underscores empty array
app.get('/', (req,res) => {
  const displayedWord = hideWord(word);
  counter = 0;
  res.render('home', { word, displayedWord });
})

// this isn't working yet, but when you click on the button it should
// check whether the input is valid
app.post('/attempt', (req, res) => {
  const guessedLetter = req.body.letter.toLowerCase();
  const displayedWord = hideWord(word).split('');
  for (let i = 0; i < word.length; i++) {
    const displayedLetter = word[i];
    if (displayedLetter === guessedLetter) {
      displayedWord[i] = displayedLetter;
    }
  }

  res.render('home', { displayedWord: displayedWord.join('') });
})


app.listen(3000, () => {
  console.log('Listening on port 3000')
})
