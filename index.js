const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

async function displayPrice() {
    try {
        const data = await CoinGeckoClient.coins.fetchHistory('bitcoin', {
            date: '25-9-2017'
        });
        // price = data.market_data.current_price
        console.log(data.data.market_data.current_price.usd)
        }
    catch (err) {
        console.log('Error, err.message')
    }
};
displayPrice();

async function displayChart() {
    try {
        const chart = await CoinGeckoClient.coins.fetchMarketChart('bitcoin', {days:'1'});
        price = chart.data.prices
        price.forEach(price => console.log(price[0]))
        }
    //date is in unix timestamp
    catch (err) {
        console.log('Error, err.message')
    }
};
displayChart();

async function convertTimestamptoTime() {
    unixTimestamp = 1569359448729;
    dateObj = new Date(unixTimestamp * 1000); 
    utcString = dateObj.toUTCString();

    time = utcString;
    console.log(time)
  }
convertTimestamptoTime()

async function getUnixTimstamp() {
    timestamp = 'Sat, 08 Jan 51701 12:12:09 GMT'
    Date.prototype.getUnixTime = function() { return this.getTime()/1000 };
    const parsedUnixTime = new Date(timestamp).getUnixTime();
    console.log(parsedUnixTime)
}
getUnixTimstamp()
