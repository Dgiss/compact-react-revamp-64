import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig } from '@/config/aws-config.js';
import * as CognitoService from './CognitoService';

const client = generateClient();

export const fetchCompanies = async () => {
  await waitForAmplifyConfig();
  let allItems = [];
  let nextToken = null;
  
  do {
    const variables = {
      limit: 4000,
      nextToken: nextToken
    };
    
    const companyList = await client.graphql({
      query: queries.listCompanies,
      variables: variables
    });
    
    const data = companyList.data.listCompanies;
    allItems = allItems.concat(data.items);
    nextToken = data.nextToken;
    
  } while (nextToken);
  
  return allItems;
};

export const fetchFilteredCompanies = async (searchName, searchEmail, searchSiret) => {
  await waitForAmplifyConfig();
  let filtersArray = [];
  
  if (searchSiret && searchSiret.trim()) {
    filtersArray.push({ siret: { contains: searchSiret.trim() } });
  }
  
  if (searchName && searchName.trim()) {
    filtersArray.push({ name: { contains: searchName.trim() } });
  }
  
  if (searchEmail && searchEmail.trim()) {
    filtersArray.push({ email: { contains: searchEmail.trim() } });
  }
  
  if (filtersArray.length === 0) {
    throw new Error("Veuillez saisir au moins un critère de recherche");
  }

  let nextToken = null;
  let allCompanies = [];

  const variables = {
    limit: 6000, 
    filter: {
      or: filtersArray
    }
  };

  do {
    const queryVariables = { ...variables, nextToken };

    const res = await client.graphql({
      query: queries.listCompanies,
      variables: queryVariables
    });

    const fetchedCompanies = res.data.listCompanies.items;
    allCompanies = [...allCompanies, ...fetchedCompanies];
    nextToken = res.data.listCompanies.nextToken;
  } while (nextToken); 

  return allCompanies;
};

export const createCompanyWithUser = async ({ companyData, userData }) => {
  await waitForAmplifyConfig();
  
  let createdCompany = null;
  let createdCognitoUser = null;
  
  try {
    console.log('Creating company with user:', { companyData, userData });
    
    // Étape 1: Créer l'entreprise dans GraphQL
    const companyInput = {
      name: companyData.name,
      address: companyData.address || '',
      email: companyData.email || '',
      contact: companyData.contact || '',
      mobile: companyData.mobile || '',
      siret: companyData.siret || '',
      city: companyData.city || ''
    };
    
    const companyResult = await client.graphql({
      query: mutations.createCompany,
      variables: { input: companyInput }
    });
    
    createdCompany = companyResult.data.createCompany;
    console.log('Company created in GraphQL:', createdCompany);
    
    // Étape 2: Créer l'utilisateur dans Cognito
    const cognitoUserData = {
      username: userData.username,
      password: userData.password,
      email: userData.email || companyData.email,
      firstname: userData.firstname || '',
      lastname: userData.lastname || ''
    };
    
    const cognitoResult = await CognitoService.createUserInCognito(cognitoUserData);
    createdCognitoUser = cognitoResult;
    console.log('User created in Cognito:', cognitoResult);
    
    // Étape 3: Créer l'utilisateur dans GraphQL avec la référence à l'entreprise
    const userInput = {
      id: cognitoResult.userSub,
      username: userData.username,
      email: userData.email || companyData.email,
      firstname: userData.firstname || '',
      lastname: userData.lastname || '',
      phone: userData.phone || companyData.mobile || '',
      role: 'Admin',
      password: userData.password,
      companyUsersId: createdCompany.id
    };
    
    const userResult = await client.graphql({
      query: mutations.createUser,
      variables: { input: userInput }
    });
    
    console.log('User created in GraphQL:', userResult.data.createUser);
    
    return {
      success: true,
      company: createdCompany,
      user: userResult.data.createUser,
      cognitoUser: createdCognitoUser
    };
    
  } catch (error) {
    console.error('Error in createCompanyWithUser:', error);
    
    // Rollback en cas d'erreur
    try {
      if (createdCognitoUser && createdCognitoUser.username) {
        console.log('Rolling back Cognito user creation...');
        await CognitoService.deleteUserFromCognito(createdCognitoUser.username);
      }
      
      if (createdCompany && createdCompany.id) {
        console.log('Rolling back company creation...');
        await client.graphql({
          query: mutations.deleteCompany,
          variables: { input: { id: createdCompany.id } }
        });
      }
    } catch (rollbackError) {
      console.error('Error during rollback:', rollbackError);
    }
    
    throw error;
  }
};

export const updateCompanyData = async (data) => {
  await waitForAmplifyConfig();
  const companyDetails = {
    id: data.id,
    name: data.name,
    address: data.address,
    email: data.email,
    contact: data.contact,
    mobile: data.mobile,
    siret: data.siret,
  };

  await client.graphql({
    query: mutations.updateCompany,
    variables: {
      input: companyDetails
    }
  });
};

