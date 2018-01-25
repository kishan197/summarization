var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var morgan = require('morgan');

var path = require('path');

app.use(express.static(__dirname+'/client'));

//to create json document
app.use(bodyParser.json());


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use('sum',function(req,res,next){
	var indexFile = path.resolve(__dirname,'client/index.html');
	res.sendFile(indexFile);
})

app.get('sum', function (req, res) {
       res.end( "yobro");
})


app.listen(4040);
console.log('Running on  port 4040 ...');