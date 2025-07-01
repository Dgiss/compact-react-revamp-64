
import { signUp, confirmSignUp, adminCreateUser, adminSetUserPassword, adminAddUserToGroup, adminDeleteUser, adminUpdateUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { waitForAmplifyConfig } from '@/config/aws-config.js';

const client = generateClient();

export const createUserInCognito = async ({ username, password, email, firstname, lastname }) => {
  await waitForAmplifyConfig();
  
  try {
    console.log('Creating user in Cognito:', { username, email });
    
    // Créer l'utilisateur avec un mot de passe temporaire
    const createUserResponse = await adminCreateUser({
      username,
      userAttributes: {
        email,
        given_name: firstname || '',
        family_name: lastname || '',
        email_verified: 'true'
      },
      temporaryPassword: password,
      messageAction: 'SUPPRESS' // Ne pas envoyer d'email
    });
    
    console.log('User created in Cognito:', createUserResponse);
    
    // Définir le mot de passe permanent
    await adminSetUserPassword({
      username,
      password,
      permanent: true
    });
    
    console.log('Password set for user:', username);
    
    // Ajouter l'utilisateur au groupe admin
    await adminAddUserToGroup({
      username,
      groupName: 'admin'
    });
    
    console.log('User added to admin group:', username);
    
    return {
      success: true,
      userSub: createUserResponse.User.Username,
      username
    };
    
  } catch (error) {
    console.error('Error creating user in Cognito:', error);
    throw new Error(`Erreur lors de la création de l'utilisateur: ${error.message}`);
  }
};

export const updateUserInCognito = async ({ username, email, firstname, lastname, newPassword }) => {
  await waitForAmplifyConfig();
  
  try {
    console.log('Updating user in Cognito:', username);
    
    const attributes = {};
    if (email) attributes.email = email;
    if (firstname) attributes.given_name = firstname;
    if (lastname) attributes.family_name = lastname;
    
    // Mettre à jour les attributs
    if (Object.keys(attributes).length > 0) {
      await adminUpdateUserAttributes({
        username,
        userAttributes: attributes
      });
    }
    
    // Changer le mot de passe si fourni
    if (newPassword) {
      await adminSetUserPassword({
        username,
        password: newPassword,
        permanent: true
      });
    }
    
    console.log('User updated in Cognito:', username);
    return { success: true };
    
  } catch (error) {
    console.error('Error updating user in Cognito:', error);
    throw new Error(`Erreur lors de la mise à jour de l'utilisateur: ${error.message}`);
  }
};

export const deleteUserFromCognito = async (username) => {
  await waitForAmplifyConfig();
  
  try {
    console.log('Deleting user from Cognito:', username);
    
    await adminDeleteUser({
      username
    });
    
    console.log('User deleted from Cognito:', username);
    return { success: true };
    
  } catch (error) {
    console.error('Error deleting user from Cognito:', error);
    throw new Error(`Erreur lors de la suppression de l'utilisateur: ${error.message}`);
  }
};