export const updateCompanyAndUser = async ({ companyData, userData, userCognitoData }) => {
  await waitForAmplifyConfig();
  
  try {
    console.log('Updating company and user:', { companyData, userData, userCognitoData });
    
    // Mettre à jour l'entreprise
    if (companyData) {
      await updateCompanyData(companyData);
    }
    
    // Mettre à jour l'utilisateur dans GraphQL
    if (userData && userData.id) {
      const userInput = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
        phone: userData.phone,
        role: userData.role || 'Admin'
      };
      
      await client.graphql({
        query: mutations.updateUser,
        variables: { input: userInput }
      });
    }
    
    // Mettre à jour l'utilisateur dans Cognito
    if (userCognitoData && userCognitoData.username) {
      await CognitoService.updateUserInCognito(userCognitoData);
    }
    
    return { success: true };
    
  } catch (error) {
    console.error('Error updating company and user:', error);
    throw error;
  }
};

export const deleteCompanyData = async (item) => {
  await waitForAmplifyConfig();
  const companyDetails = {
    id: item.id
  };

  await client.graphql({
    query: mutations.deleteCompany,
    variables: { input: companyDetails }
  });
};

export const deleteCompanyAndUser = async (company) => {
  await waitForAmplifyConfig();
  
  try {
    console.log('Deleting company and associated users:', company);
    
    // Récupérer les utilisateurs de l'entreprise
    const users = company.users?.items || [];
    
    // Supprimer chaque utilisateur de Cognito et GraphQL
    for (const user of users) {
      try {
        // Supprimer de Cognito
        if (user.username) {
          await CognitoService.deleteUserFromCognito(user.username);
        }
        
        // Supprimer de GraphQL
        await client.graphql({
          query: mutations.deleteUser,
          variables: { input: { id: user.id } }
        });
        
      } catch (userError) {
        console.error(`Error deleting user ${user.username}:`, userError);
        // Continuer même si un utilisateur échoue
      }
    }
    
    // Supprimer l'entreprise
    await deleteCompanyData(company);
    
    return { success: true };
    
  } catch (error) {
    console.error('Error deleting company and users:', error);
    throw error;
  }
};

export const fetchCompaniesWithUsers = async () => {
  try {
    console.log('Starting fetchCompaniesWithUsers...');
    await waitForAmplifyConfig();
    
    let allCompanies = [];
    let nextToken = null;
    
    // Fetch companies first
    do {
      const variables = {
        limit: 4000,
        nextToken: nextToken
      };
      
      console.log('Fetching companies with variables:', variables);
      
      const companyList = await client.graphql({
        query: queries.listCompanies,
        variables: variables
      });
      
      const data = companyList.data.listCompanies;
      allCompanies = allCompanies.concat(data.items);
      nextToken = data.nextToken;
      
    } while (nextToken);
    
    console.log(`Fetched ${allCompanies.length} companies`);
    
    // Now fetch users for each company using usersByCompanyUsersId
    const companiesWithUserData = await Promise.all(
      allCompanies.map(async (company) => {
        console.log(`Fetching users for company: ${company.name}`);
        
        try {
          let companyUsers = [];
          let userNextToken = null;
          
          // Fetch users for this specific company
          do {
            const userVariables = {
              companyUsersId: company.id,
              limit: 1000,
              nextToken: userNextToken
            };
            
            const usersList = await client.graphql({
              query: queries.usersByCompanyUsersId,
              variables: userVariables
            });
            
            const userData = usersList.data.usersByCompanyUsersId;
            companyUsers = companyUsers.concat(userData.items);
            userNextToken = userData.nextToken;
            
          } while (userNextToken);
          
          console.log(`Found ${companyUsers.length} users for company ${company.name}`);
          
          // Clean and format user data
          const formattedUsers = companyUsers.map(user => ({
            id: user.id,
            sub: user.id,
            firstname: user.firstname || '',
            lastname: user.lastname || '',
            email: user.email || '',
            phone: user.phone || '',
            role: user.role || 'Rapport',
            username: user.username || '',
            password: user.password || '',
            nom: [user.firstname, user.lastname].filter(Boolean).join(' ') || user.username || 'Utilisateur'
          }));
          
          return {
            ...company,
            users: {
              items: formattedUsers
            }
          };
          
        } catch (userError) {
          console.error(`Error fetching users for company ${company.name}:`, userError);
          return {
            ...company,
            users: {
              items: []
            }
          };
        }
      })
    );
    
    console.log('Companies with user data processed successfully');
    return companiesWithUserData;
    
  } catch (error) {
    console.error('Error in fetchCompaniesWithUsers:', error);
    
    // Provide more specific error messages
    if (error.message?.includes('NoCredentials')) {
      throw new Error('Erreur d\'authentification - veuillez vous reconnecter');
    } else if (error.message?.includes('NetworkError')) {
      throw new Error('Erreur de réseau - vérifiez votre connexion');
    } else if (error.message?.includes('GraphQL')) {
      throw new Error('Erreur lors de la récupération des données');
    }
    
    throw error;
  }
};
