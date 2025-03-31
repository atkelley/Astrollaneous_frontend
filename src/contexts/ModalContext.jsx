import React, { createContext, useState, useContext } from "react";
import Modal from "../components/common/Modal";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => setModalContent(content);
  const closeModal = () => setModalContent(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalContent && <Modal>{modalContent}</Modal>}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);