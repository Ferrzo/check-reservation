const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');

const webScrapper = require('./scripts/webScrapper');
const timeUtil = require('./scripts/timeUtil');

// const serviceAccount = require('./key/reservation-guard-firebase-adminsdk-6rpag-a610af6c8d.json');


// const app = express();
// app.get('/findSpots', (request, response) => {
//   response.send('Trying to find some free spots for Badminton');
// });
// exports.app = functions.https.onRequest(app);

exports.bigben = functions.https.onRequest((req, res) => {
  const hours = (new Date().getHours() % 12) + 1 // London is UTC + 1hr;
  res.status(200).send(`<!doctype html>
    <head>
      <title>Time</title>
    </head>
    <body>
    XXXXXX
      ${'BONG '.repeat(hours)}
    </body>
  </html>`);
});

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://reservation-guard.firebaseio.com'
// });
// var db = admin.database();
// var ref = db.ref("restricted_access/secret_document");
// ref.once("value", function(snapshot) {
//   console.log(snapshot.val());
// });

// const futureTimestamps = timeUtil.getTimestampOfNextDays(2);
// // TODO: more days ...
// TODO: Bug with last-day empty spot
// webScrapper.getFreeSpots(futureTimestamps[1]).then((result) => {
//   console.log(result);
// })
// .catch((err) => console.log(err));
//
