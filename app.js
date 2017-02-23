'use strict'

let express = require('express');
let handlebars = require('express-handlebars');
let middleware = require('./middleware');

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

console.log(middleware);

app.get('/',
  function(req, res, next){
    middleware.logHomeAccess(req, res)
      .then(function() { next() })
      .catch(function(error) { console.log('error to access the content') })
  },
  function(req, res, next){
    middleware.renderHome(req, res)
      .then(function() { console.log('home rendered') })
      .catch(function(error) { console.log('error to access the content') })
  }
);


/**
*
* Start app
*/
app.listen(app.get('port'), function(){
  console.log('running server on: ' + app.get('port'))
});

