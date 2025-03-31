import React, { useRef, useEffect } from "react";
import { useModalConfig } from "../../contexts/ModalConfigContext";
import { useModal } from "../../contexts/ModalContext";


export default function Modal({ children }) {
  const modalRef = useRef(null);
  const { modalConfig: { type } } = useModalConfig();
  const { closeModal } = useModal();
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeModal]);

  return (
    <div className='backdrop'>
      <div ref={modalRef} className="modal"> 
        {React.cloneElement(children)}
      </div>
    </div>
  );
};
