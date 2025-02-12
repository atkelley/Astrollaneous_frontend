import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Modal ({ imgSrc, imgAlt, imgCaption }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (imgSrc && imgAlt && imgCaption) {
      dialogRef.current.showModal();
    }
  });

  useEffect(() => {
    const closeModal = (event) => {
      if (!event.target.contains(dialogRef.current)) return;
      dialogRef.current.close();
    }

    document.addEventListener('click', closeModal);
    return () => document.removeEventListener('click', closeModal);
  }, [])

  return (
    <dialog ref={dialogRef} className="dialog">
      <div className="dialog-box">
        <div className="image-box">
          <img src={imgSrc} alt={imgAlt} />
        </div>
        
        <div className="text-box">
          <p>{imgCaption}</p>
          <button onClick={() => dialogRef.current.close()}>Close</button>
        </div>
      </div>
    </dialog>
  );
};

Modal.propTypes = {
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  imgCaption: PropTypes.string,
};