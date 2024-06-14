const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_db_user',
  password: 'your_db_password',
  database: 'your_database_name'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the database');
});

app.use(express.json());

// API endpoint to handle search requests
app.post('/search', (req, res) => {
  const { searchType, searchTerm } = req.body;

  let query = '';

  switch (searchType) {
    case 'last-name':
      query = `SELECT * FROM users WHERE last_name = '${searchTerm}'`;
      break;
    case 'year-of-birth':
      query = `SELECT * FROM users WHERE year_of_birth = '${searchTerm}'`;
      break;
    case 'mobile-phone':
      query = `SELECT * FROM users WHERE mobile_phone = '${searchTerm}'`;
      break;
    default:
      res.status(400).json({ message: 'Invalid search type' });
      return;
  }

  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
