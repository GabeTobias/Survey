const express = require('express');
const mongoose = require('mongoose');

const app = express();

const MONGODB_URI = 'mongodb+srv://Gabe01:Secquone01!@testcluster.fj0jf.mongodb.net/Practice?retryWrites=true&w=majority';

const adminRoutes = require('./routes/admin');
const formRoutes = require('./routes/form');
const authRoutes = require('./routes/auth');

app.use(express.urlencoded());

app.use(adminRoutes);
// app.use(formRoutes);
// app.use(authRoutes);

app.set('view engine', 'ejs');

mongoose.connect(MONGODB_URI, { dbName: 'Practice' }).then(
  app.listen(3000, () => {
    console.log("connected!");
  })
);