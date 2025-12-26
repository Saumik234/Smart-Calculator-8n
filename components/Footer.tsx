import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card shadow-inner mt-auto">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-text-secondary">
        <div className="flex justify-center items-center space-x-4 md:space-x-6 mb-4 flex-wrap">
          <Link to="/about" className="text-sm hover:text-primary transition-colors">About Us</Link>
          <Link to="/terms" className="text-sm hover:text-primary transition-colors">Terms & Conditions</Link>
          <Link to="/privacy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/contact" className="text-sm hover:text-primary transition-colors">Contact Us</Link>
          <Link to="/disclaimer" className="text-sm hover:text-primary transition-colors">Disclaimer</Link>
        </div>
        <p className="text-xs">&copy; {new Date().getFullYear()} Smart Calculator 8n. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;