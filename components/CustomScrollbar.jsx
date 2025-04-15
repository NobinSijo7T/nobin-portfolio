import React from 'react';
import './custom-scrollbar.scss';

const CustomScrollbar = ({ children }) => {
  return (
    <div className="custom-scrollbar-container">
      {children}
    </div>
  );
};

export default CustomScrollbar;