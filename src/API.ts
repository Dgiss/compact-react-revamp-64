
import { generateClient } from 'aws-amplify/api';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import { waitForAmplifyConfig } from './config/aws-config.js';
import { signUp } from 'aws-amplify/auth';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface Company {
  id: string;
  name: string;
  siret?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  countryCode?: string;
  contact?: string;
  email?: string;
  mobile?: string;
  phone?: string;
  fax?: string;
  creationDate?: string;
  subscriptionDate?: string;
  keyedStart?: boolean;
  users?: {
    items: User[];
    nextToken?: string;
  };
  vehicles?: {
    items: Vehicle[];
    nextToken?: string;
  };
}

export interface User {
  sub: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  password?: string;
  address?: string;
  mobile?: string;
  role?: UserRole;
  accessType?: AccessType;
  accessibleVehicles?: string[];
  companyUsersId: string;
  company?: Company;
}

export interface Vehicle {
  immat: string;
  code?: string;
  nomVehicule?: string;
  marque?: string;
  modele_id?: string;
  energie?: string;
  couleur?: string;
  dateMiseEnCirculation?: string;
  VIN?: string;
  AWN_nom_commercial?: string;
  puissanceFiscale?: string;
  kilometerage?: string;
  kilometerageStart?: string;
  locations?: string;
  companyVehiclesId: string;
  company?: Company;
  device?: Device;
}

export interface Device {
  imei: string;
  protocolId?: number;
  sim?: string;
  name?: string;
  enabled?: boolean;
  vehicle?: Vehicle;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  INVITED = 'INVITED',
  LIMITED_INVITED = 'LIMITED_INVITED'
}

export enum AccessType {
  FULL_COMPANY = 'FULL_COMPANY',
  VEHICLE_LIST = 'VEHICLE_LIST'
}

export interface APIResponse<T> {
  data?: T;
  error?: APIError;
  nextToken?: string;
}

export interface APIError {
  message: string;
  code?: string;
  details?: any;
}

export interface PaginationOptions {
  limit?: number;
  nextToken?: string;
}

export interface CreateCompanyInput {
  name: string;
  siret?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  countryCode?: string;
  contact?: string;
  email?: string;
  mobile?: string;
  phone?: string;
  fax?: string;
  subscriptionDate?: string;
  keyedStart?: boolean;
}

export interface CreateUserInput {
  username: string;
  password: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  address?: string;
  mobile?: string;
  role?: UserRole;
  accessType?: AccessType;
  accessibleVehicles?: string[];
}

// ============================================================================
// API CLIENT CONFIGURATION
// ============================================================================

const client = generateClient();

// ============================================================================
// ERROR HANDLING
// ============================================================================

export class APIError extends Error {
  constructor(message: string, public code?: string, public details?: any) {
    super(message);
    this.name = 'APIError';
  }
}

const handleAPIError = (error: any): APIError => {
  console.error('API Error:', error);
  
  if (error.message?.includes('NoCredentials')) {
    return new APIError('Erreur d\'authentification - veuillez vous reconnecter', 'AUTH_ERROR');
  } else if (error.message?.includes('NetworkError')) {
    return new APIError('Erreur de réseau - vérifiez votre connexion', 'NETWORK_ERROR');
  } else if (error.message?.includes('GraphQL')) {
    return new APIError('Erreur lors de la récupération des données', 'GRAPHQL_ERROR');
  }
  
  return new APIError(error.message || 'Une erreur inconnue s\'est produite', 'UNKNOWN_ERROR', error);
};

// ============================================================================
// COMPANY API
// ============================================================================

