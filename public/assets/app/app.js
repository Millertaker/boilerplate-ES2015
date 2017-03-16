'use strict';

var _linkComponent = require('components/linkComponent');

var _linkComponent2 = _interopRequireDefault(_linkComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = function app(linkComponent) {
  var link1 = linkComponent();
  var greeting = 'whats up vato!';

  return {
    sayHellosss: function sayHellosss() {
      console.log(greeting);
    }
  };
}; /* Comppments Pulled */