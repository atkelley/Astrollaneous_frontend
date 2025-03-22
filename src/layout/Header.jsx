import { Link } from 'react-router-dom';
import { shuttle } from '../assets/img';

export default function Header() {

  return (
    <Link to="/">
      <div className="header-container">
        <img src={shuttle} alt="Astrollaneous logo" />
        <div className="header-text-box">
          <p className="header-text-box-title">ASTROLLANEOUS</p>
          <p className="header-text-box-subtitle">An Assortment Of All Things Space-Related</p>
        </div>
      </div>
    </Link>
  );
}