'use strict'

import express from 'express';
import handlebars from 'express-handlebars';
import middleware from './middleware';

/**
*
* App configurations
*/

let app = express();

app.disable('x-powered-by');
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/../public'));


/**
*
* Controllers
*/

app.get('/',
  function(req, res, next){
    middleware.logHomeAccess(req, res)
      .then(() => { next() })
      .catch( error => { console.log('error to access the content') })
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
app.listen(app.get('port'), () => {
  console.log('running server on: ' + app.get('port'));
});

