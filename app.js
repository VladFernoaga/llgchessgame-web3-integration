const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//impl routes
const play = require('./routes/play');
app.use('/play', play);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

module.exports = app;
