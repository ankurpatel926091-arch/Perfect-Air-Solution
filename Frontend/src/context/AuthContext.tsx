import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userEmail: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

export const UserAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('userToken');
  });
  
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('userEmail');
  });

  const login = async (email: string, pass: string) => {
    try {
      const response = { token: "static-user-token", user: email.split('@')[0] || "User" };
      if (response?.token) {
        setIsAuthenticated(true);
        setUserEmail(response.user);
        localStorage.setItem('userToken', response.token);
        localStorage.setItem('userEmail', response.user);
        return true;
      }
      return false;
    } catch (err: any) {
      console.error("Login failed:", err);
      toast.error(err.message || 'Invalid email or password');
      return false;
    }
  };

  const register = async (name: string, email: string, pass: string) => {
    try {
      const response = { token: "static-user-token", user: name || "User" };
      if (response?.token) {
        setIsAuthenticated(true);
        setUserEmail(response.user);
        localStorage.setItem('userToken', response.token);
        localStorage.setItem('userEmail', response.user);
        return true;
      }
      return false;
    } catch (err: any) {
      console.error("Registration failed:", err);
      toast.error(err.message || 'Failed to create account');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(AuthContext);
