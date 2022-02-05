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
        <h1 className='text-2xl mt-3 text-center'>Latest Collections</h1>
        <div className='grid md:grid-cols-3 place-items-center my-5'>
          {products.map((product) => (
            <Products item={product} key={product.id} />
          ))}
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

export default index;
