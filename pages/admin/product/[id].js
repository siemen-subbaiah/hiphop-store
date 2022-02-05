import { useState } from 'react';
import Seo from '../../../components/utils/Seo';
import { API_URL } from '../../../config';
import { parseCookies } from '../../../helpers';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';
import slugify from 'slugify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProductPage = ({ token, data }) => {
  const router = useRouter();

  const {
    query: { id },
  } = useRouter();

  const [values, setValues] = useState({
    name: data.name,
    description: data.description,
    price: data.price,
    brand: data.brand,
  });

  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const [uploadedImages, setUploadedImages] = useState(data?.image);

  const [isAvailable, setIsAvailable] = useState(
    data?.isAvailable ? true : false
  );

  const slug = slugify(values.name, { lower: true });

  const formData = new FormData();
  formData.append('refID', data.id);
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

  const imageCheck = image.length === 0 ? true : false;

  const handleProductEdit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!imageCheck) {
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const Imagedata = await res.json();
      if (res.ok) {
        const newImage = Imagedata.map((img) => img);
        const image = [uploadedImages, newImage].flat();

        const anotherRes = await fetch(`${API_URL}/products/${data.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            image,
          }),
        });
        const anotherData = await anotherRes.json();

        if (anotherRes.ok) {
          setLoading(false);
          router.push('/admin/productlist');
        }
      } else {
        toast.error('Something went wrong,try again');
      }
    }
    const updateRes = await fetch(`${API_URL}/products/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: values.name,
        slug,
        description: values.description,
        price: parseInt(values.price),
        isAvailable,
        brand: values.brand,
      }),
    });
    const updateData = await updateRes.json();

    setLoading(false);
    router.push('/admin/productlist');
  };

  const handleProductDelete = async () => {
    const confirm = window.confirm('Do you want to delete this product?');

    if (confirm) {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin/productlist');
      } else {
        toast.error('Something went wrong,try again');
      }
    }
  };

  const handleImageDelete = async (id) => {
    const confirm = window.confirm('Do you want to delete this Image?');

    if (confirm) {
      const res = await fetch(`${API_URL}/upload/files/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error('Something went wrong,try again');
      }

      setUploadedImages(uploadedImages.filter((img) => img.id !== id));
    }
  };

  return (
    <>
      <Seo title='Edit Product' />
      <div className='container mx-auto md:px-80 px-4 my-5'>
        <div className='flex items-center gap-3'>
          <h1 className='text-3xl'>EDIT PRODUCT</h1>
        </div>
        <form
          className='my-10 bg-white shadow-2xl p-5 border'
          onSubmit={handleProductEdit}
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
          <label htmlFor='brand'>Brand</label>
          <input
            type='text'
            name='brand'
            placeholder='Enter product brand name'
            className='w-full p-3 mb-5 mt-3 border-2 outline-none'
            value={values.brand}
            onChange={handleInputChange}
          />
          <label htmlFor='images'>Existing Images</label>
          <div className='flex gap-2 mb-10 md:mb-0 items-center'>
            {uploadedImages.map((img, i) => {
              return (
                <div className='bg-white p-1 shadow-md my-5' key={i}>
                  <Image
                    src={img?.url}
                    blurDataURL={img?.url}
                    height={100}
                    width={100}
                    placeholder='blur'
                    alt='product'
                  />
                  <MdDelete
                    className='h-4 w-4 my-2 text-red-500 cursor-pointer'
                    onClick={() => handleImageDelete(img.id)}
                  />
                </div>
              );
            })}
          </div>
          <div className='my-3'>
            <div className='my-2'>
              <label htmlFor='image'>New Image</label>
            </div>
            <input
              type='file'
              name='image'
              multiple
              className='w-full p-3 mb-5 mt-3 border-2 outline-none'
              onChange={handleFileChange}
            />
          </div>
          <label htmlFor='description'>Description</label>
          <textarea
            name='description'
            className='w-full p-3 mb-5 mt-3 border-2 outline-none h-32'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
          <input
            type='checkbox'
            checked={isAvailable}
            onChange={() => setIsAvailable(!isAvailable)}
            id='checkbox'
            className='mr-2 h-4 w-4 mt-1 align-top cursor-pointer'
          />
          <label
            className='form-check-label inline-block text-gray-800'
            htmlFor='checkbox'
          >
            Is Available
          </label>
          {loading ? (
            <button disabled className='btn bg-orange-700 my-3 w-full'>
              HOLD ON...
            </button>
          ) : (
            <button className='btn my-3 w-full'>UPDATE</button>
          )}
        </form>
        <button className='btn bg-red-600' onClick={handleProductDelete}>
          DELETE PRODUCT?
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export const getServerSideProps = async ({ req, params: { id } }) => {
  const { token } = parseCookies(req);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (res.ok) {
    return {
      props: {
        token,
        data,
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

export default EditProductPage;
