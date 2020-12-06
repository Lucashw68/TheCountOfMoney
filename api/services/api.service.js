const nomics = require('../config/nomics')
const axios = require('axios');
const moment = require('moment');

nomicsApi = axios.create({
    baseURL: 'https://api.nomics.com/v1',
    method: 'get',
    responseType: 'json',
    params: {
        key: "70899bfac7ff094679ae52a8ae32ead9"
    }
});

coinApi = axios.create({
    baseURL: 'https://rest.coinapi.io/v1',
    method: 'get',
    responseType: 'json',
    params: {
        apikey: "AEED49D0-6B07-4B18-8A24-F77BD1B0F0FF"
    }
});

async function getById(code) {
    const req = await axios.all([getCoinInfos(code), getCoinHistory(code)])
        .then(axios.spread((infos, history) => {
            console.log(infos, history)
            return [infos, history];
        }))
        .catch((err) => {
            console.log(err);
            return err;
        });

    return req;
}

async function getAll(code) {
    const req = await axios.all([getCoinInfos(code), getCoinHistory(code)])
        .then(axios.spread((infos, history) => {
            let infoData = infos.data[0];
            let historyData = history.data[0];
            if (infoData && historyData) {
                return {
                    "cmid": infoData.symbol,
                    "name": infoData.name,
                    "currentPrice": parseInt(infoData.price, 10),
                    "openingPrice": historyData.price_open,
                    "lowestDay": historyData.price_low,
                    "highestDay": historyData.price_high,
                    "image": infoData.logo_url
                };
            }
        }))
        .catch((err) => {
            console.log(err);
            return err;
        });

    return req;
}


async function getPrices () {
    req = await nomicsApi('/prices?key=70899bfac7ff094679ae52a8ae32ead9')
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });

    return req;
}

// Get price of a currency by it's code
async function getCryptoInfos (code) {
    let now = moment();
    const startToday = now.startOf('day').format("YYYY-MM-DDTHH:mm:ss")
    req = await coinApi(`/ohlcv/${code}/USD/history`, { 
            params: {
                period_id: "1DAY",
                time_start: startToday,
                apikey: "AEED49D0-6B07-4B18-8A24-F77BD1B0F0FF",
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });

    return req;
}

// Get price of a currency by it's code
async function getPriceByCode (code) {
    req = await nomicsApi('/currencies/ticker', { 
            params: {
                ids: code,
                key: nomics.api_key
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
    return req;
}

// Get prices of multiples currencies by code
async function getHistory (code, periodParam) {
    let now = moment().utc();
    let start_date;
    let period;

    switch (periodParam) {
        case 'daily':
            now = moment().utc();
            start_date = now.startOf('day').subtract(59, "days");
            period = "1DAY";
            break;
        case 'hourly':
            now = moment().utc();
            start_date = now.startOf('hour').subtract(47, "hours");
            period = "1HRS";
            break;
        case 'minute':
            now = moment().utc();
            start_date = now.startOf('minute').subtract(60, "minutes");
            period = "1MIN";
            break;
        default:
            return "Period unrecognized";
    }

    req = await coinApi(`/ohlcv/${code}/USD/history`, { 
            params: {
                period_id: period,
                time_start: start_date.format("YYYY-MM-DDTHH:mm:ss"),
                apikey: "AEED49D0-6B07-4B18-8A24-F77BD1B0F0FF",
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
    return req;
}

// Get prices of multiples currencies by code
async function getPricesByCodes (codes) {
    req = await nomicsApi('/currencies/ticker', { 
            params: {
                ids: codes,
                key: nomics.api_key
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });

    return req;
}

function getCoinInfos(code) {
    return nomicsApi('/currencies/ticker', { 
        params: {
            ids: code,
            key: nomics.api_key
        }
    });
}

function getCoinHistory(code) {
    let now = moment();
    const startToday = now.startOf('day').format("YYYY-MM-DDTHH:mm:ss")
    return coinApi(`/ohlcv/${code}/USD/history`, { 
        params: {
            period_id: "1DAY",
            time_start: startToday,
            apikey: "AEED49D0-6B07-4B18-8A24-F77BD1B0F0FF",
        }
    });
}

module.exports.getPrices = getPrices;
module.exports.getById = getById;
module.exports.getAll = getAll;
module.exports.getPriceByCode = getPriceByCode;
module.exports.getCryptoInfos = getCryptoInfos;
module.exports.getPricesByCodes = getPricesByCodes;
module.exports.getHistory = getHistory;