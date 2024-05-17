const http = require('http');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const json = require('json');

//get start to connect to localhost and loading pages
const server = http.createServer(
  (req, res) => {

    if(req.url.includes('/sign_in')  && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      console.log("body",body);
      req.on('end', () => {
        const { phoneNumber, password } = JSON.parse(body);

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
          // User is authenticated, you can now generate a session token or perform other actions
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Sign-in successful' }));
        });
      });
    }else if(req.url.includes('/submit_request')  && req.method === 'POST'){
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      console.log("body",body);
      req.on('end', () => {
        const { firstname, lastname, fathername,national_code, birth, phone, representative,date,level } = JSON.parse(body);
        
        connection.query(
          'INSERT INTO applicant (firstname, lastname, fathername, birth, phone, national_code, public_code) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [firstname, lastname, fathername, birth, phone, national_code, 100000], (err, results) => {
            console.log('SQL Query:', 'INSERT INTO applicant (firstname, lastname, fathername, birth, phone, national_code, public_code) VALUES (?, ?, ?, ?, ?, ?, ?)', [firstname, lastname, fathername, birth, phone, national_code, 100000]);
        
            if (err) {
              console.error('Error querying the database: ' + err.stack);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Internal server error' }));
              return;
            }

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'insertaion successful' }));
        });
      });
    }else if(req.url.includes('/search_verification')  && req.method === 'POST'){
      search_national_code();
    }else if(req.url.includes('/')  && req.method === 'POST'){

    }else if(req.url.includes('/')  && req.method === 'POST'){

    }else {    
    //
    let filepath = path.join(__dirname ,  req.url === '/' ? "pages\\index.html": req.url);
    console.log(filepath);
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

function search_national_code(){
  let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      console.log("body",body);
      req.on('end', () => {
        const { national } = JSON.parse(body);
        // Query the database to check if the user exists
        connection.query('SELECT * FROM applicant WHERE national_code = ?', [national], (err, results) => {
          console.log('SQL Query:', 'SELECT * FROM applicant WHERE national_code = ?', [national]);

          if (err) {
            console.error('Error querying the database: ' + err.stack);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
          }
  
          if (results.length === 0) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'national code not exist' }));
            return;
          }
          // User is authenticated, you can now generate a session token or perform other actions
          res.writeHead(200, { 'Content-Type': 'application/json' });
          
          res.end(JSON.stringify({ message: 'Search successful' }));
        });
      });
}
