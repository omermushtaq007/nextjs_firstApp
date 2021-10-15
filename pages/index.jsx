/* eslint-disable react/jsx-key */
import { Page, Card } from '@shopify/polaris';
import { getCustomer } from '../utils';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function Home({ customers }) {
  const router = useRouter();

  return (
    <Page
      title='Data From Shopify'
      primaryAction={{
        content: 'Open Database',
        onAction: () => {
          router.replace('/feature');
        },
      }}
      secondaryActions={[
        {
          content: 'Save all',
          onAction: () => {
            fetch('http://localhost:3000/api/ems', {
              method: 'POST',
              body: customers,
            });
          },
        },
      ]}
      classNameName='p-56'>
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
                        first Name
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        last name
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        email
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {customers.map((customer) => (
                      <tr>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div className='ml-4'>
                              <div className='text-sm font-medium text-gray-900'>
                                {customer.node.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm text-gray-900'>
                            {customer.node.firstName}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm text-gray-900'>
                            {customer.node.lastName}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {customer.node.email}
                        </td>
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
  );
}

export async function getStaticProps() {
  const { data } = await getCustomer(customerQuery);

  return {
    props: {
      customers: data.customers.edges,
    },
  };
}

const gql = String.raw;

const customerQuery = gql`
  query Customers {
    customers(first: 20) {
      edges {
        node {
          id
          firstName
          lastName
          email
        }
      }
    }
  }
`;
