const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require('express-session');
require("dotenv").config();

const { LOCAL_MONGODB_URI, MONGODB_URI, PORT, SESSION_SECRET } = process.env;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: SESSION_SECRET, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

//Configure mongoose

mongoose.connect(/* LOCAL_MONGODB_URI || */ MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
const db = mongoose.connection;
db.on('error', error => {
    console.error('Mongoose error', error);
});
db.once('open', async () => {
    console.info("Connected to mongoose");
});
app.get("*", function(req, res){
  res.sendFile(path.join(__dirname + "../client/build/index.html"));
});
app.use(require('./routes'));


// PORT to be taken from .env
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
