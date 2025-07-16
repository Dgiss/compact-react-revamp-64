
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { configureAmplify } from './config/aws-config.js'

// Configurer Amplify au démarrage avec vérification
const initializeApp = async () => {
  console.log('Initialisation de l\'application...');
  
  try {
    await configureAmplify();
    console.log('Configuration Amplify réussie');
  } catch (error) {
    console.error('Échec de la configuration Amplify:', error);
    // Afficher une erreur à l'utilisateur mais continuer l'initialisation
    document.body.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial;">
        <div style="text-align: center;">
          <h2>Erreur de configuration</h2>
          <p>Une erreur s'est produite lors de l'initialisation de l'application.</p>
          <button onclick="location.reload()" style="padding: 10px 20px; margin-top: 10px;">Réessayer</button>
        </div>
      </div>
    `;
    return;
  }
  
  console.log('Application prête à démarrer');
  createRoot(document.getElementById("root")!).render(<App />);
};

initializeApp();
