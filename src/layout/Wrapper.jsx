import PropTypes from 'prop-types';
import Space from '../assets/img/space.jpg';

export default function Wrapper({ children }) {

  return (
    <div className="wrapper" style={{ backgroundImage: `url(${Space})` }}>
      {children}
    </div>
  );
}

Wrapper.propTypes = {
  children: PropTypes.object,
};