import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Seo from '../../components/utils/Seo';
import { API_URL, NEXT_URL } from '../../config';
import { parseCookies } from '../../helpers';
import slugify from 'slugify';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js';

const OrderDetailsPage = ({ data, token }) => {
  const { user } = useSelector((state) => state.auth);

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { status } = router.query;

  const { id } = router.query;

  const checkAdmin = user?.role?.name === 'Admin' ? true : false;

  const handleDelivery = async () => {
    const res = await fetch(`${API_URL}/orders/${data?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isDelivered: true }),
    });

    const resdata = await res.json();

    if (res.ok) {
      router.push('/admin/orderlist');
    } else {
      toast.error('Something went wrong,try again');
    }
  };

  const createCheckOutSession = async () => {
    // setLoading(true);

    // const items = data?.items;

    const stripe = await stripePromise;
    const checkoutSession = await fetch(
      `${NEXT_URL}/api/create-stripe-session`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: data?.items, id }),
      }
    );
    const datar = await checkoutSession.json();

    if (checkoutSession.ok) {
      const res = await fetch(`${API_URL}/orders/${data?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPaid: true }),
      });

      const resdata = await res.json();

      const result = await stripe.redirectToCheckout({
        sessionId: datar.id,
      });
    }

    setLoading(false);

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <>
      <Seo title='Order Summary' />
      <div className='container mx-auto md:px-20 px-4 my-5'>
        <h1 className='text-3xl my-5'>ORDER: {data.uuid}</h1>

        <div className='md:grid grid-cols-12 gap-10'>
          <div className='col-span-8'>
            <div className='bg-gray-200 rounded-xl p-3 my-8'>
              <h1 className='text-xl'>ORDER PROCESSING INFO : </h1>
              <p className='my-3'>
                Admin can set this order status as delivered if payment is
                complete.
              </p>
            </div>
            <hr />
            <h1 className='text-xl my-2'>SHIPPING</h1>
            <p className='my-2 text-md'>Name : {data?.user?.username}</p>
            <p className='my-2 text-md'>Email : {data?.user?.email}</p>
            <p className='my-2 text-md'>
              Address :{' '}
              {`${data?.shippingAddress?.address}, ${data?.shippingAddress?.city} ${data?.shippingAddress?.postalCode}, ${data?.shippingAddress?.country}`}
            </p>
            <hr />
            <div
              className={`my-4 ${
                data?.isDelivered ? 'bg-green-300' : 'bg-red-300'
              } ${
                data?.isDelivered ? 'text-[#10516c]' : 'text-[#712b29] '
              } p-3 rounded-lg`}
            >
              <p className='text-lg'>
                Order Status :{' '}
                {data?.isDelivered
                  ? 'Delivered'
                  : 'Not yet delivered Delivered'}
              </p>
            </div>
            <hr />
            <div className='my-3'>
              <h1 className='text-xl my-2'>ORDER ITEMS</h1>
              {data?.items?.map((item) => {
                const slug = slugify(item?.productName, {
                  lower: true,
                });

                return (
                  <div
                    className='flex justify-between items-center my-5'
                    key={item.id}
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
                <p>₹ {data?.total}</p>
              </div>
              <div className='my-3 flex justify-between'>
                <span className='font-semibold'>Shipping Fee:</span>
                <p>FREE</p>
              </div>
              <p className='my-5 text-2xl'>
                <span className='font-semibold'>Order Total:</span> ₹{' '}
                {data?.total}
              </p>
              {checkAdmin && data?.isPaid && !data.isDelivered && (
                <button
                  className='btn w-full bg-green-500'
                  onClick={handleDelivery}
                >
                  MARK AS DELIVERED
                </button>
              )}
              {!data?.isPaid && (
                <button className='btn w-full' onClick={createCheckOutSession}>
                  {loading ? 'Processing...' : 'Place order'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export const getServerSideProps = async ({ req, params: { id } }) => {
  const { token } = parseCookies(req);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const res = await fetch(`${API_URL}/orders?uuid=${id}`, {
    method: 'GET',

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (res.ok) {
    return {
      props: {
        data: data[0],
        token,
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

export default OrderDetailsPage;
