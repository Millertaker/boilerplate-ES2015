'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('./../middlewares/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
*
* User Controller
*/

module.exports = function () {

  this.init = function (app) {
    app.get('/users', function (req, res, next) {
      _users2.default.renderUsersPage(req, res).then(() => {
        console.log('users rendered');
      }).catch(error => {
        console.log('error to access the content');
      });
    });
  };
};