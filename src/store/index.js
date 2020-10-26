import { action, actionOn, createStore } from 'easy-peasy';

// Create a store for the global application state
const store = createStore({
  // Global customer state
  customer: {
    customerId: null,

    // -- CUSTOMER ACTIONS --

    // Set the current customerId
    setCustomerId: action((state, customerId) => {
      state.customerId = customerId;
    }),

    removeCustomerId: action((state) =>{
      state.customerId = null;
    }),
  },

  // Global cart state
  cart: {
    // Cart state
    products: [],
    totalPrice: 0,

    // Cart state listener. It's responsibility is to recalculate the total price
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
})


export default store;