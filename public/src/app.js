/* Comppments Pulled */
import linkComponent from './components/linkComponent';
import $ from '../assets/vendor/jquery/dist/jquery.min';

// Bootstrap js is stuck in 2009 so it wants globals
global.jQuery = $

let app = (linkComponent) => {
  const greeting = 'whats up vato!';

  return {
    sayHello: () => { console.log(greeting) }
  }
}