import { useState, useEffect, useRef, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { useModalConfig } from "../contexts/ModalConfigContext";
import { useModal } from "../contexts/ModalContext";
import Contact from "../components/iterables/Contact";
import ComboPost from "../components/iterables/ComboPost";
import ComboUser from "../components/iterables/ComboUser";
import Delete from "../components/iterables/Delete";
import { AuthContext } from "../contexts/AuthContext";
import { profile } from "../assets/img";


export default function Navbar() {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const { updateConfig } = useModalConfig();
  const { openModal } = useModal();

  useEffect(() => {
    const handlePageClick = (event) => {
      (dropdownRef.current && !dropdownRef.current.contains(event.target)) && setIsOpen(false);
    }

    document.addEventListener('mousedown', handlePageClick);
    return () => document.removeEventListener('mousedown', handlePageClick);
  }, []);

  const handleClick = (e) => {
    const type = e.target.getAttribute('data-type')
    updateConfig({ type });

    switch(type){
      case "contact":
        openModal(<Contact />);
        break;
      case "create":
        openModal(<ComboPost data={{}} />);
        break;
      case "logout":
        openModal(<Delete data={{}} />);
        break;
      case "login":
      case "register":
        openModal(<ComboUser />);
        break;
      default:
        return;
    }
  }

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
            {isAuthenticated ?
              <>
                <Link className="dropdown-list-item" to={`/users/${user.id}`}>Profile</Link>
                <li className="dropdown-list-item" data-type="create" onClick={handleClick}>Create Post</li>
                <li className="dropdown-list-item" data-type="logout" onClick={handleClick}>Logout</li>
              </>
              :
              <>
                <li className="dropdown-list-item" data-type="login" onClick={handleClick}>Login</li>
                <li className="dropdown-list-item" data-type="register" onClick={handleClick}>Register</li>
              </>
            }
            <li className="dropdown-list-item" data-type="contact" onClick={handleClick}>Contact</li>
          </ul>
        }
      </div>
      
      <form>
        <input name="search" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-sm px-3 btn-outline-secondary" type="submit">Search</button>
      </form>
    </div>
  );
}