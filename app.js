'use strict'

let express = require('express');
let handlebars = require('express-handlebars');

/**
*
* App configurations
*/

let app = express();

app.disable('x-powered-by');
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));


/**
*
* Controllers
*/
app.get('/', function(req, res, next){
  res.render('home');
});


/**
*
* Start app
*/
app.listen(app.get('port'), function(){
  console.log('running server on: ' + app.get('port'))
});