import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5'; // Import icon search

const SearchInput = () => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Thêm logic tìm kiếm người dùng
    console.log('Searching for:', search);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          flex-1 
          px-4 py-2 
          text-sm 
          text-white 
          placeholder-gray-400 
          bg-white/10   /* Nền mờ */
          rounded-full   /* Bo tròn như trong ảnh */
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          focus:bg-white/20
        "
      />
      <button
        type="submit"
        className="
          p-2 
          bg-blue-600 
          text-white 
          rounded-full 
          hover:bg-blue-700 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500
          transition duration-200
        "
      >
        <IoSearch size={20} />
      </button>
    </form>
  );
};

export default SearchInput;