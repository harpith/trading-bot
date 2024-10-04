function getStockPrice() {
    return new Promise((resolve) => {
      const price = Math.random() * (150 - 100) + 100; // Random price between $100 and $150
      setTimeout(() => {
        resolve(price);
      }, 1000);
    });
  }
  
  module.exports = { getStockPrice };
  