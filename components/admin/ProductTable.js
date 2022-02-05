import React from 'react';
import {
  MdOutlineCancel,
  MdCheckCircleOutline,
  MdModeEdit,
} from 'react-icons/md';
import Link from 'next/link';

const AdminOrderTable = ({ products }) => {
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
                    PRICE
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white px-6 py-4 text-left'
                  >
                    BRAND
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white px-6 py-4 text-left'
                  >
                    isAvailable
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white px-6 py-4 text-left'
                  ></th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => {
                  return (
                    <tr className='bg-gray-100 border-b' key={product?.id}>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {product?.id}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {product?.name}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {product?.price}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {product?.brand}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {product?.isAvailable ? (
                          <MdCheckCircleOutline className='h-6 w-6 text-green-500' />
                        ) : (
                          <MdOutlineCancel className='h-6 w-6 text-red-500' />
                        )}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        <Link href={`/admin/product/${product?.id}`}>
                          <a className='flex items-center gap-2 border-2 p-1 bg-white md:w-1/2'>
                            <MdModeEdit className='h-5 w-5' />
                            <span>Edit</span>
                          </a>
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
