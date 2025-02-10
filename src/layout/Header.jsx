import { Link } from 'react-router-dom';
import logo from '../assets/astro-logo.png';

export default function Header() {

  return (
    <div className="header-container">
      <Link to="/"><img src={logo} alt="astro-logo" /></Link>
    </div>
  );
}