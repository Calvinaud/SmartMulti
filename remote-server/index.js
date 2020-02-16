const express = require('express')
const bodyParser = require('body-parser')
const {publish} = require('./mqtt');
const PORT = 80;
/*
var admin = require("firebase-admin");

var serviceAccount = require("./ambiance-box-8d3a2-firebase-adminsdk-lchvn-6d229972f8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ambiance-box-8d3a2.firebaseio.com"
});*/

const app = express()
app.use(bodyParser.json({ type: 'application/*+json' }))

app.use(express.static('public'))

app.post('/login', (req, res) => {
    res.redirect('/login.html')
})

app.post('/toggle', async (req, res) => {
    const r = publish('toggle');
    if(typeof r == 'string'){
        res.sendStatus(200);
    } else {
        res.sendStatus(500).json(r.message)
    }
})

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})
