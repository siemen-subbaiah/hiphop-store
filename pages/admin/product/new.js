import { useState } from 'react';
import Seo from '../../../components/utils/Seo';
import slugify from 'slugify';
import { API_URL } from '../../../config';
import { parseCookies } from '../../../helpers';
import { useRouter } from 'next/router';

const AddNewProductPage = ({ token }) => {
  const router = useRouter();

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: 0,
    brand: '',
  });

  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const slug = slugify(values.name, { lower: true });

  const formData = new FormData();
  image.forEach((img) => formData.append('files', img));
  formData.append('ref', 'images');
  formData.append('field', 'image');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFileChange = async (e) => {
    setImage([...e.target.files]);
  };

  const handleProductAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const Imagedata = await res.json();
    if (res.ok) {
      const anotherRes = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: values.name,
          slug,
          description: values.description,
          price: parseInt(values.price),
          isAvailable: true,
          brand: values.brand,
          image: Imagedata,
        }),
      });
      const anotherData = await anotherRes.json();

      if (anotherRes.ok) {
        setLoading(false);
        router.push('/admin/productlist');
      }
    }
  };

  return (
    <>
      <Seo title='Add Product' />
      <div className='container mx-auto md:px-80 px-4 my-5'>
        <div className='flex items-center gap-3'>
          <h1 className='text-3xl'>ADD PRODUCT</h1>
        </div>
        <form
          className='my-10 bg-white shadow-2xl p-5 border'
          onSubmit={handleProductAdd}
        >
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            placeholder='Enter product name'
            className='w-full p-3 mb-5 mt-3 border-2 outline-none'
            value={values.name}
            onChange={handleInputChange}
          />
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            name='price'
            placeholder='Enter product price'
            className='w-full p-3 mb-5 mt-3 border-2 outline-none'
            value={values.price}
            onChange={handleInputChange}
          />
          <div className='my-3'>
            <div className='my-2'>
              <label htmlFor='image'>Image</label>
            </div>
            <input
              type='file'
              name='image'
              multiple
              className='w-full p-3 mb-5 mt-3 border-2 outline-none'
              onChange={handleFileChange}
            />
          </div>
          <label htmlFor='brand'>Brand</label>
          <input
            type='text'
            name='brand'
            placeholder='Enter product brand name'
            className='w-full p-3 mb-5 mt-3 border-2 outline-none'
            value={values.brand}
            onChange={handleInputChange}
          />
          <label htmlFor='description'>Description</label>
          <textarea
            name='description'
            className='w-full p-3 mb-5 mt-3 border-2 outline-none'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
          {loading ? (
            <button disabled className='btn opacity-70 my-3 w-full'>
              HOLD ON...
            </button>
          ) : (
            <button className='btn my-3 w-full'>ADD</button>
          )}
        </form>
      </div>
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

  return {
    props: {
      token,
    },
  };
};

export default AddNewProductPage;
