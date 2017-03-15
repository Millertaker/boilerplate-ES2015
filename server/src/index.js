import express from 'express';
import handlebars from 'express-handlebars';

import index from './controllers/index';
import users from './controllers/users';


/**
*
* App configurations
*/

let app = express();

app.disable('x-powered-by');

app.engine('handlebars', handlebars({
  defaultLayout: 'main',
  partialsDir: __dirname + '/../views/partials',
  layoutsDir: __dirname + '/../views/layouts/',
}));

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/../views');


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/../../public'));


/**
*
* Controllers config
*/
new index().init(app);
new users().init(app);

/**
*
* Start app
*/
app.listen(app.get('port'), () => {
  console.log('running server on: ' + app.get('port'));
});

