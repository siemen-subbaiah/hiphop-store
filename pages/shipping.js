import { useState } from 'react';
import Seo from '../components/utils/Seo';
import { MdLocalShipping, MdModeEdit, MdDelete } from 'react-icons/md';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { API_URL } from '../config';
import { parseCookies } from '../helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShippingPage = ({ data, token }) => {
  const router = useRouter();
  const userId = data?.id;

  const [toggle, setToggle] = useState(false);

  const [address, setAdress] = useState(data?.addresses);
  const [addressEdit, setAddressEdit] = useState(false);
  const [addressEditID, setAddressID] = useState(0);

  const [values, setValues] = useState({
    address: '',
    city: '',
    postalCode: 560068,
    country: '',
  });

  // HANDLING ALL INPUTS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleAddressSubmission = async (e) => {
    e.preventDefault();

    if (addressEdit) {
      const res = await fetch(`${API_URL}/addresses/${addressEditID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address_field: values, user: userId }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success('Address updated successfully');
        setToggle(false);
        setAddressEdit(false);
        setAddressID(0);
        setValues({
          address: '',
          city: '',
          country: '',
          postalCode: '',
        });
        setAdress(
          address.map((item) => (item.id === addressEditID ? data : item))
        );
      } else {
        toast.error('Could not update address');
      }
    } else {
      const res = await fetch(`${API_URL}/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address_field: values, user: userId }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success('Address added successfully');
        setAdress([...address, data]);
        setToggle(false);
      } else {
        toast.error('Could not add address');
      }
    }
  };

  const handleAddressDelete = async (id) => {
    const confirm = window.confirm('Do you want to delete this address?');

    if (confirm) {
      const res = await fetch(`${API_URL}/addresses/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Address deleted sucessfully!');
        setAdress(address.filter((item) => item.id !== id));
      } else {
        toast.error('Failed to delete the address!');
      }
    }
  };

  const handleAddressEdit = (address, id) => {
    setToggle(true);
    setAddressEdit(true);
    setAddressID(id);
    setValues({
      address: address?.address,
      city: address?.city,
      postalCode: address?.postalCode,
      country: address?.country,
    });
  };

  const finalSubmit = (address) => {
    localStorage.setItem('shippingAddress', JSON.stringify(address));
    router.push('/placeorder');
  };

  return (
    <>
      <Seo title='Shipping' />
      <div className='container mx-auto md:px-80 px-4 my-5'>
        <div className='flex items-center gap-3'>
          <h1 className='text-3xl'>SHIPPING</h1>
          <MdLocalShipping className='h-8 w-8' />
        </div>
        <button
          className='flex items-center gap-3 my-3 btn justify-center cursor-pointer'
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? (
            <>
              <span
                onClick={() => {
                  setValues({
                    address: '',
                    city: '',
                    country: '',
                    postalCode: '',
                  });
                  setAddressEdit(false);
                }}
              >
                Go Back
              </span>
            </>
          ) : (
            <>
              {' '}
              <span className='text-xl'>ADD NEW ADDRESS</span>
              <BsFillPlusCircleFill className='h-5 w-5' />
            </>
          )}
        </button>
        {toggle && (
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
              value={values.address}
              onChange={handleInputChange}
              required
            />
            <label htmlFor='city'>City</label>
            <input
              type='text'
              name='city'
              placeholder='Enter your city'
              className='w-full p-3 mb-5 mt-3 border-2 outline-none'
              value={values.city}
              onChange={handleInputChange}
              required
            />
            <label htmlFor='city'>Postal Code</label>
            <input
              type='number'
              name='postalCode'
              placeholder='Enter postal code'
              className='w-full p-3 mb-5 mt-3 border-2 outline-none'
              value={values.postalCode}
              onChange={handleInputChange}
              required
            />
            <label htmlFor='country'>Country</label>
            <input
              type='text'
              name='country'
              placeholder='Enter your country'
              className='w-full p-3 mb-5 mt-3 border-2 outline-none'
              value={values.country}
              onChange={handleInputChange}
              required
            />
            <button className='btn'>{addressEdit ? 'EDIT' : 'ADD'}</button>
          </form>
        )}
        <div className='my-3 grid md:grid-cols-2 grid-cols-1 gap-3'>
          {address?.length >= 1 ? (
            address?.map((item, i) => {
              return (
                <div
                  className='border-2 p-3 bg-white rounded-md shadow-md my-2 relative min-h-[200px]'
                  key={i}
                >
                  <p className='text-md my-1'>{`${item?.address_field?.address},`}</p>
                  <p className='text-md my-1'>
                    {item?.address_field?.city}-{' '}
                    {`${item?.address_field?.postalCode}`}
                  </p>
                  <p className='text-md my-1'>{`${item?.address_field?.country}`}</p>
                  <div className='my-2 flex gap-2'>
                    <MdModeEdit
                      className='text-xl cursor-pointer'
                      onClick={() =>
                        handleAddressEdit(item?.address_field, item?.id)
                      }
                    />
                    <MdDelete
                      className='text-xl cursor-pointer'
                      onClick={() => handleAddressDelete(item?.id)}
                    />
                  </div>
                  <div className='absolute bottom-0'>
                    <button
                      className='btn'
                      onClick={() => finalSubmit(item?.address_field)}
                    >
                      Deliver to this address
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className='bg-blue-200 p-3 rounded-lg my-5'>
              <h1 className='text-xl'>
                No address added, please add a new address!
              </h1>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const res = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (res.ok) {
    return {
      props: {
        data,
        token,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default ShippingPage;
