import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';
import { useProductsContext } from './products_context';

const initialState = {
  allProducts: [],
  filteredProducts: [],
  gridView: false,
  sort: 'price-lowest',
  filters: {
    text: '',
    category: 'all',
    company: 'all',
    color: 'all',
    price: 0,
    maxPrice: 0,
    minPrice: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  function setGridView() {
    dispatch({ type: SET_GRIDVIEW });
  }
  function setListView() {
    dispatch({ type: SET_LISTVIEW });
  }
  function getProducts() {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }
  function updateSort(e) {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  }
  function clearFilters() {
    dispatch({ type: CLEAR_FILTERS, payload: initialState.filters });
  }
  function updateFilters(e) {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'price') {
      value = Number(value);
    }
    if (name === 'shipping') {
      value = e.target.checked;
    }
    console.log(name, value);

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  }
  useEffect(() => {
    getProducts();
  }, [products]);
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
  }, [products, state.filters]);
  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
