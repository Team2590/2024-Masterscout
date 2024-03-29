const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')
/**
 * Credentials are prob changed because db is now hosted on AWS
 */
// const connection = mysql.createConnection({
//   host: 'nemesis2590-database.cxakssa62a0n.us-east-2.rds.amazonaws.com',
//   user: 'Nemesis',
//   password: 'Nemesis2590!',
//   database: 'Nemesis2590'
// });
const connection = mysql.createPool({
  host: 'nemesis2590-database.cxakssa62a0n.us-east-2.rds.amazonaws.com',
  user: 'Nemesis',
  password: 'Nemesis2590!',
  database: 'Nemesis2590'
})
const app = express();
app.use(cors())
// Connect to the database
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// Returns Competition names 
app.get('/api/comp', (req, res) => {
  connection.query('SHOW tables', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Send the data as JSON to the client
    res.json(results);
  });
});

//Returns specific team data 
app.get('/api/:comp/:teamNum', (req, res) => {
  const getComp = req.params.comp;
  const getTeam = req.params.teamNum;
  connection.query('SELECT  * FROM ?? WHERE teamNum = ?;', [getComp, getTeam], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Send the data as JSON to the client
    res.json(results);
  });
});

//Returns all teams in selected comp
app.get('/api/:comp/all/teams', (req, res) => {
  const getComp = req.params.comp;
  connection.query('SELECT DISTINCT teamNum FROM ?? ORDER BY teamNum ASC;', [getComp], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }


    // Send the data as JSON to the client
    res.json(results);
    // console.log(results);
  });
});

//Returns all raw data from comp
app.get('/api/:comp/all/raw', (req, res) => {
  const getComp = req.params.comp;
  connection.query('SELECT * FROM ??;', [getComp], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }


    // Send the data as JSON to the client
    res.json(results);
  });
});

//compare 
app.get('/api/:comp/compare/:team1/:team2/:team3', (req, res) => {
  const getComp = req.params.comp;
  const team1 = req.params.team1;
  const team2 = req.params.team2;
  const team3 = req.params.team3;
  connection.query('SELECT * FROM ?? WHERE teamNum IN (?, ?, ?);', [getComp, team1, team2, team3], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }


    // Send the data as JSON to the client
    res.json(results);
  });
});


// Start the server
const PORT = 3036;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});