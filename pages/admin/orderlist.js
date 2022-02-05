import AdminOrderTable from '../../components/admin/AdminOrderTable';
import Seo from '../../components/utils/Seo';
import { API_URL } from '../../config';
import { parseCookies } from '../../helpers';

const OrderListPage = ({ data }) => {
  return (
    <>
      <Seo title='Order List' />
      <div className='container mx-auto md:px-20 px-4'>
        <h1 className='text-3xl'>ORDERS</h1>
        <div className='my-5'>
          <AdminOrderTable orders={data} />
        </div>
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

  const res = await fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};

export default OrderListPage;
