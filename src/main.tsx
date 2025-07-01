
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { configureAmplify } from './config/aws-config.js'

// Configurer Amplify au démarrage
configureAmplify();

createRoot(document.getElementById("root")!).render(<App />);
