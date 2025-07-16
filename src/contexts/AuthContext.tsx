
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
  login: (user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
  forceLogout: () => Promise<void>;
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

  const checkAuth = async () => {
    try {
      console.log('AuthContext: Vérification de l\'authentification...');
      
      // Attendre que la configuration Amplify soit complète
      const { waitForAmplifyConfig } = await import('@/config/aws-config.js');
      await waitForAmplifyConfig();
      console.log('AuthContext: Configuration Amplify confirmée');
      
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
  };

  const logout = () => {
    console.log('AuthContext: Déconnexion utilisateur');
    setIsAuthenticated(false);
    setUser(null);
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
    login,
    logout,
    checkAuth,
    forceLogout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
