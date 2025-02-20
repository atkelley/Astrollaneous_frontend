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
    <ul className="nav">
      <li className="nav-list-item"><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
      <li className="nav-list-item"><NavLink to="/mars" className={({ isActive }) => (isActive ? 'active' : '')}>Mars</NavLink></li>
      <li className="nav-list-item"><NavLink to="/rovers" className={({ isActive }) => (isActive ? 'active' : '')}>Rovers</NavLink></li>
      <li className="nav-list-item"><NavLink to="/satellites" className={({ isActive }) => (isActive ? 'active' : '')}>Satellites</NavLink></li>
      <li className="nav-list-item"><NavLink to="/nasa" className={({ isActive }) => (isActive ? 'active' : '')}>NASA</NavLink></li>
      <li className="nav-list-item"><NavLink to="/techport" className={({ isActive }) => (isActive ? 'active' : '')}>TechPort</NavLink></li>
      <li className="nav-list-item"><NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink></li>
      <li className="nav-list-item"><NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink></li>
      <li className="nav-list-item"><NavLink to="/blog" className={({ isActive }) => (isActive ? 'active' : '')}>Blog</NavLink></li>

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
    </ul>
  );
}