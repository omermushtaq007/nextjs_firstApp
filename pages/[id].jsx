/* eslint-disable react-hooks/rules-of-hooks */

import router, { useRouter } from 'next/router';
import { useState } from 'react';
export default function editById({ user }) {
  // console.log(user);
  const [FirstNameValue, setFirstNameValue] = useState(user.firstName);
  const [LastNameValue, setLastNameValue] = useState(user.lastName);
  const [EmailAddress, setEmailAddress] = useState(user.email);
  const valueFirstName = (e) => {
    setFirstNameValue(e.target.value);
  };
  const valueLastName = (e) => {
    setLastNameValue(e.target.value);
  };
  const valueEmailAddress = (e) => {
    setEmailAddress(e.target.value);
  };
  const values = [
    {
      id: user._id,
      firstName: FirstNameValue,
      lastName: LastNameValue,
      email: EmailAddress,
    },
  ];
  const formSubmit = (e) => {
    e.preventDefault();
    let response = fetch('http://localhost:3000/api/customer', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    router.push('/feature');
  };

  return (
    <>
      <div>
        <div className='flex items-center justify-center mt-12'>
          <h1 className='text-8xl'>Update From</h1>
        </div>
        <div className='flex justify-center my-12'>
          <form className='w-1/2' onSubmit={formSubmit}>
            <div className='flex flex-col mt-3 mb-5'>
              <label className='mb-3 text-3xl'>First Name</label>
              <input
                type='text'
                value={FirstNameValue}
                onChange={valueFirstName}
                className='form-input h-16 text-4xl'
              />
            </div>
            <div className='flex flex-col mb-5 mt-3'>
              <label className='mb-3 text-3xl'>Last Name</label>
              <input
                type='text'
                value={LastNameValue}
                onChange={valueLastName}
                className='form-input h-16 text-4xl'
              />
            </div>
            <div className='flex flex-col mb-5 mt-3'>
              <label className='mb-3 text-3xl'>Email Address</label>
              <input
                type='text'
                value={EmailAddress}
                onChange={valueEmailAddress}
                className='form-input h-16 text-4xl'
              />
            </div>
            <div className='flex justify-center'>
              <button className='bg-green-700 text-white w-full h-16 mt-3 font-semibold'>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const customers = await fetch('http://localhost:3000/api/customer', {
    method: 'PATCH',
    body: id,
  });
  // console.log(customers)
  const data = await customers.json();
  // console.log(data);
  return {
    props: {
      user: JSON.parse(JSON.stringify(data)),
      // user: "Goodbye world!"
    },
  };
}
