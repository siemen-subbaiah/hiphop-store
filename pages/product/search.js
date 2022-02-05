import { useRouter } from 'next/router';
import Link from 'next/link';
import Seo from '../../components/utils/Seo';
import Products from '../../components/home/Products';
import { API_URL } from '../../config';

const SearchPage = ({ searchTerm }) => {
  const {
    query: { term },
  } = useRouter();

  console.log(searchTerm);

  return (
    <>
      <Seo title='Search' />
      <div className='container mx-auto md:px-20 px-4 my-10'>
        <Link href='/'>
          <a className='btn'>Go Back</a>
        </Link>
        <h1 className='text-2xl my-5'>Search Results for {term}</h1>
        {searchTerm?.length === 0 && (
          <h3 className='text-xl'>No products to show!</h3>
        )}
        <div className='md:flex gap-10'>
          {searchTerm?.map((item) => (
            <Products item={item} key={item.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(`${API_URL}/products?_q=${context.query.term}`);
  const data = await res.json();

  return {
    props: {
      searchTerm: data,
    },
  };
};

export default SearchPage;
