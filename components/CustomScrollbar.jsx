import React from 'react';
import '../styles/custom-scrollbar.scss';

const CustomScrollbar = ({ children }) => {
  return (
    <div className="custom-scrollbar-container">
      {children}
    </div>
  );
};

export default CustomScrollbar;