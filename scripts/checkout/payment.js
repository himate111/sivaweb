import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getdeliveryOption } from '../../data/delivery.js';
import { formatcurrency } from '../utlis/money.js';
import { addOrder } from '../../data/orders.js';

export function renderpaymentsummary(){
    let productPriceCents = 0;
    let shippingCents = 0;

    cart.forEach((cartItem) => {
      const product = getProduct(cartItem.productId);
      productPriceCents += product.priceCents * cartItem.quantity;
      
     let deliveryOption =  getdeliveryOption(cartItem.deliveryOptionId);
     shippingCents += deliveryOption.priceCents;

    });

    const totalBeforeTax = productPriceCents + shippingCents;
    const Tax = totalBeforeTax * 0.1; //(10% tax)
    const finalTotal = totalBeforeTax + Tax;
    
    const orderSummaryHTML = `
        <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div>Items (3):</div>
                <div class="payment-summary-money">$${formatcurrency(productPriceCents)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${formatcurrency(shippingCents)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${formatcurrency(totalBeforeTax)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${formatcurrency(Tax)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$${formatcurrency(finalTotal)}</div>
            </div>

            <button class="place-order-button button-primary js-place-order">
                Place your order
            </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = orderSummaryHTML;

    document.querySelector('.js-place-order').addEventListener('click', async () => {
        try{
            const response = await fetch('https://supersimplebackend.dev/orders',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                cart : cart,
            })
            });
                const order =  await response.json();
                addOrder(order);

        }catch(error){
           console.log('Unexpected error. Try again later.');
        }
        window.location.href = 'orders.html';
    });
}