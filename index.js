import { gameList, gameScores, getHTML, leagueMain, leagueNight, logData } from "./lib/scraper";


async function fetchData() {

    const leagueMainUrl = 'http://www.pinballstats.com/leagues/58';

    // TODO, fetch the urls currently in the table header on the main url and pass each url though gameScoresRequest
    const leagueNightUrl = 'http://www.pinballstats.com/league_nights/389';

    const leagueMainRequest = await getHTML(leagueMainUrl);
    logData('league', leagueMain, leagueMainRequest, leagueMainUrl);

    const leagueNightRequest = await getHTML(leagueMainUrl);
    logData('nights', leagueNight, leagueNightRequest, leagueMainUrl);

    // const gameListRequest = await getHTML(leagueNightUrl);
    // logData('gamelist', gameList, gameListRequest, leagueNightUrl);

    const gameScoresRequest = await getHTML(leagueNightUrl);
    logData('gamescores', gameScores, gameScoresRequest, leagueNightUrl);

}
 
fetchData();