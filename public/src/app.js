/* Comppments Pulled */
import linkComponent from './components/linkComponent';

let app = (linkComponent) => {
  const greeting = 'whats up vato!';

  return {
    sayHello: () => { console.log(greeting) }
  }
}