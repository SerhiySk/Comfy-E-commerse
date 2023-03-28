import React from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';

const Filters = () => {
  const {
    allProducts: products,
    filters,
    updateFilters,
    clearFilters,
  } = useFilterContext();

  const categories = getUniqueValues(products, 'category');
  const companies = getUniqueValues(products, 'company');
  const colors = getUniqueValues(products, 'colors');
  const {
    text,
    category,
    company,

    color,
    price,
    maxPrice,
    minPrice,
    shipping,
  } = filters;
  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={e => e.preventDefault()}>
          <div className="form-control">
            <input
              type="text"
              name="text"
              className="search-input"
              placeholder="search"
              onChange={updateFilters}
            />
          </div>
          <div className="form-control">
            <h4>category</h4>
            {categories.map((cat, index) => (
              <button
                type="button"
                onClick={updateFilters}
                name="category"
                value={cat}
                key={index}
                className={cat === category ? 'active' : null}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="form-control">
            <h4>company</h4>
            <select
              id="company"
              name="company"
              className="company"
              onChange={updateFilters}
              value={company}
            >
              {companies.map((company, index) => (
                <option
                  key={index}
                  // selected={company === 'all' ? true : false}
                >
                  {company}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <h4>colors</h4>
            <div className="colors">
              {colors.map((col, index) => {
                if (col === 'all')
                  return (
                    <button
                      type="button"
                      value={col}
                      name="color"
                      key={index}
                      className={col === color ? 'active all-btn' : 'all-btn'}
                      onClick={updateFilters}
                    >
                      {col}
                    </button>
                  );
                return (
                  <button
                    type="button"
                    value={col}
                    name="color"
                    key={index}
                    style={{
                      backgroundColor: col,
                    }}
                    className={col === color ? 'active color-btn' : 'color-btn'}
                    onClick={updateFilters}
                  >
                    {col === color && FaCheck()}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="form-control">
            <h4>price</h4>
            <p className="price">{formatPrice(price)}</p>

            <div className="range-slider">
              <input
                type="range"
                className="max-price"
                value={price}
                name="price"
                min={minPrice}
                max={maxPrice}
                onChange={updateFilters}
              />
            </div>
          </div>
          <div className="form-control">
            <div className="shipping">
              <span>free shipping</span>
              <input
                type="checkbox"
                name="shipping"
                id="shipping"
                checked={shipping}
                onChange={updateFilters}
              />
            </div>
          </div>
          <div className="form-control">
            <button className="clear-btn" onClick={clearFilters}>
              clear filters
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }

  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
