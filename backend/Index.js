const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
require('dotenv').config()

const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

const app = express()
app.use(cors())

// Returns Competition names 
app.get('/api/comp', (req, res) => {
  connection.query('SHOW tables', (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).json({ error: 'Internal Server Error' })
    }

    // Send the data as JSON to the client
    res.json(results)
  })
})

//Returns specific team data 
app.get('/api/:comp/:teamNum', (req, res) => {
  const getComp = req.params.comp
  const getTeam = req.params.teamNum
  connection.query('SELECT  * FROM ?? WHERE teamNum = ?;', [getComp, getTeam], (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).json({ error: 'Internal Server Error' })
    }

    // Send the data as JSON to the client
    res.json(results)
  })
})

//Returns all teams in selected comp
app.get('/api/:comp/all/teams', (req, res) => {
  const getComp = req.params.comp
  connection.query('SELECT DISTINCT teamNum FROM ?? ORDER BY teamNum ASC;', [getComp], (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).json({ error: 'Internal Server Error' })
    }


    // Send the data as JSON to the client
    res.json(results)
    // console.log(results);
  })
})

//Returns all raw data from comp
app.get('/api/:comp/all/raw', (req, res) => {
  const getComp = req.params.comp
  connection.query('SELECT * FROM ??;', [getComp], (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).json({ error: 'Internal Server Error' })
    }


    // Send the data as JSON to the client
    res.json(results)
  })
})

//compare 
app.get('/api/:comp/compare/:team1/:team2/:team3', (req, res) => {
  const getComp = req.params.comp
  const team1 = req.params.team1
  const team2 = req.params.team2
  const team3 = req.params.team3
  connection.query('SELECT * FROM ?? WHERE teamNum IN (?, ?, ?);', [getComp, team1, team2, team3], (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).json({ error: 'Internal Server Error' })
    }


    // Send the data as JSON to the client
    res.json(results)
  })
})


// Start the server
const PORT = 3036
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})