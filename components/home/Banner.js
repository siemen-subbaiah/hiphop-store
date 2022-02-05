import Image from 'next/image';
import banner from '../../public/images/banner.png';

const Banner = () => {
  return (
    <section className='bg-[#A7A8AC]'>
      <Image src={banner} placeholder='blur' alt='banner' />
    </section>
  );
};

export default Banner;
