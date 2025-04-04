import PropTypes from "prop-types";
import { useModal } from '../../contexts/ModalContext';

export default function Image({ data }) {
  const { src, alt, caption } = data;
  const { closeModal } = useModal();

  return (
    <div className="image-box">
      <img src={src} alt={alt} />

      <div className="text-box">
        <p>{caption}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  )
}

Image.propTypes = {
  data: PropTypes.object
};