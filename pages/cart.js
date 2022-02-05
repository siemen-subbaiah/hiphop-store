import React from 'react';
import { useSelector } from 'react-redux';
import Seo from '../components/utils/Seo';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import {
  clearCart,
  decreaseItems,
  deleteItems,
  increaseItems,
} from '../src/features/cart/cartReducer';
import { parseCookies } from '../helpers';

const CartPage = ({ token }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  const cartDetails = cartItems.reduce(
    (total, item) => {
      total.cartTotal = total.cartTotal + item.price * item.qty;
      total.totalItems = total.totalItems + item.qty;
      return total;
    },
    {
      totalItems: 0,
      cartTotal: 0,
    }
  );

  return (
    <>
      <Seo title='Cart' />
      <div className='container md:px-20 px-4 mx-auto'>
        <h1 className='text-2xl my-10 text-center'>Shopping Cart</h1>
        {cartDetails.totalItems === 0 ? (
          <>
            <p className='text-center text-3xl my-5'>Your cart is empty!</p>
            <div className='flex justify-center'>
              <Link href='/'>
                <a className='btn'>FILL IT</a>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className='md:grid grid-cols-5 my-5 place-items-center hidden'>
              <p className='text-gray-500 text-lg'>Item</p>
              <p className='text-gray-500 text-lg'>Price</p>
              <p className='text-gray-500 text-lg'>Quantity</p>
              <p className='text-gray-500 text-lg'>Subtotal</p>
            </div>
            <hr />
            <div className='grid md:grid-cols-5 grid-cols-1 my-5 md:place-items-center'>
              {cartItems.map((item) => {
                return (
                  <>
                    <div className='flex items-center md:my-8 mt-10'>
                      <Image
                        src={item.image}
                        blurDataURL={item.image}
                        placeholder='blur'
                        width={50}
                        height={50}
                        alt={item.productName}
                      />
                      <p className='ml-5'>{item.productName}</p>
                    </div>

                    <p className='my-7'>
                      <span className='md:hidden'>Price : </span> ₹ {item.price}
                    </p>
                    <div className='flex items-center justify-start'>
                      <div>
                        <AiOutlineMinus
                          onClick={() =>
                            dispatch(decreaseItems(item.productId))
                          }
                          className='md:h-5 md:w-5 h-4 w-4 md:mr-5 mr-3 cursor-pointer'
                        />
                      </div>
                      <p className='text-xl'>{item.qty}</p>
                      <div>
                        <AiOutlinePlus
                          onClick={() =>
                            dispatch(increaseItems(item.productId))
                          }
                          className='md:h-5 md:w-5 h-4 w-4 md:ml-5 ml-3 cursor-pointer'
                        />
                      </div>
                      <div className='cursor-pointer text-red-600 md:hidden block ml-5'>
                        <MdDelete className='h-5 w-5' />
                      </div>
                    </div>
                    <p className='my-7 hidden md:block'>
                      ₹ {item.price * item.qty}
                    </p>
                    <div className='cursor-pointer text-red-600 md:block hidden'>
                      <MdDelete
                        className='h-5 w-5'
                        onClick={() => dispatch(deleteItems(item.productId))}
                      />
                    </div>
                    <hr className='mt-5 md:hidden block' />
                  </>
                );
              })}
            </div>
            <div className='my-10 flex justify-between'>
              <Link href='/'>
                <a className='btn bg-blue-500'>Continue Shopping</a>
              </Link>
              <button className='btn' onClick={() => dispatch(clearCart())}>
                Clear Cart
              </button>
            </div>

            <div className='my-5 md:w-[35%]'>
              <div className='border-2 p-5'>
                <div className='my-3 flex justify-between'>
                  <span className='font-semibold'>Subtotal:</span>
                  <p>₹ {cartDetails.cartTotal}</p>
                </div>
                <div className='my-3 flex justify-between'>
                  <span className='font-semibold'>Shipping Fee:</span>
                  <p>FREE</p>
                </div>
                <p className='my-5 text-2xl'>
                  <span className='font-semibold'>Order Total:</span> ₹
                  {cartDetails.cartTotal}
                </p>
                {token ? (
                  <Link href='/shipping'>
                    <a className='btn w-full'>Procced to checkout</a>
                  </Link>
                ) : (
                  <Link href='/account/login?redirect=shipping'>
                    <a className='btn w-full'>Procced to checkout</a>
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);

  return {
    props: {
      token: token ? token : '',
    },
  };
};

export default CartPage;
