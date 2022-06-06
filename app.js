const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const es6Renderer = require('express-es6-template-engine')


const SequelizeStore = require('connect-session-sequelize')(session.Store)
const models = require('./models')
const store = new SequelizeStore({ db: models.sequelize })

//routes
const indexRouter = require('./routes/index');

const dashboardRouter = require('./routes/dashboard')

const usersRouter = require('./routes/users');

const donorRouter = require('./routes/donor')

const donorSelect = require('./routes/donor-select')

const donationRouter = require('./routes/donation')
//for authorization 
const checkAuth = require('./middleware/checkAuth');


const app = express();


app.engine('html', es6Renderer)
app.set('views', 'templates')
app.set('view engine', 'html')

const partials = {
  head: 'partials/head',
  foot: 'partials/foot'
}


app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
      secret: 'secret', // used to sign the cookie
      resave: false, // update session even w/ no changes
      saveUninitialized: true, // always create a session
      cookie: {
        secure: false, // true: only accept https req's
        maxAge: 2_592_000_000, // time in milliseconds
        // 2,592,000,000 ms = 30 days
      },
      store: store
    })
  );
  store.sync()
app.use(express.static(path.join(__dirname, 'public')));
//line 52 down is the routes

app.use('/', indexRouter);
app.use('/users',usersRouter);
app.use('/donor', checkAuth, donorRouter)
app.use('/dashboard', checkAuth, dashboardRouter)
app.use('/donor_select', checkAuth, donorSelect)
app.use('/donor/:id/donation', donationRouter)
module.exports = app;
