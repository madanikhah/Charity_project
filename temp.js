switch (searchType.trim()) {
        case 'public-code':
          connection.query('SELECT * FROM applicant WHERE public_code = ?', [searchInput], (err, results) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Internal server error' }));
            } else if (results.length === 0) {
              res.writeHead(401, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'National code does not exist' }));
            } else {
        
              // Assuming you want to perform a second query based on the first query's result
              educationId = results[0].education_id; // Example: using the applicant's ID for the second query
              console.log("............."+educationId+"...............")
              connection.query('SELECT * FROM education WHERE id = ?', [educationId], (err2, secondResults) => {
                if (err2) {
                  console.error('Error querying the second database: ' + err2.stack);
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'Internal server error' }));
                } else {
                  console.log('Second Query Result:', secondResults[0]);
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ message: results[0], education: secondResults[0].level_name }));
                }
              });
            }
          });
          break; 
