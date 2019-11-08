const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
const displayInConsole = true; //debug mode! Uncomment the relevant lines to test stuff with hard-coded values

async function getPriceExactDate(cryptoName, dateToCheck) {
  try {
    var data = await CoinGeckoClient.coins.fetchHistory(cryptoName, { date: dateToCheck });
    return data.data.market_data.current_price.usd;
  }
  catch (err) {
    console.error(err.message)
  }
};

if (displayInConsole) {
  //(async () => {
  //  const foo = await getPriceExactDate('bitcoin', '25-9-2017');
  //  console.log(foo);
  //})();
}


async function getTimestampPriceChart(cryptoName, daysToDisplay) {
  try {
    const chart = await CoinGeckoClient.coins.fetchMarketChart(cryptoName, {days:daysToDisplay});
    return chart.data.prices;
  }
  catch (err) {
    console.error(err.message)
  }
}

if (displayInConsole) {
  //(async () => {
  //  const foo = await getTimestampPriceChart('bitcoin', '1');
  //  console.log(foo);
  //})();
}

async function getTimestamps(cryptoName, daysToDisplay) { //RETURN TIMESTAMPS ONLY
  try {
    var chartData = await getTimestampPriceChart(cryptoName, daysToDisplay);

    var result = new Array;
    for (var i = chartData.length - 1; i >= 0; i--) {
      result.push(chartData[i][0])
    }
    return result;
  }
  catch (err) {
    console.error(err.message)
  }
}

async function getPrices(cryptoName, daysToDisplay) { //RETURN PRICES ONLY
  try {
    var chartData = await getTimestampPriceChart(cryptoName, daysToDisplay);

    var result = new Array;
    for (var i = chartData.length - 1; i >= 0; i--) {
      result.push(chartData[i][1])
    }
    return result;
  }
  catch (err) {
    console.error(err.message)
  }
}

if (displayInConsole) {
  // var name = 'bitcoin';
  // var days = 1;

  // (async () => {
  //  const foo = await getTimestamps(name, days);
  //  const bar = await getPrices(name, days);
  //  console.log(foo);
  //  console.log(bar);
  // })();
}


async function unixTimestampToString(unixTimestamp) {
  originalDate = new Date(unixTimestamp * 1000);
  return originalDate.toUTCString();
};

if (displayInConsole) {
  //(async () => {
  //  const foo = await unixTimestampToString(1569359448729);
  //  console.log(foo)
  //})();
}


function stringToUnixTimestamp(stringTimestamp) {
  // Date.prototype.getUnixTime = function() { return this.getTime() / 1000 };
  // return new Date(stringTimestamp).getUnixTime();
  var result = new Date(stringTimestamp).getTime() / 1000;
  return result;
}

if (displayInConsole) {
  // console.log(stringToUnixTimestamp('Sat, 08 Jan 2017 12:12:09 GMT'));
  // console.log(stringToUnixTimestamp('03-04-2017'))
}


function closestTimeStamp(array, targetNum) {
  //https://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
  console.log("Is it an array going into closestTimeStamp? " + Array.isArray(array));
  // targetNum = 16;
  console.log("Array passed in is: " + array)
  console.log("Num passed in is: " + targetNum)
  var i = 0;
  var minDiff = 1000;
  var result;
  for (i in array) {
    var temp = Number(array[i]);
    var m = Math.abs(targetNum - temp);
    if (m < minDiff) {
      minDiff = m;
      result = array[i];
    }
  }
  return result;

}

if (displayInConsole) {
  // var testArray = [3, 4, 7, 9, 10, 11, 15, 20];
  // console.log(closestTimeStamp(testArray, 5)); //should print 5
}


async function getPriceApproximateDate(cryptoName, dateToCheck) {
  //get array of dates for that one
  //find closest date to dateToCheck
  //get price of that cryptoasset on that date
  const dayCount = 1;

  var unixTimeStamps = getTimestamps(cryptoName, dayCount);
  var prices = getPrices(cryptoName, dayCount);

  var closest = closestTimeStamp(unixTimeStamps, stringToUnixTimestamp(dateToCheck)); //Do I need to reference stringToUnixTimestamp here?

  // return closest;
  //return getPriceExactDate(closest);
}

if (displayInConsole) {
  (async () => {
    const foo = await getPriceApproximateDate('bitcoin', '03-04-2017');
    const bar = await getPriceApproximateDate('bitcoin', 1488603600);
    console.log(foo);
    console.log(bar);
  })();
}
