const fs = require('fs');

function trackProfitLoss(stockPrice, balance, stocksOwned, tradeHistory) {
  const totalValue = balance + (stocksOwned * stockPrice);
  
  // Log the current trade state
  const trade = {
    stockPrice: stockPrice.toFixed(2),
    balance: balance.toFixed(2),
    stocksOwned: stocksOwned.toFixed(2),
    totalValue: totalValue.toFixed(2),
    time: new Date().toISOString()
  };
  
  tradeHistory.push(trade);  // Store each trade in history

  console.log(`
    Current Stock Price: $${stockPrice.toFixed(2)}
    Current Balance: $${balance.toFixed(2)}
    Stocks Owned: ${stocksOwned.toFixed(2)}
    Total Portfolio Value: $${totalValue.toFixed(2)}
    -------------------------------------------
  `);
}

// Generate the final profit/loss report and save to a JSON file
function generateSummaryReport(tradeHistory) {
  const finalStockPrice = tradeHistory[tradeHistory.length - 1].stockPrice;
  const finalBalance = balance + (stocksOwned * finalStockPrice);

  const report = {
    trades: tradeHistory,
    finalBalance: finalBalance.toFixed(2),
    initialBalance: 10000,  // Assuming initial balance is $10,000
    profitLoss: (finalBalance - 10000).toFixed(2) // Calculate overall profit or loss
  };

  fs.writeFileSync('tradeSummary.json', JSON.stringify(report, null, 2));  // Save report as JSON
  console.log("Trade Summary saved to 'tradeSummary.json'");
}

// Automatically generate the report when the process exits
process.on('exit', () => generateSummaryReport(tradeHistory));

module.exports = { trackProfitLoss };
