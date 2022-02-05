import Rating from './Rating';
import { MdAccountCircle } from 'react-icons/md';
import moment from 'moment';

const Reviews = ({ review }) => {
  return (
    <section>
      <div className='flex items-center gap-2'>
        <MdAccountCircle className='h-5 w-5 text-gray-600' />
        <p className='text-gray-600'>{review?.user_name}</p>
      </div>
      <div className='flex my-2'>
        <Rating rating={review?.rating} />
      </div>
      <p className='my-2 text-gray-600'>
        {moment(review?.published_at).format('DD-MM-YYYY')}
      </p>
      <p className='my-3'>{review?.review}</p>
      <hr className='border my-1' />
    </section>
  );
};

export default Reviews;
