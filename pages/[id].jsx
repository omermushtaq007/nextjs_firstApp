/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from 'react';

export default function editById() {
  const [value, setValue] = useState();
  const handler = () => {
    setValue(value);
  };

  return (
    <>
      <h1>Customer Update</h1>
      <form>
        <div>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            id='firstName'
            value={value}
            onChange={handler}
            className='form-input'
          />
        </div>
        <div>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            value={value}
            onChange={handler}
            id='firstName'
            className='form-input'
          />
        </div>
        <div>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            value={value}
            onChange={handler}
            id='firstName'
            className='form-input'
          />
        </div>
        <button type='submit' value='update'>
          update
        </button>
      </form>
    </>
  );
}
