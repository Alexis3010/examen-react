import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';  

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user') || null);

  const login = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    
    if (username && password) {
      setUser(username);
      localStorage.setItem('user', username);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,  
};
