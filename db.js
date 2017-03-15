const firebase = require('firebase');
const config = require('./config');
const firebaseApp = firebase.initializeApp(config.firebase);

module.exports = firebaseApp;
