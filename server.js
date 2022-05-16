const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');

//EXPRESS-SESSION AND CONNECT-SESSION-SEQUELIZE (sets up an express.js session and connects the session to our sequelize database)
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: 'Super duper secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3001;

//express-session and sequelize store
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./controllers/'));


// turn on connection to database and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});