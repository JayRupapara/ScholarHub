import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <span className="footer-title">ScholarHub</span>
          <p className="mt-2">
            Connecting students with opportunities for a brighter future.
          </p>
        </div>
        
        <div>
          <span className="footer-title">Quick Links</span>
          <ul className="menu menu-vertical">
            <li><Link to="/search">Find Scholarships</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <span className="footer-title">Resources</span>
          <ul className="menu menu-vertical">
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/guides">Guides</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>
        
        <div>
          <span className="footer-title">Legal</span>
          <ul className="menu menu-vertical">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer footer-center p-4 bg-base-300 text-base-content">
        <p>© {new Date().getFullYear()} ScholarHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 