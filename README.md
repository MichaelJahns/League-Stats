[The title of your Project] isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games
or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are
trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.

# League-Stats
Teaching myself Statistics and probability with League of Legends Sats

1-21-19
May have hit a terminal deadend. 

The general flow of the project was supposed to look like this
==============================================================

User inputs the Summoner Name they want stats for into form field

Send that summoner name to Riot SummonerV4 /lol/summoner/v4/summoners/by-name/{summonerName} route, return account      info, notably the account and summoner ID, for use in future calls.

Send account ID to Riot MatchV4 /lol/match/v4/matchlists/by-account/{encryptedAccountId} route, return a package        that includes the match ID's for that summoners last 100 games. 

For every Match ID in package
    Send a Match ID to Riot MatchV4 /lol/match/v4/matches/{matchId} route, return a package with that specific matches stats
    Parse that package for the information about the summoner in question
    Package that matches information with an Object constructor called Match,
    Push that object into an array inside the playerPackage object,

Preform some basic math to get winrates, play rates, etc...

Send playerPackage to results.ejs to render on page
==============================================================

Unfortunately, the riot API allows for 20 API requests a second or 100 every two minutes. 
For the above infrastructure I am attempting to make 102.

A possible solution is only going through 90 or so of the matches, so that a total of 92 API requests are needed. However I do not believe that will circumnavigate the issue at hand, because when the script gets to sending the match IDs, its still going to be sending 90ish requests nearly all at once. When I am limited to 20 per second.

1-22-19
A database is a one potential solution, if i cant send 102 requests at a time, I can at least save 20 request to a db, and not request those same match IDs again. I will attempt to integrate mlab as off machine db