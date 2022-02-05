import { useState } from 'react';
import { MdShoppingCart, MdMenu, MdLogin } from 'react-icons/md';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import AccountModal from './AccountModal';
import SearchComp from './SearchComp';
import { logout } from '../../src/features/auth/authReducer';
import { useRouter } from 'next/router';
import { clearCart } from '../../src/features/cart/cartReducer';
import AdminModal from '../admin/AdminModal';

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const { user } = useSelector((state) => state.auth);

  const router = useRouter();

  const dispatch = useDispatch();

  return (
    <nav className='md:px-20 p-5 md:flex items-center justify-between bg-primary text-white'>
      <div className='flex items-center'>
        <Link href='/'>
          <a>
            <h1 className='text-2xl'>HipHop Store</h1>
          </a>
        </Link>
        <div className='ml-8 hidden md:block'>
          <SearchComp />
        </div>
      </div>
      <MdMenu
        className='h-8 w-8 absolute right-2 top-5 md:hidden cursor-pointer'
        onClick={() => setToggle(!toggle)}
      />
      <ul
        className={` md:flex items-center md:gap-20 ${
          toggle ? 'none' : ' hidden'
        }`}
      >
        <li
          className='my-5 md:my-0 flex items-center gap-2 cursor-pointer'
          onClick={() => setToggle(false)}
        >
          <MdShoppingCart className='h-4 w-4' />
          <Link href='/cart'>
            <span>Cart {cartItems.length > 0 && `(${cartItems.length})`}</span>
          </Link>
        </li>

        {user?.role?.name === 'Admin' && (
          <>
            {/* <li
            className='my-5 md:my-0 md:hidden'
            onClick={() => setToggle(false)}
          >
            <Link href='/account/profile'>Account</Link>
          </li> */}
            <li className='my-5 md:my-0 hidden md:block'>
              <AdminModal />
            </li>
          </>
        )}
        {user ? (
          <>
            <li
              className='my-5 md:my-0 md:hidden'
              onClick={() => setToggle(false)}
            >
              <Link href='/account/profile'>Account</Link>
            </li>
            <li
              className='my-5 md:my-0 md:hidden'
              onClick={() => {
                setToggle(!toggle);
                dispatch(clearCart());
                typeof window !== 'undefined' &&
                  localStorage.removeItem('shippingAddress');
                dispatch(logout());
                router.push('/');
              }}
            >
              <a href='#'>Logout</a>
            </li>
            <li className='my-5 md:my-0 hidden md:block'>
              <AccountModal />
            </li>
          </>
        ) : (
          <>
            <li
              className='my-5 md:my-0 flex items-center gap-2'
              onClick={() => setToggle(false)}
            >
              <MdLogin className='h-4 w-4' />
              <Link href='/account/login'>Sign in</Link>
            </li>
          </>
        )}
        <li className='md:hidden block'>
          <SearchComp />
        </li>
      </ul>
    </nav>
  );
};

export default Header;
