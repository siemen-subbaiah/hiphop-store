import Link from 'next/link';
import { MdOutlineCancel, MdCheckCircleOutline } from 'react-icons/md';

const UsersTable = ({ users }) => {
  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full'>
              <thead className='bg-primary border-b'>
                <tr>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white px-6 py-4 text-left'
                  >
                    ID
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white px-6 py-4 text-left'
                  >
                    NAME
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white px-6 py-4 text-left'
                  >
                    EMAIL
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white px-6 py-4 text-left'
                  >
                    ADMIN
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white px-6 py-4 text-left'
                  ></th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => {
                  return (
                    <tr className='bg-gray-100 border-b' key={user?.id}>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {user?.id}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {user?.username}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {user?.email}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {user?.role?.name === 'Admin' ? (
                          <MdCheckCircleOutline className='h-6 w-6 text-green-500' />
                        ) : (
                          <MdOutlineCancel className='h-6 w-6 text-red-500' />
                        )}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        <Link href={`/admin/user/${user.id}`}>
                          <a className='border-2 px-3 py-2 bg-white'>DETAILS</a>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
