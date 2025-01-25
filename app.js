require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT;
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const sessions = require('express-session');
const authRoute = require('./src/routes/auth.route')
const mainRoute = require('./src/routes/main.route')

app.set('view engine', 'ejs');


app.use(sessions({
  secret: 'process.env.SECRET_KEY',
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  reSave: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(express.static(path.join(__dirname, 'src/public')));

app.use('/', authRoute)
app.use('/', mainRoute)

app.listen(port, () => console.log(`Server started port ${port}`));

