import { useRouter } from 'next/router';
import React, { useState } from 'react';

const SearchComp = () => {
  const [search, setSearch] = useState('');

  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
      router.push(`/product/search?term=${search}`);
    } else {
      alert('fuck manh!');
    }
  };

  return (
    <form className='md:absolute md:top-[0.6rem]' onSubmit={handleSearch}>
      <input
        type='text'
        name='search'
        placeholder='Search Products...'
        className='p-1 mb-5 mt-3 border-2 rounded-tl-sm rounded-bl-sm outline-none bg-white text-black'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className='bg-green-600 text-white rounded-tr-sm rounded-br-sm p-[0.52rem] md:absolute md:top-[0.73rem] text-sm'>
        SEARCH
      </button>
    </form>
  );
};

export default SearchComp;
