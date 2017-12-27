var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var httpServer = require('http').Server(app)
var io = require('socket.io')(httpServer)
var mongoose = require('mongoose')
var fs = require("fs"),
    json;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
 }));
 app.use(express.static(__dirname))



// config.json is in application root
json = readJsonFileSync('config.json')
var urlDB = getDBUrl()

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding)
    return JSON.parse(file)
}


function getDBUrl() {
    return 'mongodb://' + json.user + ':' + json.password + '@ds131237.mlab.com:31237/chatdata'
}

var Message = mongoose.model('Message',{
    name : String,
    message : String
})

// var messages = []

app.get('/messages', (req, res) =>{
    // console.log('in get:', messages)
    Message.find({}, (err, messages)=>{
      res.send(messages)  
    })
})

app.post('/messages', (req, res)=>{
    console.log('Message Posted: ', req.body)
    var message = new Message(req.body)

    message.save((err)=>{
        if (err){
            res.sendStatus(500)
        }

        io.emit('message', req.body)
        res.sendStatus(200)

    })

    
})

io.on('connection', (socket)=>{
    console.log('User Connected');
})

mongoose.connect(urlDB, {useMongoClient: true}, (err)=>{
    console.log('MongoDB Connection: ', err)    
})

var server = httpServer.listen(5001, () => {
    console.log('Server listnening on port:', server.address().port);
})