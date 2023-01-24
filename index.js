const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();

const MONGODB_URI = 'mongodb+srv://Gabe01:Secquone01!@testcluster.fj0jf.mongodb.net/Practice?retryWrites=true&w=majority';
const store = new MongoDBStore({ uri: MONGODB_URI, collection: 'sessions' });

const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/form');

app.use('/scripts',express.static(path.join(__dirname, 'scripts')));
app.use(
  session({
      resave: false,
      saveUninitialized: false,
      store,
      secret: 'Snarky Puppy'
  })
);

app.use(express.urlencoded());

app.use('/admin', (req, res, next) => {
  if(req.session.user == undefined){
    return res.redirect('/login');
  } 
  next();
},adminRoutes);
app.use(authRoutes);
app.use(formRoutes);

app.set('view engine', 'ejs');

mongoose.connect(MONGODB_URI, { dbName: 'Practice' }).then(
  app.listen(3000, () => {
    console.log("connected!");
  })
);