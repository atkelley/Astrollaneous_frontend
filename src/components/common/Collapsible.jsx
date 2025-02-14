import { useRef, useState } from "react";
import PropTypes from 'prop-types';
import arrow_down from "../../assets/arrow_down.png";
import arrow_up from "../../assets/arrow_up.png";

export default function Collapsible({ title, children }) {
  const contentRef = useRef(null);
  const [isContentOpen, setIsContentOpen] = useState(false);

  return (
    <div className="collapsible">
      <div className="collapsible-top">
        <h1>{title}</h1>
        <img src={isContentOpen ? arrow_up : arrow_down} alt={isContentOpen ? "Arrow Up" : "Arrow Down"} onClick={() => setIsContentOpen(!isContentOpen)} />
      </div>
      <div ref={contentRef} className="collapsible-body" style={{ 'display': isContentOpen ? 'block' : 'none' }}>
        {isContentOpen && <><hr /> {children} </>}
      </div>
    </div>
  );
}

Collapsible.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};