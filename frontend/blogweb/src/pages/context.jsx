import React, { createContext, useState, useContext,useEffect } from 'react';

// Create a Context
const MyContext = createContext();

// Create a Context Provider component
export const MyContextProvider = ({ children }) => {
 
    const [islogin, setislogin] = useState(() => JSON.parse(localStorage.getItem('islogin')) || false);
    const [user, setuser] = useState(() => localStorage.getItem('user') || '');


  useEffect(() => {
    localStorage.setItem('islogin', JSON.stringify(islogin));
    localStorage.setItem('user', user);

  }, [islogin,user]);
  
  const contextValue = {
    islogin,
    setislogin,
    user,
    setuser,
  };

  return (
    <MyContext.Provider value={contextValue} >
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to use the context
export const useMyContext = () => useContext(MyContext);
