let linkComponent = (linkAdress, linkText) => {
  let text = linkText;
  let address = linkAdress;

  return {
    draw: () => { '<a href="{address}">{greeting}</a>' }
  };
}

export default linkComponent;



