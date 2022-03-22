import React, { useState } from 'react';
import Products from '../components/home/Products';
import Seo from '../components/utils/Seo';
import { API_URL } from '../config';
import { sortByDate } from '../helpers';

const ProductsPage = ({ data }) => {
  const products = sortByDate(data);

  const brandsList = [...new Set(products.map((product) => product.brand))];
  const [sort, setSort] = useState('');
  const [brand, setBrand] = useState('');
  const [filteredItems, setFilteredItems] = useState(products);

  const handleSorting = (e) => {
    setSort(e);
    const items = filteredItems
      .map((item) => item)
      .sort((a, b) => (e === 'lth' ? a.price - b.price : b.price - a.price));
    setFilteredItems(items);
  };

  const handleBrandSelect = (e) => {
    setBrand(e);
    const filtered = products.filter((product) => product.brand === e);
    setFilteredItems(
      [...filtered].sort((a, b) =>
        sort === 'lth' ? a.price - b.price : b.price - a.price
      )
    );
  };

  return (
    <>
      <Seo title='Products' />
      <div className='container md:px-20 px-4 mx-auto bg-[#E9EAED]'>
        <div className='bg-blue-200 p-2 md:mt-4 my-4 rounded-lg md:w-1/5 md:mx-auto'>
          <h1 className='text-2xl text-center'>All Collections</h1>
        </div>
        <div className='md:grid grid-cols-12'>
          <div className='col-span-2'>
            <h1 className='text-2xl'>Filters</h1>
            <hr />
            <p className='text-xl my-3'>Sort</p>
            <div className='my-2'>
              <input
                type='radio'
                name='price'
                value='lth'
                className='mr-2'
                checked={sort === 'lth'}
                onChange={(e) => handleSorting(e.target.value)}
              />
              <label htmlFor='price' className='text-md'>
                Low to High
              </label>
            </div>
            <div className='my-2'>
              <input
                type='radio'
                name='price'
                value='htl'
                className='mr-2'
                checked={sort === 'htl'}
                onChange={(e) => handleSorting(e.target.value)}
              />
              <label htmlFor='price' className='text-md'>
                High to low
              </label>
            </div>
            <p className='text-xl my-4'>Brand Type</p>
            <select
              name='brand'
              value={brand}
              onChange={(e) => handleBrandSelect(e.target.value)}
            >
              <option value='' disabled>
                Select Brand
              </option>
              {brandsList.map((brand) => {
                return (
                  <option value={brand} key={brand}>
                    {brand}
                  </option>
                );
              })}
            </select>
            <div className='my-5'>
              <button
                className='btn'
                onClick={() => {
                  setBrand('');
                  setSort('');
                  setFilteredItems(products);
                }}
              >
                Reset
              </button>
            </div>
          </div>
          <div className='col-span-10'>
            <div className='grid md:grid-cols-3 place-items-center my-5'>
              {filteredItems.map((product) => (
                <Products item={product} key={product.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/products`);
  const data = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 1,
  };
};

export default ProductsPage;
