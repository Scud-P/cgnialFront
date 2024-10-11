// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-center py-3">
      <p className="mb-0">&copy; {new Date().getFullYear()} ScudCreations</p>
    </footer>
  );
};

export default Footer;