import { MdStarRate } from 'react-icons/md';

const Rating = ({ rating }) => {
  const arr = [];

  for (let i = 1; i <= rating; i++) {
    arr.push(i);
  }

  return (
    <>
      {arr.map((i) => {
        return <MdStarRate className='h-6 w-6 text-yellow-400' key={i} />;
      })}
    </>
  );
};

export default Rating;
