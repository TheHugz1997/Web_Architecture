//Import express
const express = require('express');

//Initialize the app
const app = express();

app.use(express.urlencoded({extended:true}));

const port = 3000

let session = require('express-session');

app.use(express.static('views'));

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true
})
);

/*
* '__dirname' is a special variable in Node.js that represents the absolute path 
* of the directory that contains the currently executing script
*/
app.get('/controllers/totalprice.js', function(req, res) {
    res.set('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/controllers/totalprice.js');
});

app.get('/controllers/annulation.js', function(req, res) {
    res.set('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/controllers/annulation.js');
});


let router = require('./routes');
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
});