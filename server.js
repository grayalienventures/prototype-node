

const _ = require('lodash');

const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const http = require('http');
var https = require('https');
const fs = require("fs")
const dotenv = require('dotenv');
dotenv.config()

const app = require('express')();


const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router;


const port = process.env.PORT

var sessionUsers = [];


const server = http.createServer(app).listen(port);

const io = require('socket.io')(server);


const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment)
{

    const webpackDevServer = require('webpack-dev-server');

    const webpack = require('webpack');
    const webpackConfig = require('./webpack/dev.js');
    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        // noInfo: true,
        publicPath: webpackConfig.output.publicPath,
    }));

    app.use(require('webpack-hot-middleware')(compiler, {
        log: false,
        path: `/__webpack_hmr`,
        heartbeat: 10 * 1000,
    }));
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




// io.set('origins', '*:*');


app.post("/test", (req, res) => {
    res.json("success");
});




/**
 * install route react app 
 */

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
// compress all requests
app.use(compression());
app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res) => res.sendFile(__dirname + '/dist/index.html'));
app.use(favicon(path.join(__dirname, 'src/assets/icons', 'favicon.ico')))

// Switch off the default 'X-Powered-By: Express' header
app.disable('x-powered-by');

io.sockets.on('connection', function (socket) {

    socket.emit("connected", socket.id);

    socket.on('connected', function (args) {

    });

    socket.on('disconnect', function (args) {

    });
});


console.log("listen Port", port)