export const CompanyAPI = {
  /**
   * Récupère toutes les entreprises
   */
  async fetchAll(options: PaginationOptions = {}): Promise<APIResponse<Company[]>> {
    try {
      await waitForAmplifyConfig();
      let allItems: Company[] = [];
      let nextToken = options.nextToken;
      
      do {
        const variables = {
          limit: options.limit || 4000,
          nextToken: nextToken
        };
        
        const result = await client.graphql({
          query: queries.listCompanies,
          variables: variables
        });
        
        const data = result.data.listCompanies;
        allItems = allItems.concat(data.items);
        nextToken = data.nextToken;
        
      } while (nextToken);
      
      return { data: allItems };
    } catch (error) {
      return { error: handleAPIError(error) };
    }
  },

  /**
   * Récupère les entreprises avec filtres
   */
  async fetchFiltered(searchName?: string, searchEmail?: string, searchSiret?: string): Promise<APIResponse<Company[]>> {
    try {
      await waitForAmplifyConfig();
      let filtersArray = [];
      
      if (searchSiret?.trim()) {
        filtersArray.push({ siret: { contains: searchSiret.trim() } });
      }
      
      if (searchName?.trim()) {
        filtersArray.push({ name: { contains: searchName.trim() } });
      }
      
      if (filtersArray.length === 0) {
        throw new Error("Veuillez saisir au moins un critère de recherche");
      }

      let nextToken = null;
      let allCompanies: Company[] = [];

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

      return { data: allCompanies };
    } catch (error) {
      return { error: handleAPIError(error) };
    }
  },

  /**
   * Crée une nouvelle entreprise
   */
  async create(input: CreateCompanyInput): Promise<APIResponse<Company>> {
    try {
      await waitForAmplifyConfig();
      
      const companyInput = {
        name: input.name,
        siret: input.siret || '',
        address: input.address || '',
        postalCode: input.postalCode || '',
        city: input.city || '',
        countryCode: input.countryCode || '',
        contact: input.contact || '',
        email: input.email || '',
        mobile: input.mobile || '',
        phone: input.phone || '',
        fax: input.fax || '',
        creationDate: new Date().toISOString(),
        subscriptionDate: input.subscriptionDate || new Date().toISOString(),
        keyedStart: input.keyedStart || false
      };
      
      const result = await client.graphql({
        query: mutations.createCompany,
        variables: { input: companyInput }
      });
      
      return { data: result.data.createCompany };
    } catch (error) {
      return { error: handleAPIError(error) };
    }
  },

  /**
   * Met à jour une entreprise
   */
  async update(input: Partial<Company> & { id: string }): Promise<APIResponse<Company>> {
    try {
      await waitForAmplifyConfig();
      
      const companyDetails = {
        id: input.id,
        name: input.name,
        siret: input.siret,
        address: input.address || '',
        postalCode: input.postalCode || '',
        city: input.city || '',
        countryCode: input.countryCode || '',
        contact: input.contact || '',
        email: input.email || '',
        mobile: input.mobile || '',
        phone: input.phone || '',
        fax: input.fax || '',
        subscriptionDate: input.subscriptionDate || '',
        keyedStart: input.keyedStart || false,
        lastModificationDate: new Date().toISOString()
      };

      const result = await client.graphql({
        query: mutations.updateCompany,
        variables: { input: companyDetails }
      });
      
      return { data: result.data.updateCompany };
    } catch (error) {
      return { error: handleAPIError(error) };
    }
  },

  /**
   * Supprime une entreprise
   */
  async delete(id: string): Promise<APIResponse<boolean>> {
    try {
      await waitForAmplifyConfig();
      
      await client.graphql({
        query: mutations.deleteCompany,
        variables: { input: { id } }
      });
      
      return { data: true };
    } catch (error) {
      return { error: handleAPIError(error) };
    }
  },

  /**
   * Récupère les entreprises avec leurs utilisateurs
   */
  async fetchWithUsers(): Promise<APIResponse<Company[]>> {
    try {
      await waitForAmplifyConfig();
      
      // Fetch companies first
      const companiesResult = await this.fetchAll();
      if (companiesResult.error || !companiesResult.data) {
        return companiesResult;
      }

      // Fetch users for each company
      const companiesWithUsers = await Promise.all(
        companiesResult.data.map(async (company) => {
          try {
            let companyUsers: User[] = [];
            let userNextToken = null;
            
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
            
            return {
              ...company,
              users: {
                items: companyUsers.map(user => ({
                  ...user,
                  nom: user.firstname && user.lastname ? 
                       `${user.firstname} ${user.lastname}` : 
                       user.username || 'Utilisateur'
                }))
              }
            };
            
          } catch (userError) {
            console.error(`Error fetching users for company ${company.name}:`, userError);
            return {
              ...company,
              users: { items: [] }
            };
          }
        })
      );
      
      return { data: companiesWithUsers };
    } catch (error) {
      return { error: handleAPIError(error) };
    }
  }
};

// ============================================================================
// USER API
// ============================================================================

