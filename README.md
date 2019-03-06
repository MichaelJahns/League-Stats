This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
[The title of your Project] isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.

League-Stats
Teaching myself Statistics and probability with League of Legends Sats

1-21-19 May have hit a terminal deadend.

The general flow of the project was supposed to look like this
User inputs the Summoner Name they want stats for into form field

Send that summoner name to Riot SummonerV4 /lol/summoner/v4/summoners/by-name/{summonerName} route, return account info, notably the account and summoner ID, for use in future calls.

Send account ID to Riot MatchV4 /lol/match/v4/matchlists/by-account/{encryptedAccountId} route, return a package that includes the match ID's for that summoners last 100 games.

For every Match ID in package Send a Match ID to Riot MatchV4 /lol/match/v4/matches/{matchId} route, return a package with that specific matches stats Parse that package for the information about the summoner in question Package that matches information with an Object constructor called Match, Push that object into an array inside the playerPackage object,

Preform some basic math to get winrates, play rates, etc...

Send playerPackage to results.ejs to render on page
Unfortunately, the riot API allows for 20 API requests a second or 100 every two minutes. For the above infrastructure I am attempting to make 102.

A possible solution is only going through 90 or so of the matches, so that a total of 92 API requests are needed. However I do not believe that will circumnavigate the issue at hand, because when the script gets to sending the match IDs, its still going to be sending 90ish requests nearly all at once. When I am limited to 20 per second.

1-22-19 A database is a one potential solution, if i cant send 102 requests at a time, I can at least save 20 request to a db, and not request those same match IDs again. I will attempt to integrate mlab as off machine db

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
