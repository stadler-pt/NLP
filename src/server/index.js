// Datastorage
let inputData = []

// Dependencies and server setup
const path = require("path")
const express = require("express")

const app = express()

const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('../../dist'))

const aylien = require('aylien_textapi');
const textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

const PORT = 8080

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

app.get("/", (req, res) => {
    res.sendFile("../../dist/index.html")
})

// Get data from datastorage
app.get("/getData", (req, res) => {
  res.send(inputData)
})

// Send data to datastorage
app.post('/addData', (req, res) => {
  
  const { text } = req.body;
  textapi.sentiment({
    'text': text,
    "mode" : "tweet"
  }, function(error, response) {
    if (error === null) {
      inputData.push(response)
      res.send("Works")
    }
    else {
      console.log(error)
    }
  });
});
