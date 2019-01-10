'use strict';

const cors = require(`cors`);
const express = require(`express`);
const superagent = require(`superagent`)

require(`dotenv`).config();

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cors());

app.set('view engine', 'ejs');
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

app.get('/', pageLoad)

app.post('/results', sendPlayerPackage)

async function sendPlayerPackage(request, response){
  console.log('Step 1 initiated')
  console.log(getAccountInfo(request, response));

  // console.log('Step 2 intitiated')
  // const query = new playerPackage(accountInfo)

  // response.render('/results', {playerPackage: query})
}

function playerPackage(accountInfo){
  this.summonerName = accountInfo.name
  this.summmonerLVL = accountInfo.summonerLevel
}

function pageLoad(request, response) {
  response.render('pages/index.ejs')
}

function getAccountInfo(request, response){
  
  let url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${request.body.summonerName}?api_key=${process.env.RIOT_API_KEY}`
  

  superagent.get(url)
    .then(result => accountInfo = result.body.summonerName)
    .catch(function(err){
      console.log(`Something went wrong in the Account Info API call`)
    })
};
