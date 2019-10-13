const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
const displayInConsole = true;

async function displayPrice(cryptoName, dateToCheck) {
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
	//	const foo = await displayPrice('bitcoin', '25-9-2017');
	//	console.log(foo);
	//})();
}


async function displayChart(cryptoName, daysToDisplay) {
    try {
        const chart = await CoinGeckoClient.coins.fetchMarketChart(cryptoName, {days:daysToDisplay});
        price = chart.data.prices
		return price;
        //price.forEach(price => console.log(price[0]))
        }
    //date is in unix timestamp
    catch (err) {
        console.error(err.message)
    }
};

if (displayInConsole) {
	//(async () => {
	//	const foo = await displayChart('bitcoin', '1');
	//	console.log(foo);
	//})();
}


async function unixTimestampToString(unixTimestamp) {
	originalDate = new Date(unixTimestamp * 1000);
	return originalDate.toUTCString();
};

if (displayInConsole) {
	//(async () => {
	//	const foo = await unixTimestampToString(1569359448729);
	//	console.log(foo)
	//})();
}


function stringToUnixTimestamp(stringTimestamp) {
    Date.prototype.getUnixTime = function() { return this.getTime()/1000 };
	return new Date(stringTimestamp).getUnixTime();
}

if (displayInConsole) {
	//console.log(stringToUnixTimestamp('Sat, 08 Jan 51701 12:12:09 GMT'));
}


function closestTimeStamp(array, num) {
  //https://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
  var i = 0;
  var minDiff = 1000;
  var result;
  for (i in array) {
    var m = Math.abs(num - array[i]);
    if (m < minDiff) {
      minDiff = m;
      result = array[i];
    }
  }
  return result;
}

if (displayInConsole) {
	//const testArray = [3, 4, 7, 9];
	//console.log(closestTimeStamp(testArray), 5); //is this array passed in right?
}
