const http = require('http');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const json = require('json');
express.json();


const Education = {
  1: 'ابتدایی',
  2: 'سیکل',
  3: 'دیپلم' ,
  4: 'کارشناسی',
  5: 'کارشناسی ارشد'
}
//get start to connect to localhost and loading pages
const server = http.createServer(
  (req, res) => {
    //console.log('req.url: ',req.url);
    if(req.url == '/home'){
      req.url = 'pages\\home.html';
    }
    // js = sign_in, form = sign_in.html
    if(req.url == '/sign_in'  && req.method === 'POST') {
      const username = "shima";
      const level = "4";
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      //console.log("body",body);
      req.on('end', () => {
        const { phoneNumber, password } = JSON.parse(body);
        // const { phoneNumber, password } = req.body;
        // Query the database to check if the user exists
        connection.query('SELECT * FROM user WHERE phone_number = ?', [phoneNumber], (err, results) => {

          if (err) {
            console.error('Error querying the database: ' + err.stack);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
          }else if (results.length === 0) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid phone number or password' }));
          }else if (results[0].password !== password) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid phone number or password' }));
          }else{
          // User is authenticated
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: results[0] }));
          }
        });
      });

//js = req_form , form = ثبت نام اولیه
    }else if(req.url == '/submit_request'  && req.method === 'POST'){

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

 //js = verification_form , form = فرم شناسایی
    }else if(req.url == '/search_verification' && req.method === 'POST'){
      //search_national_code(national_verification,req,res);
      search_national_verification(req,res);
      
      //js = test_form, form = فرم برگه سنجش
    }else if(req.url == '/search_test' && req.method === 'POST'){
      //search_national_code(national_test,req,res);
      search_national_test(req,res);

      //js = interview_form , form = فرم درخواست مصاحبه     js and html not completed
    }else if(req.url == '/search_interview' && req.method === 'POST'){
      //search_national_code(national_interview,req,res);
      search_national_code(req,res);
//js = search.js, form = search.html
    }else if(req.url == '/search_advanced' && req.method === 'POST'){
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      
      req.on('end', () => {
        const { searchType, searchInput } = JSON.parse(body);
        // Query the database to check if the user exists
      switch (searchType.trim()) {
        case 'public-code':
          connection.query('SELECT * FROM applicant WHERE public_code = ?', [searchInput], (err, results1) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Internal server error' }));

            } else if (results1.length === 0) {
              res.writeHead(300, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'National code does not exist' }));

            } else {
              applicant = results1[0];
              applicant.education_id = Education[results1[0].education_id];
              applicant.partner_education_id = Education[results1[0].partner_education_id];
             // console.log(applicant);
             res.writeHead(201, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 1 , data: applicant }));
            }
          });
        break; 
        default:
            // Handle unsupported search types
            res.writeHead(400, { 
              'Content-Type': 'application/json',
              'X-Error-Reason': 'Unsupported search type'
            });
            res.end(JSON.stringify({ error: 'Unsupported search type' }));
        break;
      }
      });


    }
    else {    
    //
    let filepath = path.join(__dirname ,  req.url === '/' ? "pages\\index.html": req.url);
    console.log("req.url:  ",req.url);
   // console.log("filepath:    ",filepath);
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
            return;
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
1
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

function search_national_verification(req,res){
  let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      console.log("body",body);

      req.on('end', () => {
        const { national } = JSON.parse(body);
        // Query the database to check if the user exists
        connection.query('SELECT call1_date, call1_result, call2_date, call2_result, call3_date, call3_result FROM verification WHERE public_code = ?', [national], (err, results) => {

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
          
          //res.end(JSON.stringify({ message: 'Search successful' }));
          console.log(results);
          res.end(JSON.stringify({ message: 'Search successful', data: results[0] }));

        });
      });}
function search_national_test(req,res){
  let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      console.log("body",body);

      req.on('end', () => {
        const { national_test } = JSON.parse(body);
        // Query the database to check if the user exists
        connection.query('SELECT sickness, addiction, evaluation, description, supporter_id, nationality, married_child, under_coverd FROM applicant WHERE national_code = ?', [national_test], (err, results) => {

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
          res.end(JSON.stringify({ message: results[0] }));

        });
      });}
