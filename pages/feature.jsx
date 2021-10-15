/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
import { Page, Card, DataTable, Modal } from '@shopify/polaris';
import { fetchCustomers } from './api/ems/index';
import Link from 'next/link';
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { getIdProps } from './[id]';

export default function feature({ customers }) {
  const router = useRouter();

  return (
    <div>
      <Page
        title='Data from Database'
        primaryAction={{
          content: 'Home Page',
          onAction: () => {
            router.replace('/');
          },
        }}>
        <Card>
          <div className='flex flex-col'>
            <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Shopify Id
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          First Name
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Last Name
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Email
                        </th>
                        <th scope='col' className='relative px-6 py-3'>
                          <span className='sr-only'>Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {customers.map((customer) => (
                        <tr>
                          <>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='flex items-center'>
                                <div className='ml-4'>
                                  <div className='text-sm font-medium text-gray-900'>
                                    {customer.id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='text-sm text-gray-900'>
                                {customer.firstName}
                              </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='text-sm text-gray-900'>
                                {customer.lastName}
                              </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='text-sm text-gray-900'>
                                {customer.email}
                              </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                              <Link
                                href={customer._id}
                                className='text-indigo-600 hover:text-indigo-900'>
                                <a
                                  onClick={() => {
                                    fetch('http://localhost:3000/api/ems', {
                                      method: 'PATCH',
                                      body: customer._id,
                                    });
                                  }}>
                                  Edit
                                </a>
                              </Link>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                              <button
                                className='text-indigo-600 hover:text-indigo-900'
                                onClick={() => {
                                  fetch('http://localhost:3000/api/ems', {
                                    method: 'DELETE',
                                    body: customer._id,
                                  }).then(() => {
                                    router.push({
                                      pathname: '/feature',
                                    });
                                  });
                                }}>
                                delete
                              </button>
                            </td>
                          </>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Page>
    </div>
  );
}

export async function getServerSideProps() {
  let customers = await fetchCustomers();
  // console.log(customers);
  return {
    props: {
      customers: JSON.parse(JSON.stringify(customers)),
    },
  };
}
