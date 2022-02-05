import { MdOutlineAccountCircle } from 'react-icons/md';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Seo from '../../components/utils/Seo';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../src/features/auth/authReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const dispatch = useDispatch();

  const router = useRouter();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const confirm = password === confirmPassword ? true : false;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    console.log(isSuccess);

    if (router.query.redirect === 'shipping' && isSuccess) {
      router.push('/shipping');
    } else if (isSuccess || user?.user) {
      router.push('/');
    }

    // dispatch(reset());
  }, [isError, isSuccess, user, message, router]);

  const handleRegister = (e) => {
    e.preventDefault();

    if (name && email && password && confirm) {
      dispatch(register({ username: name, email, password }));
    } else {
      toast.error('Please fill all the fields');
    }
  };

  return (
    <>
      <Seo title='Signup' />
      <div className='container mx-auto md:px-80 px-4 my-5'>
        <div className='flex items-center gap-3'>
          <h1 className='text-3xl'>SIGN UP</h1>
          <MdOutlineAccountCircle className='h-8 w-8' />
        </div>
        <form
          className='my-10 bg-white shadow-2xl p-5 border'
          onSubmit={handleRegister}
        >
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            placeholder='Enter your name'
            className='w-full p-3 mb-5 mt-3 border-2 outline-none'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            type='password'
            name='confirm-password'
            placeholder='Enter your confirm password'
            className='w-full p-3 mb-5 mt-3 border-2 outline-none'
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
          {isLoading ? (
            <button disabled className='btn my-3 w-full opacity-70'>
              LOADING...
            </button>
          ) : (
            <button className='btn my-3 w-full'>REGISTER</button>
          )}
        </form>
        <span>
          Have an account?{' '}
          <Link href='/account/login'>
            <a className='underline'>Login</a>
          </Link>
        </span>
      </div>
      <ToastContainer />
    </>
  );
};

export default RegisterPage;
