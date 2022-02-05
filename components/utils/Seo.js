import Head from 'next/head';

const Seo = ({ title, description }) => {
  return (
    <Head>
      <title>{title} | HipHop Store</title>
      <meta
        name='description'
        content={
          description ||
          `HipHop Store is a e-commerece for hip hop nerds where they can buy there favourite rapper's merch`
        }
      />
    </Head>
  );
};

export default Seo;
