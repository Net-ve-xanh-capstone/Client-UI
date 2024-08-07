import React from 'react';
import { useDropdown } from './dropdown-context';

const Search = ({ placeholder, ...props }) => {
  const { onChange, defaultValue } = useDropdown();
  return (
    <div className="sticky top-0 z-10 p-2 bg-white">
      <input
        type="text"
        style={{height: '40px'}}
        placeholder={placeholder}
        className="w-full p-4 border border-gray-200 rounded outline-none"
        onChange={onChange}
        defaultValue={defaultValue}
        {...props}
      />
    </div>
  );
};

export default Search;
