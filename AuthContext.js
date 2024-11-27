import React, { createContext, useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // Korisnik je prijavljen
      } else {
        setIsLoggedIn(false); // Korisnik je odjavljen
      }
    });

    return unsubscribe; // Očisti listener kad komponenta unmounta
  }, []);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
