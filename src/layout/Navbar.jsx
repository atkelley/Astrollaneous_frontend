import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import user from '../assets/img/user.png';

export default function Navbar() {
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
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
      <NavLink to="/mars" className={({ isActive }) => (isActive ? 'active' : '')}>Mars</NavLink>
      <NavLink to="/rovers" className={({ isActive }) => (isActive ? 'active' : '')}>Rovers</NavLink>
      <NavLink to="/satellites" className={({ isActive }) => (isActive ? 'active' : '')}>Satellites</NavLink>
      <NavLink to="/nasa" className={({ isActive }) => (isActive ? 'active' : '')}>NASA</NavLink>
      <NavLink to="/techport" className={({ isActive }) => (isActive ? 'active' : '')}>TechPort</NavLink>
      <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
      <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink>
      <NavLink to="/blog" className={({ isActive }) => (isActive ? 'active' : '')}>Blog</NavLink>

      <div className="dropdown" ref={dropdownRef}>
        <img src={user} alt="user" onMouseOver={() => setIsOpen(true)} />
         
        {isOpen &&
          <ul className="dropdown-list" onMouseLeave={() => setIsOpen(false)}>
            { !isAuthenticated ?
              <>
                <li className="dropdown-list-item">Login</li>
                <li className="dropdown-list-item">Register</li>
              </>
              :
              <>
                <li className="dropdown-list-item">Create Post</li>
                <li className="dropdown-list-item">Logout</li>
              </>
            }
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