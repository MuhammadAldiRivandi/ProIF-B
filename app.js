require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('translation_app');
});

app.post('/translate', async (req, res) => {
  const { source_language, target_language, q } = req.body;

  try {
    const response = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`, {
      q: q, // teks yang mau ditranslate
      source: source_language,
      target: target_language
    });
    // mengirim respon hasil terjemahan
    res.json({ translated_text: response.data.data.translations[0].translatedText }); // data yang dikembalikan dari api ada dua kali ("translatedText": "halo", "detectedSourceLanguage": "id")

  } catch (error) {
    console.error('translating text error:', {
      message: error.message,
      config: error.config
    });
    res.status(500).send('Translation error');
  }
});


app.listen(8081, () => {
  console.log('Server running on port 8081');
});
