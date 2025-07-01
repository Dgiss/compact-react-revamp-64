
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig } from '@/config/aws-config.js';

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
