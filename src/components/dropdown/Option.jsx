import React from 'react';
import { useDropdown } from './dropdown-context';

const Option = (props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      style={{
        height: '40px',
      }}
      className="py-4 px-5 cursor-pointer flex items-center justify-between option transition-all text-sm"
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
