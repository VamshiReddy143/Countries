import React from 'react'
import Button from './Button';

const Navbar = () => {
  return (
    <div>
        <div id="header" className='flex items-center justify-between p-5'>
        <h1 className='text-2xl font-bold'>Where in the World?</h1>
        <Button/>
      </div>
    </div>
  )
}

export default Navbar