import React from 'react';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
  const { filteredProducts: products, gridView } = useFilterContext();

  if (products.length < 1) return <h5>No product matching filters...</h5>;

  if (!gridView) return <ListView products={products} />;

  return <GridView products={products} />;
};

export default ProductList;
