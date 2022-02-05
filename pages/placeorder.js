import Link from 'next/link';
import Image from 'next/image';
import slugify from 'slugify';
import Seo from '../components/utils/Seo';
import { clearCart } from '../src/features/cart/cartReducer';
import { useDispatch } from 'react-redux';
import { parseCookies } from '../helpers';
import { API_URL } from '../config';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const PlaceOrderPage = ({ token }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const router = useRouter();

  const cartItems =
    typeof window !== 'undefined' && localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : null;

  const shippingAddress =
    typeof window !== 'undefined' && localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : null;

  const cartDetails = cartItems?.reduce(
    (total, item) => {
      total.cartTotal = total.cartTotal + item.price * item.qty;
      return total;
    },
    {
      cartTotal: 0,
    }
  );

  const result = {
    isDelivered: false,
    isPaid: false,
    total: cartDetails?.cartTotal,
    user: {
      id: user?.id,
    },
    shippingAddress,
    items: cartItems,
  };

  const handleOrdering = async () => {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(result),
    });
    await res.json();

    if (res.ok) {
      router.push('/account/profile');
      dispatch(clearCart());
    }
  };

  return (
    <>
      <Seo title='Confirm Order' />
      <div className='container mx-auto md:px-20 px-4 my-5'>
        <div className='md:grid grid-cols-12 gap-10'>
          <div className='col-span-8'>
            <h1 className='text-3xl my-2'>SHIPPING</h1>
            <p className='my-2 text-md'>
              Address :{' '}
              {`${shippingAddress?.address}, ${shippingAddress?.city} ${shippingAddress?.postalCode}, ${shippingAddress?.country}`}
            </p>
            <hr />
            <hr />
            <div className='my-3'>
              <h1 className='text-xl my-2'>ORDER ITEMS</h1>
              {cartItems?.map((item, i) => {
                const slug = slugify(item?.productName, {
                  lower: true,
                });

                return (
                  <div
                    className='flex justify-between items-center my-5'
                    key={i}
                  >
                    <div className='flex items-center'>
                      <Image
                        src={item?.image}
                        alt='product'
                        height={50}
                        width={50}
                      />
                      <Link href={`/product/${slug}`}>
                        <a className='ml-3 cursor-pointer hover:underline'>
                          {item?.productName}
                        </a>
                      </Link>
                    </div>
                    <div>
                      <p>
                        {item?.qty} X ₹{item?.price} = ₹
                        {item?.qty * item?.price}{' '}
                      </p>
                    </div>
                  </div>
                );
              })}
              <hr />
            </div>
          </div>
          <div className='col-span-4'>
            <div className='border-2 p-5'>
              <div className='my-3 flex justify-between'>
                <span className='font-semibold'>Subtotal:</span>
                <p>₹ {cartDetails?.cartTotal}</p>
              </div>
              <div className='my-3 flex justify-between'>
                <span className='font-semibold'>Shipping Fee:</span>
                <p>FREE</p>
              </div>
              <p className='my-5 text-2xl'>
                <span className='font-semibold'>Order Total:</span> ₹{' '}
                {cartDetails?.cartTotal}
              </p>
              <button
                className='btn w-full bg-green-500'
                onClick={handleOrdering}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
        <Link href='/shipping'>
          <a className='btn'>BACK</a>
        </Link>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    },
  };
};

export default PlaceOrderPage;