export const UserAPI = {
  /**
   * Crée un nouvel utilisateur (Cognito + GraphQL)
   */
  async create(input: CreateUserInput, companyId: string): Promise<APIResponse<{ user: User; cognitoUser: any }>> {
    try {
      await waitForAmplifyConfig();
      
      // Create user in Cognito
      const cognitoUser = await signUp({
        username: input.username,
        password: input.password,
        options: {
          userAttributes: {
            email: input.email || 'default@test.com'
          }
        }
      });
      
      // Create user in GraphQL (simplified for current schema)
      const userDetails = {
        sub: cognitoUser.userId.toString(),
        username: input.username,
        firstname: input.firstname || '',
        lastname: input.lastname || '',
        companyUsersId: companyId
      };
      
      const result = await client.graphql({
        query: mutations.createUser,
        variables: { input: userDetails }
      });
      
      return { 
        data: { 
          user: result.data.createUser, 
          cognitoUser 
        } 
      };
    } catch (error) {
      return { error: handleAPIError(error) };
    }
  },

  /**
   * Met à jour un utilisateur
   */
  async update(input: Partial<User> & { sub: string }): Promise<APIResponse<User>> {
    try {
      await waitForAmplifyConfig();
      
      const result = await client.graphql({
        query: mutations.updateUser,
        variables: { input }
      });
      
      return { data: result.data.updateUser };
    } catch (error) {
      return { error: handleAPIError(error) };
    }
  },

  /**
   * Supprime un utilisateur
   */
  async delete(sub: string): Promise<APIResponse<boolean>> {
    try {
      await waitForAmplifyConfig();
      
      await client.graphql({
        query: mutations.deleteUser,
        variables: { input: { sub } }
      });
      
      return { data: true };
    } catch (error) {
      return { error: handleAPIError(error) };
    }
  }
};

// ============================================================================
// VEHICLE API
// ============================================================================

export const VehicleAPI = {
  /**
   * Met à jour un véhicule
   */
  async update(input: Partial<Vehicle> & { immat: string }): Promise<APIResponse<Vehicle>> {
    try {
      await waitForAmplifyConfig();
      
      const vehicleDetails = {
        ...input,
        lastModificationDate: new Date().toISOString()
      };

      const result = await client.graphql({
        query: mutations.updateVehicle,
        variables: { input: vehicleDetails }
      });
      
      return { data: result.data.updateVehicle };
    } catch (error) {
      return { error: handleAPIError(error) };
    }
  },

  /**
   * Supprime un véhicule
   */
  async delete(immat: string): Promise<APIResponse<boolean>> {
    try {
      await waitForAmplifyConfig();
      
      await client.graphql({
        query: mutations.deleteVehicle,
        variables: { input: { immat } }
      });
      
      return { data: true };
    } catch (error) {
      return { error: handleAPIError(error) };
    }
  }
};

// ============================================================================
// COMBINED OPERATIONS
// ============================================================================

export const CombinedAPI = {
  /**
   * Crée une entreprise avec un utilisateur administrateur
   */
  async createCompanyWithUser(companyData: CreateCompanyInput, userData: CreateUserInput): Promise<APIResponse<{ company: Company; user: User; cognitoUser: any }>> {
    let createdCompany: Company | null = null;
    
    try {
      // Create company
      const companyResult = await CompanyAPI.create(companyData);
      if (companyResult.error || !companyResult.data) {
        return { error: companyResult.error };
      }
      
      createdCompany = companyResult.data;
      
      // Create user
      const userResult = await UserAPI.create(userData, createdCompany.id);
      if (userResult.error || !userResult.data) {
        // Rollback company creation
        await CompanyAPI.delete(createdCompany.id);
        return { error: userResult.error };
      }
      
      return {
        data: {
          company: createdCompany,
          user: userResult.data.user,
          cognitoUser: userResult.data.cognitoUser
        }
      };
    } catch (error) {
      // Rollback if company was created
      if (createdCompany?.id) {
        try {
          await CompanyAPI.delete(createdCompany.id);
        } catch (rollbackError) {
          console.error('Error during rollback:', rollbackError);
        }
      }
      
      return { error: handleAPIError(error) };
    }
  },

  /**
   * Supprime une entreprise et tous ses utilisateurs
   */
  async deleteCompanyAndUsers(company: Company): Promise<APIResponse<boolean>> {
    try {
      // Delete all users first
      const users = company.users?.items || [];
      
      for (const user of users) {
        const deleteResult = await UserAPI.delete(user.sub);
        if (deleteResult.error) {
          console.error(`Error deleting user ${user.username}:`, deleteResult.error);
        }
      }
      
      // Delete company
      const companyResult = await CompanyAPI.delete(company.id);
      return companyResult;
    } catch (error) {
      return { error: handleAPIError(error) };
    }
  }
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  Company: CompanyAPI,
  User: UserAPI,
  Vehicle: VehicleAPI,
  Combined: CombinedAPI,
  client,
  handleAPIError
};
