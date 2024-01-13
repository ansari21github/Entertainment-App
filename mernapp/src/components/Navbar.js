

import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Navbar = ({ setSearchTerm }) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='h-auto md:w-96 bg-main p-4 ml-32'>
      <section className='w-full h-10 flex items-center'>
        <span className='w-8 h-full flex items-center font-light text-white'>
          <FaSearch />
        </span>
        <input
          type='search'
          placeholder='Search for movies or TV Series'
          className='w-full h-full font-medium md:pl-2 focus:outline-none text-text bg-main'
          onChange={handleSearchChange}
        />
      </section>
    </div>
  );
};

export default Navbar;



