import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig } from '@/config/aws-config.js';
import { signUp } from 'aws-amplify/auth';

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
  
  try {
    console.log('Creating company with user:', { companyData, userData });
    
    // Étape 1: Créer l'entreprise dans GraphQL avec les nouveaux champs
    const companyInput = {
      name: companyData.name,
      siret: companyData.siren || companyData.siret || '',
      address: companyData.address || '',
      postalCode: companyData.postalCode || '',
      city: companyData.city || '',
      countryCode: companyData.countryCode || '',
      contact: companyData.contact || '',
      email: companyData.email || '',
      mobile: companyData.mobile || '',
      phone: companyData.phone || '',
      fax: companyData.fax || '',
      creationDate: new Date().toISOString(),
      subscriptionDate: companyData.subscriptionDate || new Date().toISOString(),
      keyedStart: companyData.keyedStart || false
    };
    
    const companyResult = await client.graphql({
      query: mutations.createCompany,
      variables: { input: companyInput }
    });
    
    createdCompany = companyResult.data.createCompany;
    console.log('Company created in GraphQL:', createdCompany);
    
    // Étape 2: Créer l'utilisateur dans Cognito
    const user = await signUp({
      username: userData.username,
      password: userData.password,
      options: {
        userAttributes: {
          email: userData.email || 'default@test.com'
        }
      }
    });
    
    console.log('User created in Cognito:', user);
    
    // Étape 3: Créer l'utilisateur dans GraphQL avec les nouveaux champs
    const userDetails = {
      sub: user.userId.toString(),
      username: userData.username,
      email: userData.email || 'default@test.com',
      password: userData.password,
      firstname: userData.firstname || '',
      lastname: userData.lastname || '',
      address: userData.address || '',
      mobile: userData.mobile || '',
      beginDate: userData.beginDate || new Date().toISOString(),
      endDate: userData.endDate || '',
      mappingId: userData.mappingId || '',
      languageCode: userData.languageCode || 'fr',
      lastModificationDate: new Date().toISOString(),
      showReport: userData.showReport || 'true',
      dispatcher: userData.dispatcher || '',
      applicationVersion: userData.applicationVersion || '1.0.0',
      themeId: userData.themeId || 'default',
      role: userData.role || 'ADMIN',
      accessType: userData.accessType || 'FULL_COMPANY',
      accessibleVehicles: userData.accessibleVehicles || [],
      companyUsersId: createdCompany.id
    };
    
    const newUser = await client.graphql({
      query: mutations.createUser,
      variables: { input: userDetails }
    });
    
    console.log('User created in GraphQL with enhanced fields:', newUser);
    
    return {
      success: true,
      company: createdCompany,
      user: newUser.data.createUser,
      cognitoUser: user
    };
    
  } catch (error) {
    console.error('Error in createCompanyWithUser:', error);
    
    // Rollback en cas d'erreur
    try {
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
    siret: data.siret || data.siren,
    address: data.address || '',
    postalCode: data.postalCode || '',
    city: data.city || '',
    countryCode: data.countryCode || '',
    contact: data.contact || '',
    email: data.email || '',
    mobile: data.mobile || '',
    phone: data.phone || '',
    fax: data.fax || '',
    subscriptionDate: data.subscriptionDate || '',
    keyedStart: data.keyedStart || false,
    lastModificationDate: new Date().toISOString()
  };

  await client.graphql({
    query: mutations.updateCompany,
    variables: {
      input: companyDetails
    }
  });
};

export const updateCompanyAndUser = async ({ companyData, userData }) => {
  await waitForAmplifyConfig();
  
  try {
    console.log('Updating company and user:', { companyData, userData });
    
    // Mettre à jour l'entreprise
    if (companyData) {
      await updateCompanyData(companyData);
    }
    
    // Mettre à jour l'utilisateur dans GraphQL avec nouveaux champs
    if (userData && userData.sub) {
      const userInput = {
        sub: userData.sub,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        firstname: userData.firstname || '',
        lastname: userData.lastname || '',
        address: userData.address || '',
        mobile: userData.mobile || '',
        role: userData.role || 'ADMIN',
        accessType: userData.accessType || 'FULL_COMPANY',
        accessibleVehicles: userData.accessibleVehicles || [],
        lastModificationDate: new Date().toISOString()
      };
      
      await client.graphql({
        query: mutations.updateUser,
        variables: { input: userInput }
      });
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
    
    // Supprimer chaque utilisateur de GraphQL
    for (const user of users) {
      try {
        await client.graphql({
          query: mutations.deleteUser,
          variables: { input: { sub: user.sub } }
        });
      } catch (userError) {
        console.error(`Error deleting user ${user.username}:`, userError);
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
          
          // Clean and format user data with new fields
          const formattedUsers = companyUsers.map(user => ({
            sub: user.sub,
            username: user.username || '',
            email: user.email || '',
            password: user.password || '',
            firstname: user.firstname || '',
            lastname: user.lastname || '',
            mobile: user.mobile || '',
            role: user.role || 'ADMIN',
            accessType: user.accessType || 'FULL_COMPANY',
            nom: user.firstname && user.lastname ? 
                 `${user.firstname} ${user.lastname}` : 
                 user.username || 'Utilisateur'
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
