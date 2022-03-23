import Link from 'next/link';
import Seo from '../components/utils/Seo';
import Lottie from 'react-lottie-player';
import lottieJson from '../public/payment-successful.json';

const SuccessPage = () => {
  return (
    <>
      <Seo title='Payment Successful' />
      <div className='container mx-auto md:px-20 px-4'>
        <div className='flex justify-center'>
          <Lottie
            animationData={lottieJson}
            play
            style={{ width: 500, height: 500 }}
          />
        </div>
        <div className='flex flex-col justify-center items-center text-center'>
          <h1 className='text-3xl my-2'>Thank You!</h1>
          <p className='text-xl my-2'>
            Your payment was successfully completed
          </p>
          <p>
            <div className='my-3'>
              <Link href='/account/profile'>
                <a className='btn text-2xl'>Continue to Profile</a>
              </Link>
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
