import React from "react";

export const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(initialState);
  const toggle = () => setIsOpen(v => !v);

  return {isOpen, toggle, setIsOpen};
};
