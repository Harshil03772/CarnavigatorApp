import React from 'react';
import '../CSS/footer.css'; // Make sure to style this appropriately.
import img from '../img/logo.png';
import part1 from '../img/part1.png.svg';
import part2 from '../img/part2.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={img} alt="Logo" />
      </div>
      <div className="footer-links">
        <div className="company-info">
          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="social-media">
          <ul>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div className="partner-logos">
          <img src={part1} alt="Partner 1" />
          <img src={part2} alt="Partner 2" />
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 CarNavigator, All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
