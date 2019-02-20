function findParticipantId(match, name){
    const participantIDs = Object.values(match.body.participantIdentities)
    const output = participantIDs.forEach((val, index) => {
      if(val.player.summonerName === name){
        console.log(val.participantId)
        return val.participantId
      }
    })
    return output
  }



  <%= matches.forEach((match) => { %>
    <p> Summoner Name: <%= match.gameId %> </p>
    <p> Summoner Level: <%= match.participantId %> </p>
    <p> Encrypted ID: <%= match.champion %></p>
<%= }) %>