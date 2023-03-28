export const formatPrice = number => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'UAN',
  }).format(number / 100);
};

export const getUniqueValues = (objects, type) => {
  let unique = objects.map(object => object[type]);
  if (type === 'colors') unique = unique.flat(Infinity);
  return ['all', ...new Set(unique)];
};
