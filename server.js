'use strict';

const pg = require('pg');
const cors = require(`cors`);
const express = require(`express`);
const superagent = require(`superagent`)

require(`dotenv`).config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cors());

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

app.set('view engine', 'ejs');

app.get('/', pageLoad)

app.post('/results', sendPlayerPackage)

function pageLoad(request, response) {
  console.log('Page Load')
  response.render('pages/index.ejs')
}

async function sendPlayerPackage(request, response){
  console.log(`Step 1 Initialized: Petitioning Riot for Account Info for ${request.body.summonerName}`)
  let accountDemo = await getAccountInfo(request, response);
  console.log(`Step 1 Complete: Recieved Account Info for ${request.body.summonerName}`)

  console.log(`Step 2 Initialized: Gathering ${request.body.summonerName}'s Last 100 Matches`)
  let accountMatches = await getMatches(accountDemo, request, response);
  console.log(`Step 2 Complete: Recieved Match History for ${request.body.summonerName}`)

  console.log(`Step 3 Initialized: Interpreting ${request.body.summonerName}'s Matches`)

  await getMatchInfo(accountMatches, request.body.summonerName)
  var playerPackage = new PlayerPackage(accountDemo.body, accountMatches.body)
  // console.log('Step 3 Complete', playerPackage.match)
  response.render('pages/results', {playerPackage})
}

//Packages all data to send to the pages/results
function PlayerPackage(demograhic, matchHistory){
this.summoner = demograhic.name;
this.profileIconId = 908;
this.summonerLevel = demograhic.summonerLevel;
this.summonerID = demograhic.id;
this.accountID = demograhic.accountId;
this.match = matchHistory.matches;
}

// function Match(){
//   this.victory = 
//   this.champion = 
//   this.lane = 
// }

//gets updated champion JSON, needs recursive function to parse the information within for display on page
// function getChampionJSON(request, response){
//   let url = `http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json`
//   return superagent.get(url)
// }
//Sends user inputted Summoner Name to return their encrypted ID for use in next API
function getAccountInfo(request, response){
  let url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${request.body.summonerName}?api_key=${process.env.RIOT_API_KEY}`
  console.log(url)
  return superagent.get(url)
}
//Sends encrypted ID to return a list of the last 100 matches played by that summoner
function getMatches(accountDemo, request, response){
  let url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountDemo.body.accountId}?api_key=${process.env.RIOT_API_KEY}`
  return superagent.get(url)
}
//Block to run all 100 matches through a fourth API that will return 100 sets of game stats
function getMatchInfo(matchHistory, name){
  asyncForEach(matchHistory, async (val, index) => {
    //Throttles API calls to prevent hitting the API call limit
    if( index !== 0 && index % 10 === 0){await sleep(1000)}
    console.log(val);
  })

}


function findParticipantId(matches, name){
  matches.body.participantIdentities.forEach((val) => {
    if(val.player.summonerName === name){
      console.log(`The particpantID of the summoner is ${name}`)
    }
  })
}



//Helper Fxns
function sleep(ms){
  console.log('Giving Riot a chance to keep up..')
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}