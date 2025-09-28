import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-scroll';
import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        <Link to="home" className="navbar-logo" onClick={closeMobileMenu} smooth={true} duration={500}>
          <span>Aryan Khanal</span>
        </Link>

        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="home" className="nav-links" onClick={closeMobileMenu} smooth={true} duration={500} spy={true} exact="true" offset={-80}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="about" className="nav-links" onClick={closeMobileMenu} smooth={true} duration={500} spy={true} exact="true" offset={-80}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="projects" className="nav-links" onClick={closeMobileMenu} smooth={true} duration={500} spy={true} exact="true" offset={-80}>
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link to="contact" className="nav-links" onClick={closeMobileMenu} smooth={true} duration={500} spy={true} exact="true" offset={-80}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;