'use strict'

var middleware = {
  renderHome: function(req, res){
    return new Promise(function(resolve, reject){
      res.render('home');
      resolve();
    });
  },

  logHomeAccess: function(req, res){
    return new Promise(function(resolve, reject){
      console.log('do something like read DB');
      resolve();
    });
  }

}

module.exports = middleware;