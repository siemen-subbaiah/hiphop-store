import Image from 'next/image';
import { useState } from 'react';
import Rating from '../../components/home/Rating';
import Reviews from '../../components/home/Reviews';
import Seo from '../../components/utils/Seo';
import { API_URL } from '../../config';
import { getRatingAvg } from '../../helpers';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../src/features/cart/cartReducer';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ProductDetailsPage = ({ info }) => {
  const rating = getRatingAvg(info);

  const { user } = useSelector((state) => state.auth);

  const [index, setIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('S');

  const router = useRouter();

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: info?.id,
        productName: info?.name,
        image: info?.image[0]?.url,
        price: info?.price,
        qty,
        size,
      })
    );
    router.push('/cart');
  };

  return (
    <>
      <Seo title={info?.name} description={info?.description} />
      <div className='container md:px-20 px-4 mx-auto my-5'>
        <div className='my-7'>
          <Link href='/'>
            <a className='btn'>Go Back</a>
          </Link>
        </div>
        <div className='md:flex items-center justify-center'>
          <div>
            <Image
              src={info?.image[index]?.url}
              blurDataURL={info?.image[index]?.url}
              height={500}
              width={500}
              placeholder='blur'
              alt={info?.name}
            />
            <hr />
            <div className='flex gap-2 my-2 mb-10 md:mb-0 items-center'>
              {info?.image?.map((img, i) => {
                return (
                  <div
                    key={i}
                    className={`cursor-pointer ${
                      index === i && 'border border-black'
                    }`}
                  >
                    <Image
                      src={img?.url}
                      blurDataURL={img?.url}
                      height={100}
                      width={100}
                      placeholder='blur'
                      onClick={() => setIndex(i)}
                      alt='product'
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className='md:ml-10'>
            <h1 className='text-3xl'>{info?.name}</h1>
            <div className='flex my-3'>
              <Rating rating={rating} />
              <p className='ml-3'>{info?.reviews.length} customer reviews</p>
            </div>

            <p className='text-2xl my-1'>₹{info?.price}</p>

            <p className='my-2 md:w-3/4'>{info?.description}</p>

            <ul className='my-3'>
              <li className='my-2'>
                Status : {info?.isAvailable ? 'In Stock' : 'Out of Stock'}
              </li>
              <li className='my-2'>Brand : {info?.brand}</li>
            </ul>
            <div className='my-5 flex gap-2 items-center'>
              <p>Size :</p>
              <div className='flex gap-3 items-center'>
                <div
                  className={`border-2 ${
                    size === 'S' && 'border-black'
                  } py-1 px-3 cursor-pointer`}
                  onClick={() => setSize('S')}
                >
                  <p>S</p>
                </div>
                <div
                  className={`border-2 ${
                    size === 'M' && 'border-black'
                  } py-1 px-3 cursor-pointer`}
                  onClick={() => setSize('M')}
                >
                  <p>M</p>
                </div>
                <div
                  className={`border-2 ${
                    size === 'L' && 'border-black'
                  } py-1 px-3 cursor-pointer`}
                  onClick={() => setSize('L')}
                >
                  <p>L</p>
                </div>
              </div>
            </div>
            <hr />

            <div className='my-4'>
              <div className='flex items-center my-3'>
                <div>
                  <AiOutlineMinus
                    onClick={() => {
                      if (qty <= 1) {
                        setQty(1);
                      } else {
                        setQty(qty - 1);
                      }
                    }}
                    className='h-5 w-5 mr-5 cursor-pointer'
                  />
                </div>
                <p className='text-4xl'>{qty}</p>
                <div>
                  <AiOutlinePlus
                    onClick={() => setQty(qty + 1)}
                    className='h-5 w-5 ml-5 cursor-pointer'
                  />
                </div>
              </div>
              {info?.isAvailable ? (
                <button className='btn' onClick={handleAddToCart}>
                  Add to Cart
                </button>
              ) : (
                <button disabled className='btn bg-gray-500'>
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
        <h1 className='text-3xl my-10'>Reviews</h1>
        {info?.reviews.length === 0 ? (
          <div>
            <p className='text-xl'>No reviews for this product!</p>
            <hr className='my-2' />
          </div>
        ) : (
          info?.reviews?.map((item) => <Reviews review={item} key={item.id} />)
        )}
        <h1 className='text-2xl my-3 text-gray-600'>WRITE A CUSTOMER REVIEW</h1>

        {!user ? (
          <div className='bg-blue-200 p-3 rounded-sm w-1/4 my-5'>
            <span className='text-[#10516c]'>
              Please{' '}
              <Link href='/account/login'>
                <a className='text-black hover:underline'>sign in</a>
              </Link>{' '}
              to write a review
            </span>
          </div>
        ) : (
          <Link href={`/product/review/${info.id}`}>
            <a className='btn'>write a review</a>
          </Link>
        )}
      </div>
    </>
  );
};

export const getStaticProps = async ({ params: { slug } }) => {
  const res = await fetch(`${API_URL}/products?slug=${slug}`);
  const data = await res.json();

  return {
    props: {
      info: data[0],
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${API_URL}/products`);
  const data = await res.json();

  const paths = data.map((item) => ({ params: { slug: item.slug } }));

  return {
    paths,
    fallback: true,
  };
};

export default ProductDetailsPage;
