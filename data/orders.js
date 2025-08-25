export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
  orders.unshift(order);
  saveToStoarge();
}

function saveToStoarge(){
    localStorage.setItem('orders', JSON.stringify(orders));
}