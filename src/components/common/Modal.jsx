import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Modal ({ media_type, src, alt, caption, closeModal, showModal }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showModal && modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showModal, closeModal]);

  const getImageComponent = () => {
    return (
      <div className="image-box">
        <img src={src} alt={alt} />

        <div className="text-box">
          <p>{caption}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    );
  }

  const getVideoComponent = () => {
    return (
      <video id="video" width="840" height="auto" controls autoPlay>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video> 
    );
  }

  return (
    <div className='backdrop'>
      <div ref={modalRef} className="modal"> 
        {media_type === "image" && getImageComponent()}
        {media_type === "video" && getVideoComponent()}
      </div>
    </div>
  );
};

Modal.propTypes = {
  media_type: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  caption: PropTypes.string,
  closeModal: PropTypes.func,
  showModal: PropTypes.bool
};