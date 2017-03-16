/* Comppments Pulled */
import linkComponent from 'components/linkComponent';

let app = (linkComponent) => {
  let link1 = linkComponent();
  const greeting = 'whats up vato!';

  return {
    sayHellosss: () => { console.log(greeting) }
  }
}