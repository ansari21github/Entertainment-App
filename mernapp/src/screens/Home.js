
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Recommended from '../components/Recommended';
import Trending from '../components/Trending';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className='bg-main min-h-screen '>
      <div>
        <Navbar setSearchTerm={setSearchTerm} />
      </div>
      <div>
        <Sidebar />
      </div>
      <div>
        <Trending searchTerm={searchTerm} />
      </div>
      <div>
        <Recommended searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default Home;
