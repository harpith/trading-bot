const fs = require('fs');
let tradeHistory = [];

function trackProfitLoss(stockPrice, balance, stocksOwned) {
  const totalValue = balance + (stocksOwned * stockPrice);
  const trade = { stockPrice, balance, stocksOwned, totalValue };
  tradeHistory.push(trade);
  console.log(`Current Balance: $${balance.toFixed(2)}, Stocks Owned: ${stocksOwned}, Total Value: $${totalValue.toFixed(2)}`);
}

function generateSummaryReport() {
  const finalBalance = balance + (stocksOwned * stockPrices[stockPrices.length - 1]);
  fs.writeFileSync('tradeSummary.json', JSON.stringify({ trades: tradeHistory, finalBalance }, null, 2));
  console.log("Trade Summary saved to 'tradeSummary.json'");
}

process.on('exit', generateSummaryReport); // When the process exits, save the summary report
