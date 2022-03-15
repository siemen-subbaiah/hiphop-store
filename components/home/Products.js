import Image from 'next/image';
import Link from 'next/link';
import { getRatingAvg } from '../../helpers';
import Rating from './Rating';

const Products = ({ item }) => {
  const rating = getRatingAvg(item);

  return (
    <section className='my-5  hover:scale-105 transition-all'>
      <Link href={`/product/${item.slug}`}>
        <a>
          <Image
            src={item?.image[0]?.url}
            blurDataURL={item?.image[0]?.url}
            placeholder='blur'
            height={300}
            alt={item?.name}
            width={300}
          />
          <div className='bg-white p-3 rounded-md shadow-md'>
            <h1 className='text-xl'>{item?.name}</h1>
            <p className='my-2'>{item?.reviews.length} reviews</p>
            <div className='flex my-2'>
              <Rating rating={rating} />
            </div>
            <p className='text-2xl'>₹{item?.price}</p>
          </div>
        </a>
      </Link>
    </section>
  );
};

export default Products;
