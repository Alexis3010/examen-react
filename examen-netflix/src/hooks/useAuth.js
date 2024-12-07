import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const currentUser = localStorage.getItem('usuario'); 
    if (currentUser) {
      setUser(currentUser); 
    }
    setLoading(false);  
  }, []);  

  const login = (e, username, password) => {
    e.preventDefault();

    validarUsuario(username, password)
      .then((usuarioValido) => {
        if (usuarioValido) {
          localStorage.setItem('usuario', username);
          setUser(username);
        } else {
          setError('Usuario o contraseña incorrectos');  
        }
      })
      .catch((error) => {
        console.error('Error de validación', error);
        setError('Hubo un problema al intentar iniciar sesión');
      });
  };

  const logout = () => {
    localStorage.removeItem('usuario'); 
    setUser(null);
  };

  const validarUsuario = (username, password) => {
    return new Promise((resolve, reject) => {
      fetch('/data/usuarios.json')  
        .then((response) => response.json())
        .then((data) => {
          const user = data.users.find(
            (user) => user.username === username && user.password === password
          );
          if (user) {
            resolve(true);  
          } else {
            resolve(false); 
          }
        })
        .catch((error) => {
          reject(error);  
        });
    });
  };

  return { user, loading, error, login, logout };
};
