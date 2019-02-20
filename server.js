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

app.get('/', searchPageRender)

app.post('/loading', loadingPageRender, generatePlayerPackage)

app.post('/results', sendPlayerPackage)

//========================================================================================================
//Functions ==============================================================================================

//===================
//Main Page Functions
function searchPageRender(request, response) {
  console.log('Search Page Loading..')
  response.render('pages/index.ejs')
}
function loadingPageRender(summoner, response){
  console.log('Loading Page Loading..')
  response.render('pages/loading.ejs')
}
function resultsPageRender(summoner, respose){
  console.log('Results Page Loading..')
  response.render('pages/results.ejs', {summoner})
}
//======================
//Loading Page Functions
async function generatePlayerPackage(request, response){
  renderLoadingPage
  //want to combine these two lines
  const accountDemo = await getAccountInfo(request, response);
  const summoner = new PlayerPackage(accountDemo.body)

  const championJSON = await summoner.getChampionJSON(summoner)
  const matchHistory = await summoner.getMatchHistory(summoner);
  
  const parseHistory = await summoner.getMatchInfo(summoner, matchHistory)

  //const interpretMatches = await summoner.intepretMatchesArray(summoner)
  const finalize = resultsPageRender(summoner, response)
}
function sendPlayerPackage(summoner, response){
  console.log('Results Page Loading..')
  response.render('pages/results.ejs', {summoner})
}

//Packages all data to send to the pages/results
function PlayerPackage(demograhic){
this.name = demograhic.name;
this.profileIconId = 908;
this.summonerLevel = demograhic.summonerLevel;
this.summonerID = demograhic.id;
this.accountID = demograhic.accountId;
this.matches = [];
}

function Match(gameId, participantId, victory, champion){
  this.gameId = gameId,
  this.participantId = participantId,
  this.victory = victory,
  this.champion = champion
}

//Step One: RIOT SummonerV4 call, returns account demographic information
function getAccountInfo(request, response){
  let url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${request.body.summonerName}?api_key=${process.env.RIOT_API_KEY}`
    return superagent.get(url)
    .then(results => {
      console.log(`Step 1 Complete: Built summoner object with Riots Account Info for ${request.body.summonerName}`)
      return results
    })
}
//Step Two: gets updated champion JSON, needs recursive function to parse the information within for display on page
PlayerPackage.prototype.getChampionJSON = function(summoner){
  let url = `http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json`
    return superagent.get(url)
     .then(results => {
       this.championJSON = results.body
       console.log(`Step 2 Complete: Retrieving Patch ${summoner.championJSON.version} Champion Information from ddragon`)
      })
}

//Step Three: Sends encrypted ID to return a list of the last 100 matches played by that summoner
PlayerPackage.prototype.getMatchHistory = function(summoner){
  let url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${this.accountID}?api_key=${process.env.RIOT_API_KEY}`
    return superagent.get(url)
    .then(response =>{
      const matchHistory = response.body.matches
      console.log(`Step 3 Complete: Recieved ${summoner.name}'s last 100 matches from Riot`)
      return matchHistory
    })
}

//Step Four: Block to run all 100 matches through a fourth API that will return 100 sets of game stats
PlayerPackage.prototype.getMatchInfo = function(summoner, matchHistory){
    //DELETE THIS LINE, truncates matchHistory for ease of debugging
    let deleteMe = matchHistory.slice(0,20)
    asyncForEach(deleteMe, 'Step 4 Complete: Finished Parsing Match History', async (value, index) => {
    //Throttles API calls to prevent hitting the API call limit
    if(index !== 0 && index % 10 === 0){await sleep(5000, index, deleteMe.length)}
    let url = `https://na1.api.riotgames.com/lol/match/v4/matches/${value.gameId}?api_key=${process.env.RIOT_API_KEY}`
    return superagent.get(url)
    .then(results => {
      const participantId = findParticipantId(results, this.name)
      const victory = findVictory(results, participantId)
      const championName = findChampion(results, participantId, this.championJSON)
      this.matches.push(new Match(value.gameId, participantId, victory, championName))
    })
  })
}

//Suss' out users Particpant Id in that match for use in step four
function findParticipantId(match, name){
  let output
  Object.values(match.body.participantIdentities).forEach((val) => {
    if(val.player.summonerName === name){
      output = val.participantId
      return
    }
  })
  return output
}

//Suss out users champion in that match for use in step four
function findChampion(match, id, championJSON){
  let output
  Object.values(championJSON.data).forEach((val) => {
    if(val.key == match.body.participants[id-1].championId){
      output = val.name
      return
    }
  })
  return output
}

//Suss out users victory in that match for use in step four
function findVictory(match, id){
  return match.body.participants[id-1].stats.win
}

//Helper Fxns
//===========
function sleep(ms, current, total){
  console.log(`Hold on, ${(current/total) * 100}% done..`)
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncForEach(array, terminus, callback){
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
  console.log(terminus)
}
