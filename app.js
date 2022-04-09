const express = require('express')
const { connectToDb, getDb } = require('./db')


const app = express()

let db

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
    console.log('app listening on port 3000')
    })
    db = getDb()
  }
})

app.get('/films', (req,res) =>{

let films = []

  db.collection('films')
  .find()
  .sort({ director: 1})
  .forEach(film => films.push(film))
  .then(() => {
    res.status(200).json(films)
  })
  .catch(() => {
    res.status(500).json({error: 'Could not fetch the data'})
  })
})
