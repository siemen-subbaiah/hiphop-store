import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderTable from '../../components/orders/OrderTable';
import Seo from '../../components/utils/Seo';
import { API_URL } from '../../config';
import { parseCookies, sortByDate } from '../../helpers';
import { updateUserProfile } from '../../src/features/auth/authReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = ({ token, data }) => {
  const { isError, user, message } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);

  const dispatch = useDispatch();

  const orders = sortByDate(data);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ token, name, email, id: user?.id }));
  };

  return (
    <>
      <Seo title='Profile' />
      <div className='container mx-auto md:px-20 px-4'>
        <div className='md:grid grid-cols-12'>
          <div className='col-span-3'>
            <h1 className='text-2xl my-5'>USER PROFILE</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor='name'>Name</label>
              <div>
                <input
                  type='text'
                  name='name'
                  placeholder='Enter your email address'
                  className='p-2 mb-5 mt-3 border-2 outline-none bg-gray-100 w-full md:w-min'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <label htmlFor='email'>Email</label>
              <div>
                <input
                  type='email'
                  name='email'
                  placeholder='Enter your password'
                  className='p-2 mb-5 mt-3 border-2 outline-none bg-gray-100 w-full md:w-min'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className='btn w-full md:w-min'>UPDATE</button>
            </form>
          </div>

          <div className='col-span-9'>
            <h1 className='text-2xl my-5'>MY ORDERS</h1>
            {orders?.length === 0 ? (
              <div className='bg-blue-300 w-72 p-2 rounded-md'>
                <h2 className='text-xl'>No orders yet!</h2>
              </div>
            ) : (
              <OrderTable orders={orders} />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/orders/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
      data,
    },
  };
};

export default ProfilePage;
