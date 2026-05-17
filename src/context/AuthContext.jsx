import { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/users';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('hospitalUser');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('hospitalUser');
      }
    }
  }, []);

  const login = (email, password) => {
    const found = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      const userData = { ...found };
      delete userData.password;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('hospitalUser', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const signup = (data) => {
    const exists = mockUsers.find((u) => u.email === data.email);
    if (exists) {
      return { success: false, message: 'Email already registered' };
    }
    const newUser = {
      id: Date.now(),
      fullName: data.fullName,
      email: data.email,
      role: data.role || 'Nurse',
      avatar: null,
      phone: '',
      department: '',
      joinDate: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('hospitalUser', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('hospitalUser');
  };



  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
