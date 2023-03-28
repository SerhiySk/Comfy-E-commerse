import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions';

function getLocalStorage(itemName) {
  const data = localStorage.getItem(itemName);
  console.log(JSON.parse(data));

  if (data) return JSON.parse(data);
  else return [];
}

const initialState = {
  cart: getLocalStorage('cart'),
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 536,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    dispatch({ type: COUNT_CART_TOTALS });
  }, [state.cart]);

  const addToCart = (id, color, amount, product) => {
    console.log(id, color, amount, product);

    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };
  const toggleCartItemAmount = (id, change) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, change } });
  };
  const removeCartItem = id => {
    dispatch({ type: REMOVE_CART_ITEM, payload: { id } });
  };
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        toggleCartItemAmount,
        removeCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
