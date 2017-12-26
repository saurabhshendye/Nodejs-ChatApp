var express = require('express')

var app = express()

var server = app.listen(5001, () => {
    console.log('Server listnening on port: ', server.address().port);
})