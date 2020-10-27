// This module contains the definitions for the global application state.
// It uses the `easy-peasy` state management library, which is a wrapper around
// Redux. It was chosen because of the much lower amount of boilerplate code needed
// to set up global state, and the fact that there is no need to make state updates
// side-effect free (unlike Redux). See: https://easy-peasy.now.sh/

import { action, actionOn, createStore, persist } from 'easy-peasy';


// The customer model for global application state
const customerModel = {
  // Customer state
  customerId: null,
  deliveryAddrId:null,
  billingAddrId:null,

  // -- CUSTOMER ACTIONS --

  // Set the current customerId
  setCustomerId: action((state, customerId) => {
    state.customerId = customerId;
  }),

  removeCustomerId: action((state) =>{
    state.customerId = null;
  }),

  setDeliveryAddrId: action((state, deliveryAddrId) => {
    state.deliveryAddrId = deliveryAddrId;
  }),

  setBillingAddrId: action((state, billingAddrId) => {
    state.billingAddrId = billingAddrId;
  }),
}


// The cart model for global application state
const cartModel = {
   // Cart state
   products: [],
   totalPrice: 0,  // Total Price (Excluding GST)
   totalGST: 0,

   // Cart state listener. It's responsibility is to recalculate the total price and GST
   // of the cart when the state of the cart changes around the application.
   // Note: `easy-peasy` actionOn has been used instead of `computed` for total price since
   // there is a bug with computed where the computed value is updated one action behind.
   //
   // See: https://easy-peasy.now.sh/docs/api/action-on.html
   //      https://easy-peasy.now.sh/docs/api/computed.html
   onCartChange: actionOn(
     actions => [
       actions.addProduct,
       actions.removeProduct,
       actions.changeQuantity,
       actions.emptyCart,
       actions.readdProduct,
       actions.readdOrder,
     ],
     (state, _) => {
       state.totalPrice = state.products.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
       state.totalGST = state.products.reduce((acc, cur) =>
        cur.keyTaxcodeID == '34333235303332303734313136'
          ? acc + cur.price * 0.1 * cur.quantity
          : acc + 0,
       0);
     }
   ),

   // -- CART ACTIONS --

   // Adds a product to the cart. Note that this action does not check whether
   // a product with the same keyProductID has already been added to the cart
   addProduct: action((state, product) => {
     state.products.push(product);
   }),

   // Removes a product from the cart with the given keyProductID
   removeProduct: action((state, keyProductID) => {
     state.products = state.products.filter((product => product.keyProductID != keyProductID))
   }),

   // Changes the quantity for a product with the given keyProductID
   changeQuantity: action((state, { keyProductID, quantity }) => {
     state.products = state.products.map(product => {
       if (product.keyProductID == keyProductID) {
         product.quantity = quantity;
       }
       return product;
     })
   }),

   // Empties the cart
   emptyCart: action((state) => {
     state.products = []
   }),

   // Adds a product (and its corresponding quantity) from a previous order to the cart.
   // First, checks if the given product exists in the cart, and sets the quantity accordingly
   readdProduct: action((state, product) => {
     const exists = state.products.some((curr) => curr.keyProductID == product.keyProductID);
     if (exists) {
       state.products.map(curr => {
         if (curr.keyProductID == product.keyProductID) {
           curr.quantity += product.quantity;
         }
         return curr;
       })
     } else {
       state.products.push(product);
     }
   }),

   // Adds an entire order from the order history to the cart
   readdOrder: action((state, products) => {
     for (let product of products) {
       const exists = state.products.some((curr) => curr.keyProductID == product.keyProductID);
       if (exists) {
         state.products.map(curr => {
           if (curr.keyProductID == product.keyProductID) {
             curr.quantity += product.quantity;
           }
           return curr;
         })
       } else {
         state.products.push(product);
       }
     }
   })
}


// Create a store for the global application state. This
// state has been configured to persist on page refreshes.
const store = createStore(
  persist({
    customer: customerModel, // Global customer state
    cart: cartModel          // Global cart state
  }, {
    allow: ['customer', 'cart']
  })
);


export default store;
