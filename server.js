const express = require('express');

const bodyParser = require('body-parser');

const path =require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)))


app.get('/', function (req, res) {
res.render("index");	
});

const port = process.env.PORT || 3000;

const server = app
.listen(port, () => console.log(`Listening on ${ port }`));