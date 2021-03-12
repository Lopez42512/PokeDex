const express = require('express');
const bodyParser = require("body-parser");
const fetch = require('node-fetch');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', function(req, res) {
    res.sendFile("public/index.html")
})

app.listen(process.env.PORT || 3000, function (req,res) {
    console.log("APP listening on PORT 3000");
})