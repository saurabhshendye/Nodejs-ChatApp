var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
 }));
 app.use(express.static(__dirname))


var messages = [

]


// app.get('/essages', )
app.get('/messages', (req, res) =>{
    console.log('in get:', messages)
    res.send(messages)
})

app.post('/messages', (req, res)=>{
    console.log('Message Posted: ', req.body)
    messages.push(req.body)
    res.sendStatus(200)
})

var server = app.listen(5001, () => {
    console.log('Server listnening on port:', server.address().port);
})