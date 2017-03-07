import express from 'express';
import users from './../middlewares/users';

/**
*
* User Controller
*/

module.exports = function(){

  this.init =  function(app){
    app.get('/users',
    function(req, res, next){
      users.renderUsersPage(req, res)
        .then(() => { console.log('users rendered') })
        .catch( error => { console.log('error to access the content') })
    });
  }
};

