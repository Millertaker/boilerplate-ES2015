import express from 'express';
import index from './../middlewares/index';

/**
*
* Index Controller
*/

module.exports = function(){

  this.init =  function(app){
    app.get('/',
      //log into console
      function(req, res, next){
        index.logHomeAccess(req, res)
          .then(() => { next() })
          .catch( error => { console.log('error to access the content') })
      },
      //render template
      function(req, res, next){
        index.renderHome(req, res)
          .then(function() { console.log('home rendered') })
          .catch(function(error) { console.log('error to access the content') })
      }
    );
  }
};
