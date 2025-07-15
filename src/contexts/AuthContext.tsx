
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { checkAuthStatus, getCurrentUserInfo, forceSignOut } from '@/services/AuthService';

interface User {
  username: string;
  userId: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  sessionExpired: boolean;
  login: (user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
  forceLogout: () => Promise<void>;
  clearSessionExpired: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  const checkAuth = async () => {
    try {
      console.log('AuthContext: Vérification de l\'authentification...');
      const { isAuthenticated: authStatus, user: authUser } = await checkAuthStatus();
      
      console.log('AuthContext: Statut auth:', authStatus);
      setIsAuthenticated(authStatus);
      
      if (authStatus && authUser) {
        const userData = {
          username: authUser.username,
          userId: authUser.userId || authUser.username
        };
        setUser(userData);
        console.log('AuthContext: Utilisateur défini:', userData.username);
      } else {
        setUser(null);
        console.log('AuthContext: Aucun utilisateur');
      }
    } catch (error) {
      console.error('AuthContext: Erreur de vérification auth:', error);
      setIsAuthenticated(false);
      setUser(null);
      
      // Vérifier si c'est une expiration de session
      const isSessionExpired = error.message?.includes('Session expirée') ||
                              error.message?.includes('not authenticated') ||
                              error.name === 'NotAuthorizedException';
      
      if (isSessionExpired) {
        console.log('AuthContext: Session expirée détectée');
        setSessionExpired(true);
      }
      
      // En cas d'erreur, nettoyer complètement
      try {
        await forceSignOut();
      } catch (cleanupError) {
        console.error('AuthContext: Erreur de nettoyage:', cleanupError);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = (userData: User) => {
    console.log('AuthContext: Connexion utilisateur:', userData.username);
    setIsAuthenticated(true);
    setUser(userData);
    setSessionExpired(false);
  };

  const logout = () => {
    console.log('AuthContext: Déconnexion utilisateur');
    setIsAuthenticated(false);
    setUser(null);
    setSessionExpired(false);
  };

  const clearSessionExpired = () => {
    setSessionExpired(false);
  };

  const forceLogout = async () => {
    try {
      console.log('AuthContext: Déconnexion forcée...');
      await forceSignOut();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('AuthContext: Erreur lors de la déconnexion forcée:', error);
      // Forcer la déconnexion côté client même si l'API échoue
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    user,
    loading,
    sessionExpired,
    login,
    logout,
    checkAuth,
    forceLogout,
    clearSessionExpired
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
