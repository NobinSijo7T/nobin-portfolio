import React, { useState, useEffect } from 'react';
import './custom-scrollbar.scss';

const CustomScrollbar = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="progress-bar-container">
        <div 
          className="progress-bar"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>
      {children}
    </>
  );
};

export default CustomScrollbar;