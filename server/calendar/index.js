const fs = require('fs');
const path = require('path');

const readline = require('readline');
const {google} = require('googleapis');
const {getArrivalAndDeparture} = require("./event-utils");

let oAuth2Client_ = null;

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(__dirname,'./token.json');


/**
 * @param {Object} credentials The authorization client credentials.
 * @param {Function} resolve
 * @param {Function} reject
 * 
 */
function authenticate(credentials, resolve, reject) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback, resolve, reject);
    oAuth2Client.setCredentials(JSON.parse(token));
    oAuth2Client_ = oAuth2Client;
    resolve();
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 * @param {Function} resolve
 * @param {Function} reject
 *
 */
function getAccessToken(oAuth2Client, callback, resolve, reject) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
          console.error('Error retrieving access token', err);
          reject();
      }
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      oAuth2Client_ = oAuth2Client;
      resolve();
    });
  });
}

/**
 * @param {{maxResults: number, auth: google.auth.OAuth2}} settings 
 */
function listEvents({maxResults = 10, auth = oAuth2Client_} = {}) {

    if(auth == null){
        throw new Error("not authentified")
    }

    const calendar = google.calendar({version: 'v3', auth});

    return new Promise((resolve, reject) => {
        calendar.events.list({
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: maxResults,
            singleEvents: true,
            orderBy: 'startTime',
      }, (err, res) => {
          if (err) {
            reject('The API returned an error: ' + err);
          }
          resolve(res.data.items); //events
    });

  })

}


module.exports = new Promise((resolve, reject) => {
    // Load client secrets from a local file.
    fs.readFile(path.join(__dirname,  './credentials.json'), (err, content) => {
        if (err) {
            console.log('Error loading client secret file:', err);
            reject();
        }
        // Authorize a client with credentials, then call the Google Calendar API.
        const parsedContent = JSON.parse(content);
        authenticate(parsedContent, resolve, reject);
    })
}).then(() => {
    return {
      listEvents,
      getArrivalAndDeparture: (roomId = 0) => getArrivalAndDeparture(listEvents, roomId)
    };
})
