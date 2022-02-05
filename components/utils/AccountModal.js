import Link from 'next/link';
import { MdAccountCircle } from 'react-icons/md';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../src/features/auth/authReducer';
import { useRouter } from 'next/router';
import { clearCart } from '../../src/features/cart/cartReducer';

const AccountModal = () => {
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

  return (
    <>
      <div className='h-10 rounded-full w-10 bg-primary text-white text-lg flex justify-center items-center cursor-pointer'>
        <MdAccountCircle
          className='h-9 w-9'
          onClick={() => setToggle(!toggle)}
        />
      </div>
      {toggle && (
        <div className='bg-white shadow-md text-black absolute top-[4.3rem] pr-20 pl-4 rounded-md right-16 z-10'>
          <ul>
            <li className='my-3' onClick={() => setToggle(false)}>
              <Link href='/account/profile'>Profile</Link>
            </li>
            <li
              className='my-3'
              onClick={() => {
                dispatch(logout());
                dispatch(clearCart());
                typeof window !== 'undefined' &&
                  localStorage.removeItem('shippingAddress');
                router.push('/');
              }}
            >
              <a href='#'>Logout</a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default AccountModal;
