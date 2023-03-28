import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      // const maxPrice = Math.max(action.payload.map(product => product.price));
      const prices = action.payload.map(product => product.price);
      const maxPrice = Math.max(...prices);

      const minPrice = Math.min(...prices);

      return {
        ...state,
        allProducts: [...action.payload],
        filteredProducts: [...action.payload],
        filters: { ...state.filters, maxPrice, minPrice, price: maxPrice },
      };
    }
    case SET_LISTVIEW: {
      return {
        ...state,
        gridView: false,
      };
    }
    case SET_GRIDVIEW: {
      return {
        ...state,
        gridView: true,
      };
    }
    case UPDATE_SORT: {
      console.log(state.sort);

      return {
        ...state,
        sort: action.payload,
      };
    }
    case SORT_PRODUCTS: {
      const { sort, filteredProducts } = state;
      let tempProducts = [];

      if (sort === 'price-lowest') {
        function compareNumbers(a, b) {
          return a.price - b.price;
        }
        tempProducts = filteredProducts.sort(compareNumbers);
      }
      if (sort === 'price-highest') {
        function compareNumbers(a, b) {
          return b.price - a.price;
        }
        tempProducts = filteredProducts.sort(compareNumbers);
      }
      if (sort === 'name-a') {
        function compareNumbers(a, b) {
          // if (a.name < b.name) {
          //   return -1;
          // }
          // if (a.name > b.name) {
          //   return 1;
          // }
          // return 0;
          return a.name.localeCompare(b.name);
        }
        tempProducts = filteredProducts.sort(compareNumbers);
      }
      if (sort === 'name-z') {
        function compareNumbers(a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }
        tempProducts = filteredProducts.sort(compareNumbers);
        tempProducts = tempProducts.reverse();
      }

      return {
        ...state,
        filteredProducts: tempProducts,
      };
    }
    case FILTER_PRODUCTS: {
      let tempProducts = state.allProducts;
      const {
        text,
        category,
        company,
        color,
        price,

        shipping,
      } = state.filters;

      if (text) {
        tempProducts = tempProducts.filter(product =>
          product.name.startsWith(text)
        );
      }
      if (category !== 'all') {
        tempProducts = tempProducts.filter(
          product => product.category === category
        );
      }
      if (company !== 'all') {
        tempProducts = tempProducts.filter(
          product => product.company === company
        );
      }
      if (color !== 'all') {
        console.log(color);

        tempProducts = tempProducts.filter(product => {
          const colors = product.colors.filter(col => col === color);
          return colors.length > 0;
        });
      }
      if (price) {
        tempProducts = tempProducts.filter(product => product.price <= price);
      }
      if (shipping) {
        tempProducts = tempProducts.filter(product => product.shipping);
      }

      console.log(tempProducts);

      return { ...state, filteredProducts: tempProducts };
    }
    case UPDATE_FILTERS: {
      const { name, value } = action.payload;

      return { ...state, filters: { ...state.filters, [name]: value } };
    }
    case CLEAR_FILTERS: {
      const prices = state.allProducts.map(product => product.price);
      console.log(state);

      const maxPrice = Math.max(...prices);

      const minPrice = Math.min(...prices);
      return {
        ...state,
        filters: { ...action.payload, maxPrice, minPrice, price: maxPrice },
      };
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
