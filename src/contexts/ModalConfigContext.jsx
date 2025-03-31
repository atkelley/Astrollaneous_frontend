import React, { createContext, useState, useContext } from "react";

const ModalConfigContext = createContext();

export const ModalConfigProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState({ type: "" });

  const updateConfig = (newConfig) => {
    setModalConfig((prevConfig) => ({ ...prevConfig, ...newConfig }));
  };

  return (
    <ModalConfigContext.Provider value={{ modalConfig, updateConfig }}>
      {children}
    </ModalConfigContext.Provider>
  );
};

export const useModalConfig = () => useContext(ModalConfigContext);
