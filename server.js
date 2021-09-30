const { urlencoded } = require('express');
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const theater = require('./routers/theater');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

connectDB();

app.use('/api/theater', theater);

app.all('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(process.env.PORT || 8005, () => {
  console.log(`PORT ${process.env.PORT || 8005}`);
});
