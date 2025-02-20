import { Link } from 'react-router-dom';
import astrollaneous_logo from '../assets/img/astrollaneous_logo.png';

export default function Header() {

  return (
    <div className="header-container">
      <Link to="/"><img src={astrollaneous_logo} alt="Astrollaneous logo" /></Link>
    </div>
  );
}