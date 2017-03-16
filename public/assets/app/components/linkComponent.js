'use strict';

/* Comppments Pulled */

var linkComponent = function linkComponent() {
  var greeting = 'this is a link!';

  return {
    say: function say() {
      console.log(greeting);
    }
  };
};