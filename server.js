'use strict';

const cors = require(`cors`);
const express = require(`express`);
const superagent = require(`superagent`)

require(`dotenv`).config();

const app = express();
const PORT = 3000;
app.use(cors());

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
app.get('/', pageLoad)

function pageLoad(request, response) {
  let url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_IOD_API_KEY}`

  superagent.get(url)
    .then(result => response.render('pages/', {heroImage: result.body.url}));
}
