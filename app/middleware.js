'use strict';

var middleware = {
  renderHome: function renderHome(req, res) {
    return new Promise(function (resolve, reject) {
      res.render('home');
      resolve();
    });
  },

  logHomeAccess: function logHomeAccess(req, res) {
    return new Promise(function (resolve, reject) {
      console.log('do something like read DB');
      resolve();
    });
  }

};

module.exports = middleware;