import { useState } from "react";

const useApp = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return { showLogin, setShowLogin, showRegister, setShowRegister };
};

export default useApp;
