import {renderOrderSummary,} from './checkout/ordersummary.js';
import { renderpaymentsummary } from './checkout/payment.js';
import {loadProducts, loadProductFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/backend-practice.js';
//import '../data/cart-class.js';


// async function loadpage(){
//   console.log('df');

// await loadProductFetch();
 
//  console.log('asf');
// }

// loadpage();


 Promise.all([
    
  loadProductFetch(),

  new Promise((resolve) => {
     loadCart(() => {
     resolve();

   });
        })

   ]).then(() => {
      renderOrderSummary();
      renderpaymentsummary();
   });
        
       
    

/*new Promise((resolve) =>{
   
    loadProducts(() => {

       resolve();
       });

        }).then(() => {
      
        return new Promise((resolve) => {
            loadCart(() => {
            resolve();
            });
        })
        }).then(() => {
            renderOrderSummary();
            renderpaymentsummary();
        });
        */




/*
loadProducts(() => {
  renderOrderSummary();
  renderpaymentsummary();
});
*/

