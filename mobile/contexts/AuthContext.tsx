import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider= ({ children }:{children:any}) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  const signIn = () => {
    setAuthenticated(true);
  };

  const signOut = () => {
    setAuthenticated(false);
  };

  // Simulate checking authentication status on mount
  useEffect(() => {
    // Replace this with your actual authentication check logic
    const checkAuthentication = () => {
      // Example: Check if the user is authenticated from some authentication service
      // For demonstration purposes, we'll assume the user is authenticated initially
    //   setAuthenticated(true);
    setAuthenticated(false)
    };

    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
