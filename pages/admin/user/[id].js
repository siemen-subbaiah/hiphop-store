import { useRouter } from 'next/router';
import { useState } from 'react';
import Seo from '../../../components/utils/Seo';
import { API_URL } from '../../../config';
import { parseCookies } from '../../../helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SingleUserPage = ({ token, data }) => {
  const [name, setName] = useState(data?.username);
  const [email, setEmail] = useState(data?.email);
  const [isAdmin, setIsAdmin] = useState(
    data?.role?.name === 'Admin' ? true : false
  );

  const router = useRouter();

  const {
    query: { id },
  } = useRouter();

  const adminId = isAdmin ? 3 : 1;

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username: name, email, role: { id: adminId } }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push('/admin/userlist');
    } else {
      toast.error('Something went wrong,try again');
    }
  };

  const handleDelete = async (e) => {
    const confirm = window.confirm('Do you want to delete this user?');
    console.log(confirm);

    if (confirm) {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin/userlist');
      } else {
        toast.error('Something went wrong,try again');
      }
    }
  };

  return (
    <>
      <Seo title='User' />
      <div className='container mx-auto md:px-80 px-4 my-5'>
        <div className='flex items-center gap-3'>
          <h1 className='text-3xl'>EDIT USER</h1>
        </div>
        <form
          className='my-10 bg-white shadow-2xl p-5 border'
          onSubmit={handleUpdate}
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
          <label htmlFor='email'>Email Addeess</label>
          <input
            type='email'
            name='email'
            placeholder='Enter your email address'
            className='w-full p-3 mb-5 mt-3 border-2 outline-none'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='checkbox'
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
            id='checkbox'
            className='mr-2 h-4 w-4 mt-1 align-top cursor-pointer'
          />
          <label
            className='form-check-label inline-block text-gray-800'
            htmlFor='checkbox'
          >
            Is Admin
          </label>

          <button className='btn my-3 w-full'>UPDATE USER</button>
        </form>
        <button className='btn bg-red-600' onClick={handleDelete}>
          DELETE USER?
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

  const res = await fetch(`${API_URL}/users/${id}`, {
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

export default SingleUserPage;
