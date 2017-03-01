'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
*
* App configurations
*/

let app = (0, _express2.default)();

app.disable('x-powered-by');
app.engine('handlebars', (0, _expressHandlebars2.default)({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(_express2.default.static(__dirname + '/../public'));

/**
*
* Controllers
*/

app.get('/', function (req, res, next) {
  _middleware2.default.logHomeAccess(req, res).then(() => {
    next();
  }).catch(error => {
    console.log('error to access the content');
  });
}, function (req, res, next) {
  _middleware2.default.renderHome(req, res).then(function () {
    console.log('home rendered');
  }).catch(function (error) {
    console.log('error to access the content');
  });
});

/**
*
* Start app
*/
app.listen(app.get('port'), () => {
  console.log('running server on: ' + app.get('port'));
});