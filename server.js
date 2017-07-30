const bodyParser = require('body-parser')
const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const fs = require('fs')
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

let underscores = [];
let count = 8;

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req,res) => {
  res.render('home')
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
