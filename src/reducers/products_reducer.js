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

const products_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN: {
      return {
        ...state,
        isSidebarOpen: true,
      };
    }
    case SIDEBAR_CLOSE: {
      return {
        ...state,
        isSidebarOpen: false,
      };
    }
    case GET_PRODUCTS_BEGIN: {
      return {
        ...state,
        isProductsLoading: true,
      };
    }
    case GET_PRODUCTS_SUCCESS: {
      const featuredProducts = action.payload.filter(
        product => product?.featured
      );

      return {
        ...state,
        isProductsLoading: false,
        products: action.payload,
        featuredProducts,
      };
    }
    case GET_PRODUCTS_ERROR: {
      return {
        ...state,
        isProductsLoading: false,
        isProductsError: true,
      };
    }
    case GET_SINGLE_PRODUCT_BEGIN: {
      return {
        ...state,
        isProductLoading: true,
      };
    }
    case GET_SINGLE_PRODUCT_SUCCESS: {
      return {
        ...state,
        isProductLoading: false,
        product: action.payload,
      };
    }
    case GET_SINGLE_PRODUCT_ERROR: {
      return {
        ...state,
        isProductLoading: false,
        isProductError: true,
      };
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
