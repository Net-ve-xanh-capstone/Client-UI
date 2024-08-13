import React from 'react';
import { useDropdown } from './dropdown-context';
import classNames from 'classnames';

const Select = ({ placeholder = '', className = '' }) => {
  const { toggle, show, errors } = useDropdown();
  
  return (
    <div
      id="item-create"
      onClick={toggle}
      style={{
        border: '1px solid rgba(138, 138, 160, 0.3)',
        outline: 0,
        boxShadow: 'none',
        fontSize: '18px',
        lineHeight: '28px',
        borderRadius: '4px',
        background: 'transparent',
        color: '#8a8aa0',
        width: '100%',
        padding: '10px 0'
      }}
      className={classNames(className, errors?.length > 0 ? 'border-danger' : '')}
    >
      <span style={{ marginLeft: '15px' }}>{placeholder}</span>

      <span style={{ float: 'right', marginTop: '4px' }}>
        {show ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: '20px'
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: '20px'
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </span>
    </div>
  );
};

export default Select;
