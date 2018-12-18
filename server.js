const express = require('express');

const path =require('path');

const app = express();

//user express static middleware to serve static pages
app.use(express.static(path.join(__dirname)))

//serve index.html on "/" route
app.get('/', function (req, res) {
res.render("index");	
});


const port = process.env.PORT || 3000;

const server = app
.listen(port, () => console.log(`Listening on ${ port }`));