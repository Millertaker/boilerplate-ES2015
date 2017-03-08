'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _index = require('./controllers/index');

var _index2 = _interopRequireDefault(_index);

var _users = require('./controllers/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
*
* App configurations
*/

let app = (0, _express2.default)();

app.disable('x-powered-by');

app.engine('handlebars', (0, _expressHandlebars2.default)({
  defaultLayout: 'main',
  partialsDir: __dirname + '/../views/partials',
  layoutsDir: __dirname + '/../views/layouts/'
}));

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/../views');

app.set('port', process.env.PORT || 8080);
app.use(_express2.default.static(__dirname + '/../../public'));

/**
*
* Controllers config
*/
new _index2.default().init(app);
new _users2.default().init(app);

/**
*
* Start app
*/
app.listen(app.get('port'), () => {
  console.log('running server on: ' + app.get('port'));
});