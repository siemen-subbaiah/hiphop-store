import { MdOutlineAccountCircle } from 'react-icons/md';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Seo from '../../components/utils/Seo';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../src/features/auth/authReducer';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const router = useRouter();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (router.query.redirect === 'shipping' && isSuccess) {
      router.push('/shipping');
    } else if (isSuccess || user?.user) {
      router.push('/');
    }

    // dispatch(reset());
  }, [isError, isSuccess, user, message, router]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      dispatch(login({ identifier: email, password }));
    } else {
      toast.error('Please fill all the fields');
    }
  };

  return (
    <>
      <Seo title='Login' />
      <div className='container mx-auto md:px-80 px-4 my-5'>
        <div className='flex items-center gap-3'>
          <h1 className='text-3xl'>SIGN IN</h1>
          <MdOutlineAccountCircle className='h-8 w-8' />
        </div>
        <form
          className='my-10 bg-white shadow-2xl p-5 border'
          onSubmit={handleLogin}
        >
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            placeholder='Enter your email address'
            className='w-full p-3 mb-5 mt-3 border-2 outline-none'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Enter your password'
            className='w-full p-3 mb-5 mt-3 border-2 outline-none'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isLoading ? (
            <>
              <button disabled className='btn my-3 w-full opacity-70'>
                LOADING...
              </button>
            </>
          ) : (
            <>
              <button className='btn my-3 w-full'>SIGN IN</button>
            </>
          )}
        </form>
        <button
          className='btn bg-orange-600 my-3 mr-2'
          onClick={() =>
            dispatch(
              login({ identifier: 'john@gmail.com', password: 'john123' })
            )
          }
        >
          SIGN IN AS GUEST
        </button>
        <button
          className='btn bg-orange-700 my-3 mr-2'
          onClick={() =>
            dispatch(
              login({ identifier: 'jane@gmail.com', password: 'jane123' })
            )
          }
        >
          SIGN IN AS ADMIN GUEST
        </button>
        <div className='mt-4'>
          {router.query.redirect === 'shipping' ? (
            <span>
              New Customer?{' '}
              <Link href='/account/register?redirect=shipping'>
                <a className='underline'>Register</a>
              </Link>
            </span>
          ) : (
            <span>
              New Customer?{' '}
              <Link href='/account/register'>
                <a className='underline'>Register</a>
              </Link>
            </span>
          )}
        </div>

        <p className='my-5'>
          Want to login as admin and checkout all features?{' '}
          <span>
            <Link href='/contact'>
              <a className='underline'>contact</a>
            </Link>
          </span>
        </p>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
