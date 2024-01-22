// AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
 
    const token = sessionStorage.getItem('token');

    if (token) {
      verifyTokenOnServer(token)
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error('Error verifying token:', error);
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, []);

  const login = (token, userData) => {

    sessionStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
   
    sessionStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

async function verifyTokenOnServer(token) {
  try {
    const response = await fetch('http://localhost:8080/api/verifyToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error('Token verification failed');
    }

    const data = await response.json();
    return data.userData;
  } catch (error) {
    throw error;
  }
}

