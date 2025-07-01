
import { signIn, signOut, getCurrentUser } from 'aws-amplify/auth';

export const signInUser = async (username, password) => {
  try {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    
    if (nextStep.signInStep === 'DONE') {
      // Créer un cookie d'expiration de 2 heures
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 2);
      
      // Stocker dans localStorage pour la session
      localStorage.setItem('alreadyLogged', 'true');
      localStorage.setItem('loginExpiration', expirationDate.getTime().toString());
      
      return { success: true, user: isSignedIn };
    }
    
    return { success: false, error: 'Étape de connexion non terminée' };
  } catch (error) {
    console.error('Erreur de connexion:', error);
    return { 
      success: false, 
      error: error.message || 'Erreur de connexion' 
    };
  }
};

export const signOutUser = async () => {
  try {
    await signOut();
    localStorage.removeItem('alreadyLogged');
    localStorage.removeItem('loginExpiration');
    return { success: true };
  } catch (error) {
    console.error('Erreur de déconnexion:', error);
    return { success: false, error: error.message };
  }
};

export const checkAuthStatus = async () => {
  try {
    const alreadyLogged = localStorage.getItem('alreadyLogged');
    const loginExpiration = localStorage.getItem('loginExpiration');
    
    if (!alreadyLogged || !loginExpiration) {
      return { isAuthenticated: false };
    }
    
    // Vérifier l'expiration
    const now = new Date().getTime();
    if (now > parseInt(loginExpiration)) {
      localStorage.removeItem('alreadyLogged');
      localStorage.removeItem('loginExpiration');
      return { isAuthenticated: false };
    }
    
    const user = await getCurrentUser();
    return { isAuthenticated: true, user };
  } catch (error) {
    console.error('Erreur de vérification du statut:', error);
    localStorage.removeItem('alreadyLogged');
    localStorage.removeItem('loginExpiration');
    return { isAuthenticated: false };
  }
};

export const getCurrentUserInfo = async () => {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (error) {
    console.error('Erreur de récupération utilisateur:', error);
    return null;
  }
};
