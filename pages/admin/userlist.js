import UsersTable from '../../components/admin/UsersTable';
import Seo from '../../components/utils/Seo';
import { API_URL } from '../../config';
import { parseCookies, sortByDate } from '../../helpers';

const UserListPage = ({ data }) => {
  const users = sortByDate(data);

  return (
    <>
      <Seo title='User List' />
      <div className='container mx-auto md:px-20 px-4'>
        <h1 className='text-3xl'>USERS</h1>
        <div className='my-5'>
          <UsersTable users={users} />
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

  const res = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (res.ok) {
    return {
      props: {
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

export default UserListPage;
