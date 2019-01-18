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

function pageLoad(request, response) {
  console.log('Page Load')
  response.render('pages/index.ejs')
}

async function sendPlayerPackage(request, response){
  console.log('Initialized')
  let champion = await getChampionJSON(request, response)
  console.log(champion.body.data)
  let accountDemo = await getAccountInfo(request, response);
  // console.log('step one complete', stepOne.body)
  let accountMatches = await getMatches(accountDemo, request, response);
  // console.log('step two complete', stepTwo.body)
  var playerPackage = new Summoner(accountDemo.body, accountMatches.body)
  // console.log('step three complete', playerPackage.match)
  response.render('pages/results', {playerPackage})
}

// function champion(input){
// this.champion = 
// }
function Summoner(demograhic, matchHistory){
this.summoner = demograhic.name;
this.profileIconId = 908;
this.summonerLevel = demograhic.summonerLevel;
this.accountId = demograhic.accountId;
this.match = matchHistory.matches;

}
function getChampionJSON(request, response){
  let url = `http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json`
  return superagent.get(url)
}
function getAccountInfo(request, response){
  let url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${request.body.summonerName}?api_key=${process.env.RIOT_API_KEY}`
  return superagent.get(url)
}

function getMatches(accountDemo, request, response){
  let url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountDemo.body.accountId}?api_key=${process.env.RIOT_API_KEY}`
  return superagent.get(url)
}
