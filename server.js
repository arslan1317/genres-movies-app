const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect database

connectDB();

// init middleware

app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API running'));

app.use('/api/genres', require('./routes/api/genres'));
app.use('/api/movies', require('./routes/api/movies'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));

module.exports = app;