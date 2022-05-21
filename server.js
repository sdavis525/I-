const path = require('path');
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

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


//express-session and sequelize store
app.use(session(sess));

//handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);


// turn on connection to database and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});