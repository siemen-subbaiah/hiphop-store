import Link from 'next/link';
import { useState } from 'react';

const AdminModal = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <button
        id='dropdownNavbarLink'
        data-dropdown-toggle='dropdownNavbar'
        className='flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-white'
        onClick={() => setToggle(!toggle)}
      >
        Admin{' '}
        <svg
          className='ml-1 w-4 h-4'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      {/* Dropdown menu */}
      {toggle && (
        <div className='absolute top-[4.3rem] right-48 z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow '>
          <ul className='py-1' aria-labelledby='dropdownLargeButton'>
            <li onClick={() => setToggle(false)}>
              <Link href='/admin/userlist'>
                <a className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 '>
                  Users
                </a>
              </Link>
            </li>
            <li onClick={() => setToggle(false)}>
              <Link href='/admin/productlist'>
                <a className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 '>
                  Products
                </a>
              </Link>
            </li>
            <li onClick={() => setToggle(false)}>
              <Link href='/admin/orderlist'>
                <a className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 '>
                  Orders
                </a>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default AdminModal;
