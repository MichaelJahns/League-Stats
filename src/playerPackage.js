// import superagent from "superagent";

async function generateSummonerPackage(summonerName) {
  const summoner = new SummonerPackage(summonerName);
  console.log(summoner);

  const accountDemographics = await getAccountInfo(summoner);
}

function getAccountInfo(summoner) {
  //I NEED TO GET .env working, API keys should NOT be exposed like this
  let url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${
    summoner.name
  }?api_key=${process.env.RIOT_API_KEY}`;
  console.log(url);
  // return superagent.get(url).then(results => {
  //   console.log(
  //     `Step 1 Complete: Built summoner object with Riots Account Info for ${
  //       summoner.name
  //     }`
  //   );
  //   return results;
  // });
}

//   const summoner = new PlayerPackage(accountDemo.body);

//   const championJSON = await summoner.getChampionJSON(summoner);
//   const matchHistory = await summoner.getMatchHistory(summoner);

//   const parseHistory = await summoner.getMatchInfo(summoner, matchHistory);

//   //const interpretMatches = await summoner.intepretMatchesArray(summoner)
//   const finalize = resultsPageRender(summoner, response);
// function sendPlayerPackage(summoner, response) {
//   console.log("Results Page Loading..");
//   response.render("pages/results.ejs", { summoner });
// }

// //Packages all data to send to the pages/results
function SummonerPackage(summonerName) {
  this.name = summonerName;
}

// function Match(gameId, participantId, victory, champion) {
//   (this.gameId = gameId),
//     (this.participantId = participantId),
//     (this.victory = victory),
//     (this.champion = champion);
// }

// //Step Two: gets updated champion JSON, needs recursive function to parse the information within for display on page
// PlayerPackage.prototype.getChampionJSON = function(summoner) {
//   let url = `http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json`;
//   return superagent.get(url).then(results => {
//     this.championJSON = results.body;
//     console.log(
//       `Step 2 Complete: Retrieving Patch ${
//         summoner.championJSON.version
//       } Champion Information from ddragon`
//     );
//   });
// };

// //Step Three: Sends encrypted ID to return a list of the last 100 matches played by that summoner
// PlayerPackage.prototype.getMatchHistory = function(summoner) {
//   let url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${
//     this.accountID
//   }?api_key=${process.env.RIOT_API_KEY}`;
//   return superagent.get(url).then(response => {
//     const matchHistory = response.body.matches;
//     console.log(
//       `Step 3 Complete: Recieved ${summoner.name}'s last 100 matches from Riot`
//     );
//     return matchHistory;
//   });
// };

// //Step Four: Block to run all 100 matches through a fourth API that will return 100 sets of game stats
// PlayerPackage.prototype.getMatchInfo = function(summoner, matchHistory) {
//   //DELETE THIS LINE, truncates matchHistory for ease of debugging
//   let deleteMe = matchHistory.slice(0, 20);
//   asyncForEach(
//     deleteMe,
//     "Step 4 Complete: Finished Parsing Match History",
//     async (value, index) => {
//       //Throttles API calls to prevent hitting the API call limit
//       if (index !== 0 && index % 10 === 0) {
//         await sleep(5000, index, deleteMe.length);
//       }
//       let url = `https://na1.api.riotgames.com/lol/match/v4/matches/${
//         value.gameId
//       }?api_key=${process.env.RIOT_API_KEY}`;
//       return superagent.get(url).then(results => {
//         const participantId = findParticipantId(results, this.name);
//         const victory = findVictory(results, participantId);
//         const championName = findChampion(
//           results,
//           participantId,
//           this.championJSON
//         );
//         this.matches.push(
//           new Match(value.gameId, participantId, victory, championName)
//         );
//       });
//     }
//   );
// };

// //Suss' out users Particpant Id in that match for use in step four
// function findParticipantId(match, name) {
//   let output;
//   Object.values(match.body.participantIdentities).forEach(val => {
//     if (val.player.summonerName === name) {
//       output = val.participantId;
//       return;
//     }
//   });
//   return output;
// }

// //Suss out users champion in that match for use in step four
// function findChampion(match, id, championJSON) {
//   let output;
//   Object.values(championJSON.data).forEach(val => {
//     if (val.key == match.body.participants[id - 1].championId) {
//       output = val.name;
//       return;
//     }
//   });
//   return output;
// }

// //Suss out users victory in that match for use in step four
// function findVictory(match, id) {
//   return match.body.participants[id - 1].stats.win;
// }

// //Helper Fxns
// //===========
// function sleep(ms, current, total) {
//   console.log(`Hold on, ${(current / total) * 100}% done..`);
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function asyncForEach(array, terminus, callback) {
//   for (let index = 0; index < array.length; index++) {
//     await callback(array[index], index, array);
//   }
//   console.log(terminus);
// }

export { generateSummonerPackage };
