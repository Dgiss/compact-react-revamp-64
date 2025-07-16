
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { configureAmplify } from './config/aws-config.js'
import { QueryProvider } from './providers/QueryProvider.tsx'

// Configurer Amplify au démarrage avec vérification
const initializeApp = async () => {
  console.log('Initialisation de l\'application...');
  
  const configSuccess = configureAmplify();
  if (!configSuccess) {
    console.error('Échec de la configuration Amplify');
  }
  
  // Attendre un petit délai pour s'assurer que la configuration est appliquée
  await new Promise(resolve => setTimeout(resolve, 100));
  
  console.log('Application prête à démarrer');
  createRoot(document.getElementById("root")!).render(
    <QueryProvider>
      <App />
    </QueryProvider>
  );
};

initializeApp();
