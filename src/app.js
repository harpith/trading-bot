const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const tradingBot = require('./tradingBot');

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; 

// Serve static files (like favicon)
app.use(express.static(path.join(__dirname, 'public')))

// Start the trading bot
tradingBot.startBot();

// Setup a basic route
app.get('/', (req, res) => {
  res.send('Trading bot is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
