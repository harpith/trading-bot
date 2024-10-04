const { getStockPrice } = require('./data');
const { trackProfitLoss } = require('./profitLossTracker');
const fs = require('fs');

let currentPosition = null;
let balance = 10000; // Initial balance
let stocksOwned = 0;
let tradeHistory = [];
let stockPrices = [];

// Calculate moving average
function calculateMovingAverage(prices, period) {
  if (prices.length < period) return null;
  const sum = prices.slice(-period).reduce((a, b) => a + b, 0);
  return sum / period;
}

// Start the trading bot
async function startBot() {
  const interval = setInterval(async () => {
    try {
      const stockPrice = await getStockPrice();
      stockPrices.push(stockPrice);

      const shortMA = calculateMovingAverage(stockPrices, 5); // Short-term moving average
      const longMA = calculateMovingAverage(stockPrices, 10); // Long-term moving average

      // Trading logic
      if (shortMA && longMA) {
        if (shortMA > longMA && currentPosition !== 'buy') {
          console.log(`Buying stocks at $${stockPrice}`);
          stocksOwned = balance / stockPrice;
          balance = 0;
          currentPosition = 'buy';
          logEvent(`Bought stocks at $${stockPrice}`);
        } else if (shortMA < longMA && currentPosition === 'buy') {
          console.log(`Selling stocks at $${stockPrice}`);
          balance += stocksOwned * stockPrice;
          stocksOwned = 0;
          currentPosition = null;
          logEvent(`Sold stocks at $${stockPrice}`);
        }
      }

      trackProfitLoss(stockPrice, balance, stocksOwned, tradeHistory);

    } catch (error) {
      console.error(`Error fetching stock price: ${error.message}`);
    }
  }, 5000); // Check every 5 seconds

  // Stop the bot after a certain condition, e.g., max trades
  setTimeout(() => {
    clearInterval(interval);  // Stop trading after 1 minute
    console.log("Trading session completed!");
    process.exit();  // Trigger the report generation
  }, 60000); // 60 seconds
}

// Log events to a log file
function logEvent(message) {
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync('tradingBot.log', logMessage);
}

module.exports = { startBot };
