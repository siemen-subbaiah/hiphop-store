import { useState } from 'react';
import Seo from '../components/utils/Seo';
import { MdLocalShipping } from 'react-icons/md';
import { useRouter } from 'next/router';

const ShippingPage = () => {
  const shippingAddress =
    typeof window !== 'undefined' && localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : null;

  const [address, setAddress] = useState(
    shippingAddress?.address ? shippingAddress?.address : 'test value'
  );
  const [city, setCity] = useState(shippingAddress?.city);
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);
  const [country, setCountry] = useState(shippingAddress?.country);

  const router = useRouter();

  const handleAddressSubmission = (e) => {
    e.preventDefault();
    if (address && city && postalCode && country) {
      localStorage.setItem(
        'shippingAddress',
        JSON.stringify({ address, city, postalCode, country })
      );
      router.push('/placeorder');
    } else {
      alert('please fill all!');
    }
  };

  return (
    <>
      <Seo title='Shipping' />
      <div className='container mx-auto md:px-80 px-4 my-5'>
        <div className='flex items-center gap-3'>
          <h1 className='text-3xl'>SHIPPING</h1>
          <MdLocalShipping className='h-8 w-8' />
        </div>
        <form
          className='my-10 bg-white shadow-2xl p-5 border'
          onSubmit={handleAddressSubmission}
        >
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            name='address'
            placeholder='Enter your address'
            className='w-full p-3 mb-5 mt-3 border-2 outline-none'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label htmlFor='city'>City</label>
          <input
            type='text'
            name='city'
            placeholder='Enter your city'
            className='w-full p-3 mb-5 mt-3 border-2 outline-none'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label htmlFor='city'>Postal Code</label>
          <input
            type='number'
            name='code'
            placeholder='Enter postal code'
            className='w-full p-3 mb-5 mt-3 border-2 outline-none'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <label htmlFor='country'>Country</label>
          <input
            type='text'
            name='country'
            placeholder='Enter your country'
            className='w-full p-3 mb-5 mt-3 border-2 outline-none'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <button className='btn'>Continue</button>
        </form>
      </div>
    </>
  );
};

export default ShippingPage;
