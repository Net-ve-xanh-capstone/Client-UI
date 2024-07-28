import React from 'react';
import { DropdownProvider } from './dropdown-context';

const Dropdown = ({ children, ...props }) => {
  return (
    <DropdownProvider {...props}>
      <div className={`${props.disabled ? 'read-only' : 'select-only'} relative inline-block w-full`}>{children}</div>
    </DropdownProvider>
  );
};

export default Dropdown;
