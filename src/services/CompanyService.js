
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

const client = generateClient();

export const fetchCompaniesWithUsers = async () => {
  let allCompanies = [];
  let nextToken = null;
  
  do {
    const variables = {
      limit: 1000,
      nextToken: nextToken
    };
    
    const companyList = await client.graphql({
      query: queries.listCompanies,
      variables: variables
    });
    
    const data = companyList.data.listCompanies;
    allCompanies = allCompanies.concat(data.items);
    nextToken = data.nextToken;
    
  } while (nextToken);

  // Récupérer tous les utilisateurs avec listUsers pour avoir les vrais login/mot de passe
  let allUsers = [];
  let userNextToken = null;
  
  do {
    const userVariables = {
      limit: 1000,
      nextToken: userNextToken
    };
    
    const userList = await client.graphql({
      query: queries.listUsers,
      variables: userVariables
    });
    
    const userData = userList.data.listUsers;
    allUsers = allUsers.concat(userData.items);
    userNextToken = userData.nextToken;
    
  } while (userNextToken);

  // Mapper les utilisateurs aux entreprises
  const companiesWithUsers = allCompanies.map(company => {
    // Trouver les utilisateurs de cette entreprise
    const companyUsers = allUsers.filter(user => user.companyUsersId === company.id);
    
    return {
      ...company,
      users: {
        items: companyUsers.map(user => ({
          ...user,
          // S'assurer que les champs login et motDePasse sont disponibles
          login: user.login || user.sub || user.firstname + user.lastname,
          motDePasse: user.motDePasse || 'Non disponible'
        }))
      }
    };
  });
  
  return companiesWithUsers;
};

export const updateCompany = async (data) => {
  await client.graphql({
    query: mutations.updateCompany,
    variables: {
      input: data
    }
  });
};

export const deleteCompany = async (id) => {
  await client.graphql({
    query: mutations.deleteCompany,
    variables: { input: { id } }
  });
};

export const createCompany = async (data) => {
  const result = await client.graphql({
    query: mutations.createCompany,
    variables: {
      input: data
    }
  });
  return result.data.createCompany;
};

export const addUserToCompany = async (userData) => {
  const result = await client.graphql({
    query: mutations.createUser,
    variables: {
      input: userData
    }
  });
  return result.data.createUser;
};

export const updateUser = async (userData) => {
  await client.graphql({
    query: mutations.updateUser,
    variables: {
      input: userData
    }
  });
};

export const deleteUser = async (sub) => {
  await client.graphql({
    query: mutations.deleteUser,
    variables: { input: { sub } }
  });
};

// Nouvelle fonction pour récupérer tous les utilisateurs avec pagination
export const fetchAllUsers = async () => {
  let allUsers = [];
  let nextToken = null;
  
  do {
    const variables = {
      limit: 1000,
      nextToken: nextToken
    };
    
    const userList = await client.graphql({
      query: queries.listUsers,
      variables: variables
    });
    
    const data = userList.data.listUsers;
    allUsers = allUsers.concat(data.items);
    nextToken = data.nextToken;
    
  } while (nextToken);

  // Enrichir les données utilisateur avec des informations de login
  return allUsers.map(user => ({
    ...user,
    login: user.login || user.sub || user.firstname + user.lastname,
    motDePasse: user.motDePasse || 'Non disponible',
    companyName: user.company?.name || 'Non assignée'
  }));
};
