import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from "prop-types";
import profile from '../assets/img/profile.png';

export default function Navbar({ sendModalData }) {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handlePageClick = (event) => {
      (dropdownRef.current && !dropdownRef.current.contains(event.target)) && setIsOpen(false);
    }

    document.addEventListener('mousedown', handlePageClick);
    return () => document.removeEventListener('mousedown', handlePageClick);
  }, []);

  return (
    <div className="nav">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')} >Home</NavLink>
      <NavLink to="/mars" className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')} >Mars</NavLink>
      <NavLink to="/rovers" className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')} >Rovers</NavLink>
      <NavLink to="/satellites" className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')} >Satellites</NavLink>
      <NavLink to="/nasa" className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')} >NASA</NavLink>
      <NavLink to="/techport" className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')} >TechPort</NavLink>
      <NavLink to="/about" className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')} >About</NavLink>
      <NavLink to="/blog" className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')} >Blog</NavLink>

      <div className="dropdown" ref={dropdownRef}>
        <img src={profile} alt="profile icon" onMouseOver={() => setIsOpen(true)} />
         
        {isOpen &&
          <ul className="dropdown-list" onMouseLeave={() => setIsOpen(false)}>
            { !isAuthenticated ?
              <>
                <li className="dropdown-list-item" onClick={() => sendModalData({ type: "login" })}>Login</li>
                <li className="dropdown-list-item" onClick={() => sendModalData({ type: "register" })}>Register</li>
              </>
              :
              <>
                <li className="dropdown-list-item" onClick={() => sendModalData({ type: "create" })}>Create Post</li>
                <li className="dropdown-list-item" onClick={() => sendModalData({ type: "logout" })}>Logout</li>
              </>
            }
            <li className="dropdown-list-item" onClick={() => sendModalData({ type: "contact" })}>Contact</li>
          </ul>
        }
      </div>
      
      <form>
        <input type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-sm px-3 btn-outline-secondary" type="submit">Search</button>
      </form>
    </div>
  );
}

Navbar.propTypes = {
  sendModalData: PropTypes.func
};