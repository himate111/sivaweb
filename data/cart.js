export let cart;




loadFromStroage();
updateCartQuantity();

function updateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector('.js-cart-quantity').textContent = cartQuantity;
}

export function loadFromStroage()
{
  cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
 cart = [
  {
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 2,
    deliveryOptionId : '1' 
  },
    {
      productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity : 1,
      deliveryOptionId : '2'
    }
  
];
}
}

function savetoLocal(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCart(productId){
    let matchingItem;

    cart.forEach((Cartitem) => {
      if(productId === Cartitem.productId){
          matchingItem = Cartitem;
      }
    });
    
    if(matchingItem){
      matchingItem.quantity += 1;
    }else{
      cart.push({
      productId : productId,
      quantity : 1,
      deliveryOptionId : '1'
    });
    }
    updateCartQuantity();
    savetoLocal();
}

export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem) => {
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });
    cart = newCart;
   savetoLocal();
}

export function updateDeliveryOptions(productId,deliveryOptionId){
     let matchingItem;

    cart.forEach((Cartitem) => {
      if(productId === Cartitem.productId){
          matchingItem = Cartitem;
      }
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId;
    
    savetoLocal();
    
}


export function loadCart(fun){
const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {

  console.log('Cart load')

fun();

});

xhr.open('GET', 'https://supersimplebackend.dev/cart');
xhr.send();
}


