'use strict'

var users = {
  renderUsersPage: function(req, res){
    return new Promise(function(resolve, reject){
      res.render('users');
      resolve();
    });
  }
}

module.exports = users;