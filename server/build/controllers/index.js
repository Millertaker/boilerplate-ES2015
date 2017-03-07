'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('./../middlewares/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
*
* Index Controller
*/

module.exports = function () {

  this.init = function (app) {
    app.get('/',
    //log into console
    function (req, res, next) {
      _index2.default.logHomeAccess(req, res).then(() => {
        next();
      }).catch(error => {
        console.log('error to access the content');
      });
    },
    //render template
    function (req, res, next) {
      _index2.default.renderHome(req, res).then(function () {
        console.log('home rendered');
      }).catch(function (error) {
        console.log('error to access the content');
      });
    });
  };
};