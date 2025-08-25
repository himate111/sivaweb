import {cart, removeFromCart, updateDeliveryOptions} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import { formatcurrency } from '../utlis/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getdeliveryOption } from '../../data/delivery.js';
import { renderpaymentsummary } from './payment.js';


export function renderOrderSummary(){

let cartsummaryHTML = '';
cart.forEach((cartItem) => {

    const productId = cartItem.productId;
    const matchingproduct = getProduct(productId);

    
   const deliveryOptionId = cartItem.deliveryOptionId;

   const deliveryOption = getdeliveryOption(deliveryOptionId);

// fallback if not found
      if (!deliveryOption) {
        deliveryOption = deliveryOptions[0];
      }

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const deliveryString = deliveryDate.format('dddd, MMMM D');


    
    cartsummaryHTML +=  `
  <div class="cart-item-container js-cart-item-delete-${matchingproduct.id}">
    <div class="delivery-date">
      Delivery date: ${deliveryString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingproduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingproduct.name}
        </div>
        <div class="product-price">
          ${matchingproduct.getPrice()}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-product"
          data-product-id = "${matchingproduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        
        ${deliveryOptionHtml(matchingproduct,cartItem)}
      </div>
    </div>
  </div>
`;

});

function deliveryOptionHtml(matchingproduct, cartItem) {
  let html = '';

  deliveryOptions.forEach((deliveryoption) => {
    if (!deliveryoption || deliveryoption.deliveryDays === undefined) {
      return; // skip invalid delivery option
    }

    const today = dayjs();
    const deliveryDate = today.add(deliveryoption.deliveryDays, 'days');
    const deliveryString = deliveryDate.format('dddd, MMMM D');

    const priceString =
      deliveryoption.priceCents === 0
        ? 'FREE'
        : `$${formatcurrency(deliveryoption.priceCents)}`;

    const isChecked = deliveryoption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingproduct.id}"
        data-delivery-option-id="${deliveryoption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingproduct.id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryString}
          </div>
          <div class="delivery-option-price">
            ${priceString}
          </div>
        </div>
      </div>
    `;
  });

  return html;
}


document.querySelector('.js-summary').innerHTML = cartsummaryHTML;

document.querySelectorAll('.js-delete-product')
.forEach((link) => {
     link.addEventListener('click' , () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);


        const container = document.querySelector(`.js-cart-item-delete-${productId}`);
        container.remove();
         renderpaymentsummary();
     });

}); 

document.querySelectorAll('.js-delivery-option').forEach((element) =>{
 element.addEventListener('click' , ()=>{
  const { productId, deliveryOptionId } = element.dataset;
  updateDeliveryOptions(productId,deliveryOptionId);
  renderOrderSummary();
  renderpaymentsummary();
 });  
});
}