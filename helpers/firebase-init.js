const firebase = require('firebase');
const { firebase_config } = require('../vars.json');

const fb = firebase.initializeApp(firebase_config);
module.exports = fb;