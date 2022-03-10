import Rating from './Rating';
import { MdAccountCircle } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import moment from 'moment';
import { useSelector } from 'react-redux';

const Reviews = ({ review, handleStateDeletion }) => {
  const { user } = useSelector((state) => state.auth);

  const checkUser = user?.username === review?.user_name;

  return (
    <section>
      <div className='flex items-center gap-2'>
        <MdAccountCircle className='h-5 w-5 text-gray-600' />
        <p className='text-gray-600'>{review?.user_name}</p>
      </div>
      <div className='flex my-2'>
        <Rating rating={review?.rating} />
      </div>
      <div className='flex items-center justify-between'>
        <div>
          <p className='my-2 text-gray-600'>
            {moment(review?.published_at).format('DD-MM-YYYY')}
          </p>
          <p className='my-3'>{review?.review}</p>
        </div>
        {checkUser && (
          <AiFillDelete
            size='1.5rem'
            className='cursor-pointer'
            onClick={() => handleStateDeletion(review?.id)}
          />
        )}
      </div>
      <hr className='border my-1' />
    </section>
  );
};

export default Reviews;
