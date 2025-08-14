
import { Amplify } from 'aws-amplify';
import { getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';

const awsConfig = {
  aws_project_region: "eu-west-3",
  aws_cloud_logic_custom: [
    {
      name: "AdminQueries",
      endpoint: "https://j49tvrfjf1.execute-api.eu-west-3.amazonaws.com/fwatcher",
      region: "eu-west-3"
    }
  ],
  aws_appsync_graphqlEndpoint: "https://77e55jvfordw5c6tb5bmh6loiq.appsync-api.eu-west-3.amazonaws.com/graphql",
  aws_appsync_region: "eu-west-3",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  aws_appsync_apiKey: "da2-madtpj74mjallnjpbhca7owzym",
  aws_cognito_identity_pool_id: "eu-west-3:5fdebe79-865b-40ec-8de0-f0b04dbbae29",
  aws_cognito_region: "eu-west-3",
  aws_user_pools_id: "eu-west-3_K0BoxUFkS",
  aws_user_pools_web_client_id: "1bg4vbumtfgjmro8n65ce4c859",
  oauth: {},
  aws_cognito_username_attributes: [],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: [],
  aws_cognito_mfa_configuration: "OFF",
  aws_cognito_mfa_types: ["SMS"],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: []
  },
  aws_cognito_verification_mechanisms: ["PHONE_NUMBER"]
};

let isConfigured = false;
let configurationPromise = null;

export const configureAmplify = () => {
  if (configurationPromise) {
    return configurationPromise;
  }

  configurationPromise = new Promise((resolve, reject) => {
    try {
      console.log('Configuration d\'Amplify en cours...');
      
      // Configuration synchrone d'Amplify
      Amplify.configure(awsConfig);
      
      // Délai plus long pour s'assurer que la configuration est complètement appliquée
      setTimeout(() => {
        try {
          // Vérifier que la configuration est bien active
          const config = Amplify.getConfig();
          if (config && config.API && config.API.GraphQL) {
            isConfigured = true;
            console.log('Amplify configuré avec succès');
            resolve(true);
          } else {
            console.error('Configuration Amplify incomplète');
            reject(new Error('Configuration Amplify incomplète'));
          }
        } catch (err) {
          console.error('Erreur lors de la vérification de la configuration:', err);
          reject(err);
        }
      }, 500);
      
    } catch (error) {
      console.error('Erreur lors de la configuration d\'Amplify:', error);
      isConfigured = false;
      reject(error);
    }
  });

  return configurationPromise;
};

export const isAmplifyConfigured = () => {
  return isConfigured;
};

export const waitForAmplifyConfig = async () => {
  if (isConfigured) {
    return true;
  }
  
  if (configurationPromise) {
    try {
      const result = await configurationPromise;
      // Add extra verification after config
      await new Promise(resolve => setTimeout(resolve, 100));
      return result;
    } catch (error) {
      console.error('Erreur lors de l\'attente de la configuration:', error);
      // Reset promise to allow retry
      configurationPromise = null;
      isConfigured = false;
      throw error;
    }
  }
  
  const result = await configureAmplify();
  // Extra delay to ensure full initialization
  await new Promise(resolve => setTimeout(resolve, 200));
  return result;
};

// Vérifier si l'utilisateur a des credentials valides
export const ensureCredentials = async () => {
  try {
    await waitForAmplifyConfig();
    const user = await getCurrentUser();
    return !!user;
  } catch (error) {
    console.warn('Aucun utilisateur authentifié trouvé:', error);
    return false;
  }
};

// Fonction de retry pour les requêtes avec gestion des credentials
export const withCredentialRetry = async (operation, maxRetries = 2) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Vérifier les credentials avant chaque tentative
      const hasCredentials = await ensureCredentials();
      if (!hasCredentials) {
        throw new Error('Utilisateur non authentifié - veuillez vous reconnecter');
      }
      
      return await operation();
    } catch (error) {
      // Log the original error for debugging before transforming it
      console.error(`Tentative ${attempt}/${maxRetries} - Erreur originale:`, {
        message: error.message,
        code: error.code,
        name: error.name,
        errors: error.errors,
        stack: error.stack
      });
      
      console.warn(`Tentative ${attempt}/${maxRetries} échouée:`, error.message);
      
      if (error.message?.includes('NoCredentials') || error.message?.includes('No credentials')) {
        if (attempt < maxRetries) {
          console.log('Nouvelle tentative avec attente...');
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          continue;
        }
        throw new Error('Erreur d\'authentification - veuillez vous reconnecter');
      }
      
      // For GraphQL errors, preserve more detail
      if (error.errors && Array.isArray(error.errors)) {
        const graphqlError = new Error(`GraphQL Error: ${error.errors.map(e => e.message).join(', ')}`);
        graphqlError.originalError = error;
        graphqlError.errors = error.errors;
        throw graphqlError;
      }
      
      // Pour les autres erreurs, ne pas retry mais préserver l'erreur originale
      throw error;
    }
  }
};

// Helpers GraphQL - création paresseuse du client
let graphQLClient = null;

export const getGraphQLClient = async () => {
  await waitForAmplifyConfig();
  if (!graphQLClient) {
    graphQLClient = generateClient({ authMode: 'userPool' });
  }
  return graphQLClient;
};

// Wrapper paresseux conservant l'API client.graphql existante
export const getLazyClient = () => ({
  graphql: (params) => getGraphQLClient().then(c => c.graphql(params))
});

export default awsConfig;
