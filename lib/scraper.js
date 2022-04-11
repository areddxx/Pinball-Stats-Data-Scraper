import axios from 'axios';
import cheerio from 'cheerio';
const fs = require('fs');

async function getHTML(url) {
    const { data: html } = await axios.get(url);
    return html;
}

// Get full league table
async function leagueMain(html) {
    const $ = cheerio.load(html);

    let rows = [];
    $('.league-table tr').each((i, elem) => {
        rows.push({
            name: $(elem).find("td.text-left").text(),
            average: $(elem).find("td:nth-child(2)").text(),
            points: $(elem).find("td:nth-child(3)").text(),
            first: $(elem).find("td:nth-child(4)").text(),
            second: $(elem).find("td:nth-child(5)").text(),
            third: $(elem).find("td:nth-child(6)").text(),
            fourth: $(elem).find("td:nth-child(7)").text(),
            bp: $(elem).find("td:nth-child(8)").text(),
            games: $(elem).find("td:nth-child(9)").text(),
            weeks: $(elem).find("td:nth-child(10)").text(),
            week1: $(elem).find("td:nth-child(11)").text(),
            week2: $(elem).find("td:nth-child(12)").text(),
            week3: $(elem).find("td:nth-child(13)").text(),
            week4: $(elem).find("td:nth-child(14)").text(),
            week5: $(elem).find("td:nth-child(15)").text(),
            week6: $(elem).find("td:nth-child(16)").text(),
            week7: $(elem).find("td:nth-child(17)").text(),
            week8: $(elem).find("td:nth-child(18)").text(),
            week9: $(elem).find("td:nth-child(19)").text(),
            week10: $(elem).find("td:nth-child(20)").text(),
        })
    })
    // console.log(leagueTitle.text());
    return rows.slice(1);
}

// Get all the league night urls
async function leagueNight(html) {
    const $ = cheerio.load(html);

    let nights = [];
    $('.league-table th a').each((i, elem) => {
        nights.push({
            leaguenight: $(elem).attr('href'),
        })
    })
    return nights;
}


// Get game list for a league night
async function gameList(html) {
    const $ = cheerio.load(html);
    let game = [];
    $('.game-score-table tr th').each((i, elem) => {
        game.push({
            game: $(elem).text(),
        })
    })
    return game;
}

// Get game scores for a league night
async function gameScores(html) {
    const $ = cheerio.load(html);
    let game = [];
    $('.game-score-table tr').each((i, elem) => {
        game.push({
            game: $(elem).find("th").text(),
            name: $(elem).find("td:nth-child(1)").text(),
            score: $(elem).find("td:nth-child(2)").text(),
        })
    })
    return game;
}

async function logData(file, formatrequest, request, url) {
    const dataHtml = await formatrequest(request);
    const dataJson = JSON.stringify(dataHtml);
    
    if (url.includes('leagues')) {
        var urlTrim = url.slice(-2);    
    }

    if (url.includes('league_night')) {
        var urlTrim = url.slice(-3);    
    }
    fs.writeFile('./data/' + file + '_' + urlTrim + '.json', dataJson, (err) => {
        if (err) {
            throw err;
        }
        console.table(dataHtml);
        // console.dir(dataJson);
        console.log(`Data file has been saved to ${file}_${urlTrim}.json`);
    });
}

export {getHTML, leagueMain, gameList, gameScores, leagueNight, logData};