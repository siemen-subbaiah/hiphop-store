import React from 'react';
import { MdOutlineCancel, MdCheckCircleOutline } from 'react-icons/md';
import moment from 'moment';
import Link from 'next/link';

const AdminOrderTable = ({ orders }) => {
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
                    USER
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white px-6 py-4 text-left'
                  >
                    DATE
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white px-6 py-4 text-left'
                  >
                    TOTAL
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white px-6 py-4 text-left'
                  >
                    PAID
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white px-6 py-4 text-left'
                  >
                    DELIVERED
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white px-6 py-4 text-left'
                  ></th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => {
                  return (
                    <tr className='bg-gray-100 border-b' key={order?.id}>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {order?.uuid}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {order?.user?.username}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {moment(order?.published_at).format('DD-MM-YYYY')}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {order?.total}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {order?.isPaid ? (
                          <MdCheckCircleOutline className='h-6 w-6 text-green-500' />
                        ) : (
                          <MdOutlineCancel className='h-6 w-6 text-red-500' />
                        )}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {order?.isDelivered ? (
                          <MdCheckCircleOutline className='h-6 w-6 text-green-500' />
                        ) : (
                          <MdOutlineCancel className='h-6 w-6 text-red-500' />
                        )}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        <Link href={`/order/${order.uuid}`}>
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

export default AdminOrderTable;
