var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var httpServer = require('http').Server(app)
var io = require('socket.io')(httpServer)
var mongoose = require('mongoose')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
 }));
 app.use(express.static(__dirname))


var messages = []

app.get('/messages', (req, res) =>{
    console.log('in get:', messages)
    res.send(messages)
})

app.post('/messages', (req, res)=>{
    console.log('Message Posted: ', req.body)
    messages.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on('connection', (socket)=>{
    console.log('User Connected');
})

var server = httpServer.listen(3000, () => {
    console.log('Server listnening on port:', server.address().port);
})