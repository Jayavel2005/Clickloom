import { createContext, useContext, useState } from "react";

const UIContext = createContext(null);

export const UIContextProvider = ({ children }) => {
  const [accountIsOpen, setAccountIsOpen] = useState(false);

  const toggleUI = () => {
    setAccountIsOpen((prev) => !prev);
  };
  return (
    <UIContext.Provider value={{ accountIsOpen, setAccountIsOpen, toggleUI }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
