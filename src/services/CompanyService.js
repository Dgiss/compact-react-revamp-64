
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

const client = generateClient();

export const fetchCompanies = async () => {
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
  const companyDetails = {
    id: item.id
  };

  await client.graphql({
    query: mutations.deleteCompany,
    variables: { input: companyDetails }
  });
};
