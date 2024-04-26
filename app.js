const http = require('http');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const json = require('json');

const app = express();
app.use(express.json()); // Middleware to parse JSON data in the request body

// Route to handle the sign-in form submission
app.post('/register', (req, res) => {
  const { phoneNumber, password } = req.body;

  // Query the users table to check the credentials

  // Send a response to the client
  res.json({ message: 'Sign-in successful', user: { phoneNumber, password } });

});


//get start to connect to localhost and loading pages
const server = http.createServer(
  (req, res) => {

req.url
    if (req.url.includes('/sign_in')  && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      console.log("body",body);
      req.on('end', () => {
        const { phoneNumber, password } = JSON.parse(body);
        console.log("hi");

        // Query the database to check if the user exists
        connection.query('SELECT * FROM user WHERE phone_number = ?', [phoneNumber], (err, results) => {

          if (err) {
            console.error('Error querying the database: ' + err.stack);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
          }
  
          if (results.length === 0) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid phone number or password' }));
            return;
          }
  
          const user = results[0];
          console.log("user",results);

          if (user.password !== password) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid phone number or password' }));
            return;
          }
          console.log("bye");

          // User is authenticated, you can now generate a session token or perform other actions
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Sign-in successful' }));
        });
      });
    } else {    
    //
    let filepath = path.join(__dirname ,  req.url === '/' ? "pages\\index.html": req.url);
    //console.log(__dirname);
    let extname = path.extname(filepath);
    let contenttype = 'text/html';
    switch(extname){
      case ".js":
        contenttype = "text/javascripy";
        break;
      case ".css":
        contenttype = "text/css";
        break;
      case ".json":
        contenttype = "application/json";
        break;
   
      case ".png":
          contenttype = "image/png";
          break;

       case ".jpg":
          contenttype = "image/jpg";
          break;
    }      
    if(contenttype === 'text/html' && extname === ''){
      filepath += '.html';
    }
    fs.readFile(filepath, (err , data) => {
      if(err){
        if(err.code == 'ENOENT'){
          fs.readFile(path.join(__dirname , '404.html'),(err , data) => {
            res.writeHead(404 , {'Content-Type' : 'text/html' });
            res.end(data);
          });
        }
      }
      else {
        res.writeHead(200 , {'Content-Type' : contenttype});
        res.end(data);
      }
     });
     //console.log("hiii",filepath);
  }}
  ).listen(3000, () => {  console.log("Server running");});

// Create a connection to the database
const connection = mysql.createConnection({
host: 'localhost',
port: '3306',
user: 'root',
password: 'yazahra',
database: 'fatemyoon',
authPlugins: {
  'mysql_native_password': () => require('mysql/lib/auth/mysql_native_password')
}
});

// connect to database and manage data
connection.connect((err) => {
if (err) {
  console.error('Error connecting to database: ' + err.stack);
  return;
}
console.log('Connected to database as id ' + connection.threadId);
});

// Route for handling form submission
// app.post('/submit-form', (req, res) => {
//   const {
//     firstname,
//     lastname,
//     fathername,
//     nationalCode,
//     birth,
//     phone,
//     representativeName,
//     date,
//     level
//   } = req.body;

//   // Insert the form data into the MySQL database
//   const query = `
//     INSERT INTO applicant (
//       firstname, lastname, fathername, national_code, birth, phone, supporter_id, interview_date, level
//     ) VALUES (?, ?, ?, ?, ?, ?, (SELECT id FROM user WHERE username = ?), ?, ?)
//   `;

//   connection.query(
//     query,
//     [
//       firstname,
//       lastname,
//       fathername,
//       nationalCode,
//       birth,
//       phone,
//       representativeName,
//       date,
//       level
//     ],
//     (err, result) => {
//       if (err) {
//         console.error('Error inserting data:', err);
//         res.status(500).send('Error inserting data');
//       } else {
//         console.log('Data inserted successfully');
//         res.status(200).send('Data inserted successfully');
//       }
//     }
//   );
// });
