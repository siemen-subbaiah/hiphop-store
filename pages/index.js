import Link from 'next/link';
import Seo from '../components/utils/Seo';
import Banner from '../components/home/Banner';
import { API_URL } from '../config';
import Products from '../components/home/Products';
import { sortByDate } from '../helpers';

const index = ({ data }) => {
  const products = sortByDate(data);

  return (
    <>
      <Seo title='Home' />
      <Banner />
      <div className='container md:px-20 px-4 mx-auto bg-[#E9EAED]'>
        <div className='bg-blue-200 p-2 md:mt-4 my-4 rounded-lg md:w-1/5 md:mx-auto'>
          <h1 className='text-2xl text-center'>Latest Collections</h1>
        </div>
        <div className='grid md:grid-cols-3 place-items-center my-5'>
          {products.map((product) => (
            <Products item={product} key={product.id} />
          ))}
        </div>
        <div className='flex my-3 justify-center'>
          <Link href='/products'>
            <a className='btn'>View all products</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/products?_limit=6&_sort=created_at:DESC`);
  const data = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 1,
  };
};

export default index;
