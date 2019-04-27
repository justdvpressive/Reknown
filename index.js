require('array-utility');
require('dotenv').config();

const Client = require('./structures/client.js');

const BOT_TOKEN = "NTcxNDY4OTI4MTkxMTY4NTEz.XMQ9ng.EBIiQmwx8Ye3ajLwLUvKY7ouDIM";
process.on('unhandledRejection', error => {
  console.error(error);
  return Client.rollbar.error(error);
});

Client.bot.login(BOT_TOKEN);
