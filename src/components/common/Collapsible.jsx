import { useRef, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import arrow_down from "../../assets/img/arrow_down.png";
import arrow_up from "../../assets/img/arrow_up.png";

export default function Collapsible({ type, title, children, selectedType }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState('0px');
  const [isContentOpen, setIsContentOpen] = useState(false);

  useEffect(() => {
    if (type) {
      setIsContentOpen(selectedType === type);
    }
  }, [type, selectedType]);

  useEffect(() => {
    setHeight(isContentOpen ? '500px' : '0px');
  }, [isContentOpen])

  return (
    <div className="collapsible">
      <div className="collapsible-top" onClick={() => setIsContentOpen(!isContentOpen)}>
        <h1>{title ? title : type}</h1>
        <img src={isContentOpen ? arrow_up : arrow_down} alt={isContentOpen ? "Arrow Up" : "Arrow Down"} />
      </div>
      <div ref={contentRef} className="collapsible-body" style={{ maxHeight: height }}>
        <><hr /> {children}</>
      </div>
    </div>
  );
}

Collapsible.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  selectedType: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};