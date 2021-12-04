/*  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
O  N  E
/*  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  */
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Classroom API.
  authorize(JSON.parse(content), listCourses);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/*
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
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
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/*
 * Lists the first 10 courses the user has access to.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listCourses(auth) {
  const classroom = google.classroom({version: 'v1', auth});
  classroom.courses.list({
    pageSize: 10,
  }, (err, res) => {
    if (err) return console.error('The API returned an error: ' + err);
    const courses = res.data.courses;
    if (courses && courses.length) {
      console.log('Courses:');
      courses.forEach((course) => {
        console.log(`${course.name} (${course.id})`);
      });
    } else {
      console.log('No courses found.');
    }
  });
}



/*  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
T W O
/*  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  */
const {google} = require('googleapis');
const http = require('http');
const fs = require('fs');

const SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly'];

const myPrints = '{"installed":{"client_id":"draas.apps.googleusercontent.com","project_id":"quickstart-1563","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"Vze5","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}}'


// Authorize a client with credentials, then call the GClassRoom API.
authorize(JSON.parse(myPrints), GClassRoom);


function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

		const myJson = '{"access_token":"Argg3pJkI8V9uP","refresh_token":"jf5Ovmyqs","scope":"https://www.googleapis.com/auth/classroom.courses.readonly","token_type":"Bearer","expiry_date":12}';
 
    oAuth2Client.setCredentials(JSON.parse(myJson));
	callback(oAuth2Client);
}

function GClassRoom(auth) {
const classroom = google.classroom({version: 'v1', auth});
classroom.courses.get({ id: "32801" })

	.then(function(response) {
       const courseapi = response.data;
		
	http.createServer((req, res) => {
         // if (err) { console.error(err); res.end('Server Error'); }
		  	let html = '<h1 style="color:orange">Datos: ' + 
			`${courseapi.name} <br /> y tambi&eacute;n su Id: ${courseapi.id}` + '</h1>';
			html += '<br /><h1>Hellow Team !</h1>';
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(html);
			  
	}).listen(8000, '127.0.0.1');
console.log('Running 5...', response); }); }



/*forEach to WRANGLE the RESPONSE DATA...
function GClassRoom(auth) {
	classroom.courses.get({ id: "32809172901" }, (err, res) => {
    if (err) return console.error('The API returned an error: ' + err);
    const courses = res.data.courses;
    if (courses && courses.length) {
      console.log('Courses:');
      courses.forEach((clase) => {
        console.log(`${clase.name} (${clase.id})`);
      });
    } else {
      console.log('No courses found.');
    }
  });   
}
*/





/*  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
T H R E E
/*  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  */
const {google} = require('googleapis');
const http = require('http');
const fs = require('fs');

// const SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly'];
// const SCOPES = ['https://www.googleapis.com/auth/classroom.announcements.readonly'];
// const SCOPES = ['https://www.googleapis.com/auth/classroom.announcements']; This is NECESSARY?

const myPrints = '{"installed":{"client_id":"aas.apps.googleusercontent.com","project_id":"quickstart-1","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"3y5","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}}'

// Authorize a client with credentials, then call the GClassRoom API.
authorize(JSON.parse(myPrints), GClassRoom);

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

		const myJson = '{"access_token":"kKJP","refresh_token":"YID","scope":"https://www.googleapis.com/auth/classroom.announcements.readonly","token_type":"Bearer","expiry_date":1980}';
 
    oAuth2Client.setCredentials(JSON.parse(myJson));
	callback(oAuth2Client);
}
function orror () { console.log("Datos desde Google Clasroom!"); }

function GClassRoom(auth) {
const classroom = google.classroom({version: 'v1', auth});
classroom.courses.announcements.list({ "courseId": "57" })
// classroom.courses.get({ id: "01" })
// classroom.courses.list({ pageSize: 10, } )
// classroom.courses.announcements.get({ "courseId": "57", "id": "16" })

	.then(function(response) {
	
    const myApi = response.data;
	// Use this when the server send the JSon Example2
	// const myApi = response.data.courses;
	// Use this when the server send the JSon Example1
	
	http.createServer((req, res) => {
          	let html = '<h1 style="color:orange">Mensaje: ' + 
			`${myApi.announcements[1].text} <br /> y tambi&eacute;n su Id: ${myApi.announcements[1].id}` + '</h1>';
			html += '<br /><h1>Miss Cary!</h1>';
			html += 'En el siguiente enlace: ' + '<a href="' + `${myApi.announcements[1].materials[0].driveFile.driveFile.alternateLink}` + '">' + 'Link' + '</a>';
						
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			res.end(html);
	}).listen(8000, '127.0.0.1');
 //console.log("Response", response);
   console.log("Running . . .");
 },
orror ()
); }





/*  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
L  O  C  A  L
/*  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
/*  const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
  if (req.url == '/') {
    fs.readFile('./OneCourse.json', (err, data) => {
      if (err) { console.error(err); res.end('Server Error'); }
	  else {
        const transfer = JSON.parse(data.toString());
            if (err) { console.error(err); res.end('Server Error'); }
		  	let html = '<h1 style="color:orange">Datos: ' + 
			`${transfer.name} <br /> y tambi&eacute;n su Id: ${transfer.id}` + '</h1>';
			html += '<br /><h1>Hi Team  Ok...!</h1>';
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(html);
		}
    });
  }
}).listen(8000, '127.0.0.1');  */


/*  const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
  if (req.url == '/') {
    fs.readFile('./titles.json', (err, data) => {
      if (err) { console.error(err); res.end('Server Error'); }
	  else {
        const transfer = JSON.parse(data.toString());
            if (err) { console.error(err); res.end('Server Error'); }
			let html = '<h1 style="color:orange">Datos: ' + `${transfer.courses[0].name} <br /> y tambi&eacute;n <br /> ${transfer.courses[3].id}` + '</h1';
			html += '<br /><h1>This is the next... </h1>' + `${transfer.courses[6].courseMaterialSets[0].title}` + 'y su Archivo en Drive es el siguiente ID: ' + `${transfer.courses[6].courseMaterialSets[1].materials[0].driveFile.id}`;
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(html);
	}
	});
  }
}).listen(8000, '127.0.0.1');  */



const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
  if (req.url == '/') {
    fs.readFile('./splash.json', (err, data) => {
      if (err) { console.error(err); res.end('Server Error'); }
	  else {
        const myApi = JSON.parse(data.toString());
            if (err) { console.error(err); res.end('Server Error'); }
			
			let html = '<h1 style="color:orange">' + 
			`${myApi.announcements[1].text} <br /> y tambi&eacute;n su Id: ${myApi.announcements[1].id}.</h1>`;
			html += '<br /><h1>Miss Cary!</h1>';
			html += 'En el enlace: <a href="' + `${myApi.announcements[1].materials[0].driveFile.driveFile.alternateLink}` + '" target="_blank">' + 'Link</a>';
	
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(html);
	}
	});
  }
}).listen(8000, '127.0.0.1');
console.log("Running . . .");


/* ________________________   0   ___________________________ */

