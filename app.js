// app.js
const express = require('express');
const app = express();
app.use(express.static('public'));

const usersRouter = require('./routes/usersRouter');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
