import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkUserLoggedIn } from '../../src/features/auth/authReducer';
import Footer from '../utils/Footer';
import Header from '../utils/Header';

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(checkUserLoggedIn()), []);

  return (
    <div className='font-poppins flex flex-col h-screen justify-between'>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
