import { useState } from 'react';
import { useRouter } from 'next/router';
import Seo from '../../../components/utils/Seo';
import { parseCookies } from '../../../helpers';
import { API_URL } from '../../../config';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewPage = ({ token, data }) => {
  const { user } = useSelector((state) => state.auth);

  const [reviewText, setreviewText] = useState('');

  const [ratingVal, setRatingVal] = useState([1, 2, 3, 4, 5]);
  const [rating, setRating] = useState(3);

  const router = useRouter();
  const slug = data?.slug;

  const {
    query: { id },
  } = useRouter();

  const handleReview = async (e) => {
    e.preventDefault();

    if (reviewText) {
      const res = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_name: user.username,
          review: reviewText,
          rating,
          product: { id: parseInt(id) },
          user: { id: user.id },
        }),
      });

      await res.json();

      if (res.ok) {
        router.push(`/product/${slug}`);
      }
    } else {
      toast.error('Please fill the fields');
    }
  };

  return (
    <>
      <Seo title='Write a review' />
      <div className='container mx-auto md:px-80 px-4 my-5'>
        <div className='flex items-center gap-3'>
          <h1 className='text-3xl'>
            Write a review for <span className='underline'>{data?.name}</span>
          </h1>
        </div>
        <form
          className='my-10 bg-white shadow-2xl p-5 border'
          onSubmit={handleReview}
        >
          <label htmlFor='rating'>Rating</label>

          <div className='mb-3'>
            <select
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              name='rating'
              className='
      w-full
      px-3
      py-1.5
      text-base
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      my-2
     focus:outline-none'
            >
              <option value='' disabled>
                Select...
              </option>
              {ratingVal.map((rate) => {
                return (
                  <option value={rate} key={rate}>
                    {rate}
                  </option>
                );
              })}
            </select>
          </div>
          <label htmlFor='review'>Review</label>
          <textarea
            name='review'
            className='w-full p-3 mb-5 mt-3 border-2 outline-none'
            value={reviewText}
            onChange={(e) => setreviewText(e.target.value)}
          ></textarea>

          <button className='btn my-3 w-full'>SUBMIT</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export const getServerSideProps = async ({ req, params: { id } }) => {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/products/${id}`);
  const data = await res.json();

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
      data,
      token,
    },
  };
};

export default ReviewPage;
