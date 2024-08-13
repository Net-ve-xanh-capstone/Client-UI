import React from 'react';
import { useDropdown } from './dropdown-context.jsx';

const List = ({ children, className }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div
          className={className}
          style={{
            border: '1px solid rgba(138, 138, 160, 0.3)',
            outline: 0,
            boxShadow: 'none',
            fontSize: '18px',
            lineHeight: '28px',
            borderRadius: '4px',
            background: 'transparent',
            color: '#8a8aa0',
            overflowY: 'auto',
            height: '180px',
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default List;
