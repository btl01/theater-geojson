const { urlencoded } = require('express');
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const theater = require('./routers/theater');

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));

let count = 0;
app.use((req, res, next) => {
  count++;
  console.log(count);
  next();
});
connectDB();

app.use('/api/theater', theater);

app.all('/', (req, res) => {
  res.send('not found');
});

app.listen(process.env.PORT || 3000);
