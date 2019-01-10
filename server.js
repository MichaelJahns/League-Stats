'use strict';

const cors = require(`cors`);
const express = require(`express`);
const superagent = require(`superagent`)

require(`dotenv`).config();

const app = express();
const PORT = 4000;

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cors());

app.set('view engine', 'ejs');
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

app.get('/', pageLoad)

app.post('/results', sendPlayerPackage)

let accountInfo; 

async function sendPlayerPackage(request, response){
  console.log('Initialized')
  let stepOne = await getAccountInfo(request, response);
  console.log('step one complete', stepOne.body)
}

function pageLoad(request, response) {
  response.render('pages/index.ejs')
}

async function getAccountInfo(request, response){
  let url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${request.body.summonerName}?api_key=${process.env.RIOT_API_KEY}`
  console.log(url)

  return superagent.get(url)
    // .then(result => {
    //   console.log('from the API', result.body)
    // })
    // .catch(function(err){
    //   console.log(`Something went wrong in the Account Info API call`)
    // })
  }
