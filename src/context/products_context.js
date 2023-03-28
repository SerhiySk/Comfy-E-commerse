import axios from 'axios';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/products_reducer';
import { products_url as url } from '../utils/constants';
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions';

const initialState = {
  isSidebarOpen: false,
  isProductsLoading: false,
  products: [],
  isProductsError: false,
  featuredProducts: [],
  isProductLoading: false,
  product: {},
  isProductError: false,
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function openSidebar() {
    dispatch({ type: SIDEBAR_OPEN });
  }
  function closeSidebar() {
    dispatch({ type: SIDEBAR_CLOSE });
  }
  async function setProducts() {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const { data } = await axios(url, {
        headers: { Accept: 'application/json' },
      });

      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);

      dispatch({ type: GET_PRODUCTS_ERROR, payload: error });
    }
  }
  async function setProduct(url) {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const { data } = await axios(url, {
        headers: { Accept: 'application/json' },
      });

      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  }
  useEffect(() => {
    setProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, setProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
