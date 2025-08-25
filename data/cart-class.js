class Cart {
   
cartItems;
#localStorageKey;

constructor(localStorageKey){

   this.#localStorageKey = localStorageKey;
   this.#loadFromStroage();

}

 #loadFromStroage()
     {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

      if(!this.cartItems){
        this.cartItems = [
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
     
     savetoLocal()
    {
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

     updateCart(productId)
    {
        let matchingItem;

        this.cartItems.forEach((Cartitem) => {
        if(productId === Cartitem.productId){
            matchingItem = Cartitem;
        }
        });
        
        if(matchingItem){
        matchingItem.quantity += 1;
        }else{
        this.cartItems.push({
        productId : productId,
        quantity : 1,
        deliveryOptionId : '1'
        });
        }

    this.savetoLocal();
   }
    
    removeFromCart(productId){
        const newCart = [];

        this.cartItems.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
        });
        this.cartItems = newCart;
        this.savetoLocal();
   }
   
   updateDeliveryOptions(productId,deliveryOptionId){
     let matchingItem;

    this.cartItems.forEach((Cartitem) => {
      if(productId === Cartitem.productId){
          matchingItem = Cartitem;
      }
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId;
    
    this.savetoLocal();
    
}  
   
}


const cart = new Cart('cart-oop');
const businessCart = new Cart('bussiness-cart');



console.log(cart);
console.log(businessCart);

