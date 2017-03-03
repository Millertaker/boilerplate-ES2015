'use strict';

var users = {
  renderUsersPage: function renderUsersPage(req, res) {
    return new Promise(function (resolve, reject) {
      res.render('users');
      resolve();
    });
  }
};

module.exports = users;