require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('translation_app');
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
