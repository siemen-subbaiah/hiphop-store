import Link from 'next/link';
import React from 'react';
import ProductTable from '../../components/admin/ProductTable';
import Seo from '../../components/utils/Seo';
import { API_URL } from '../../config';
import { parseCookies, sortByDate } from '../../helpers';
import { MdAdd } from 'react-icons/md';

const ProductListPage = ({ data }) => {
  const products = sortByDate(data);

  return (
    <>
      <Seo title='Product List' />
      <div className='container mx-auto md:px-20 px-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-7'>PRODUCTS</h1>
          <Link href='/admin/product/new'>
            <a className='btn flex items-center gap-2'>
              <MdAdd className='h-5 w-5' />
              <span>CREATE PRODUCT</span>
            </a>
          </Link>
        </div>
        <div className='my-5'>
          <ProductTable products={products} />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const res = await fetch(`${API_URL}/products?_sort=published_at:DESC`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (res.ok) {
    return {
      props: {
        data,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default ProductListPage;
