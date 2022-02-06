import { useState } from 'react';
import Seo from '../components/utils/Seo';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const handleEmailJs = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await emailjs.sendForm(
        'service_x5agap3',
        'template_e2xap6c',
        e.target,
        'user_2ycGHDtiEG2OA8KCMYXOt'
      );
      setLoading(false);
      if (res.status === 200) {
        toast.success('Will get back to you very soon!');
      } else {
        toast.error('Error');
      }
    } catch (error) {
      console.log(error);
    }
    e.target.reset();
  };

  return (
    <>
      <Seo title='Contact' />
      <div className='container mx-auto md:px-80 px-4 my-5'>
        <h1 className='text-3xl'>CONTACT</h1>
        <form
          className='my-10 bg-white shadow-2xl p-5 border'
          onSubmit={handleEmailJs}
        >
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            placeholder='Enter your name'
            className='w-full p-3 mb-5 mt-3 border-2 outline-none'
            required
          />
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            placeholder='Enter your email address'
            className='w-full p-3 mb-5 mt-3 border-2 outline-none'
            required
          />
          <label htmlFor='reason'>Reason</label>
          <textarea
            name='reason'
            className='w-full p-3 mb-5 mt-3 border-2 outline-none'
            required
          ></textarea>
          {loading ? (
            <button disabled className='btn my-3 w-full opacity-70'>
              LOADING...
            </button>
          ) : (
            <button className='btn my-3 w-full'>SUBMIT</button>
          )}
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default ContactPage;
