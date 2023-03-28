import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, color, amount, product } = action.payload;

      const tempItem = state.cart.find(item => item.id === id + color);

      if (tempItem) {
        const tempItems = state.cart.map(item => {
          if (item === tempItem) {
            if (product.stock < item.amount + amount) {
              return { ...item, amount: product.stock };
            }
            return { ...item, amount: item.amount + amount };
          }
          return { ...item };
        });
        return { ...state, cart: tempItems };
      }
      if (!tempItem) {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          stock: product.stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }
    }
    /* falls through */
    case COUNT_CART_TOTALS: {
      if (state.cart.length < 1)
        return { ...state, totalAmount: 0, totalItems: 0 };
      const amounts = state.cart.map(item => {
        const itemPrice = item.price;
        const itemAmount = item.amount;
        return itemPrice * itemAmount;
      });
      const items = state.cart.map(item => {
        const itemAmount = item.amount;
        return itemAmount;
      });

      const totalAmount = amounts.reduce((a, b) => a + b);

      const totalItems = items.reduce((a, b) => a + b);

      console.log(state.cart);

      return { ...state, totalAmount, totalItems };
    }
    /* falls through */
    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, change } = action.payload;
      const cartTemp = state.cart.map(item => {
        if (
          item.id === id &&
          item.amount + change <= item.stock &&
          item.amount + change > 0
        )
          return { ...item, amount: item.amount + change };
        return item;
      });
      return { ...state, cart: cartTemp };
    }
    /* falls through */
    case REMOVE_CART_ITEM: {
      const id = action.payload.id;
      const tempCart = state.cart.filter(item => item.id !== id);
      return { ...state, cart: tempCart };
    }
    /* falls through */
    case CLEAR_CART: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
