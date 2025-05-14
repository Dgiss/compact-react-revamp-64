
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { awsconfig } from '@/lib/amplifyConfig';

// Configuration Amplify
Amplify.configure(awsconfig);

// Création du client API
const client = generateClient();

// Définition des types
export interface User {
  id?: string;
  username: string;
  password: string;
  companyId?: string;
  role?: string;
}

export interface Company {
  id?: string;
  name: string;
  users?: User[];
}

export interface Device {
  id?: string;
  imei: string;
  vehicleImmat?: string;
}

export interface Vehicle {
  id?: string;
  immat: string;
  deviceId?: string;
}

// Requêtes GraphQL
const listUsersQuery = /* GraphQL */ `
  query ListUsers {
    listUsers {
      items {
        id
        username
        password
        companyId
        role
      }
    }
  }
`;

const getUserQuery = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      password
      companyId
      role
    }
  }
`;

const createUserMutation = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
      password
      companyId
      role
    }
  }
`;

const updateUserMutation = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      username
      password
      companyId
      role
    }
  }
`;

const deleteUserMutation = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      id
    }
  }
`;

const listCompaniesQuery = /* GraphQL */ `
  query ListCompanies {
    listCompanies {
      items {
        id
        name
      }
    }
  }
`;

const getCompanyQuery = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      users {
        items {
          id
          username
          password
          role
        }
      }
    }
  }
`;

const createCompanyMutation = /* GraphQL */ `
  mutation CreateCompany($input: CreateCompanyInput!) {
    createCompany(input: $input) {
      id
      name
    }
  }
`;

const updateCompanyMutation = /* GraphQL */ `
  mutation UpdateCompany($input: UpdateCompanyInput!) {
    updateCompany(input: $input) {
      id
      name
    }
  }
`;

const deleteCompanyMutation = /* GraphQL */ `
  mutation DeleteCompany($input: DeleteCompanyInput!) {
    deleteCompany(input: $input) {
      id
    }
  }
`;

// Service pour les utilisateurs
export const userService = {
  async listUsers(): Promise<User[]> {
    try {
      const response = await client.graphql({
        query: listUsersQuery,
      });
      
      return response.data.listUsers.items;
    } catch (error) {
      console.error('Error listing users:', error);
      throw error;
    }
  },

  async getUser(id: string): Promise<User> {
    try {
      const response = await client.graphql({
        query: getUserQuery,
        variables: { id }
      });
      
      return response.data.getUser;
    } catch (error) {
      console.error(`Error getting user ${id}:`, error);
      throw error;
    }
  },

  async createUser(user: User): Promise<User> {
    try {
      const response = await client.graphql({
        query: createUserMutation,
        variables: { input: user }
      });
      
      return response.data.createUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async updateUser(user: User): Promise<User> {
    try {
      const response = await client.graphql({
        query: updateUserMutation,
        variables: { input: user }
      });
      
      return response.data.updateUser;
    } catch (error) {
      console.error(`Error updating user ${user.id}:`, error);
      throw error;
    }
  },

  async deleteUser(id: string): Promise<string> {
    try {
      await client.graphql({
        query: deleteUserMutation,
        variables: { input: { id } }
      });
      
      return id;
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  }
};

// Service pour les entreprises
export const companyService = {
  async listCompanies(): Promise<Company[]> {
    try {
      const response = await client.graphql({
        query: listCompaniesQuery
      });
      
      return response.data.listCompanies.items;
    } catch (error) {
      console.error('Error listing companies:', error);
      throw error;
    }
  },

  async getCompany(id: string): Promise<Company> {
    try {
      const response = await client.graphql({
        query: getCompanyQuery,
        variables: { id }
      });
      
      return response.data.getCompany;
    } catch (error) {
      console.error(`Error getting company ${id}:`, error);
      throw error;
    }
  },

  async createCompany(company: Company): Promise<Company> {
    try {
      const response = await client.graphql({
        query: createCompanyMutation,
        variables: { input: company }
      });
      
      return response.data.createCompany;
    } catch (error) {
      console.error('Error creating company:', error);
      throw error;
    }
  },

  async updateCompany(company: Company): Promise<Company> {
    try {
      const response = await client.graphql({
        query: updateCompanyMutation,
        variables: { input: company }
      });
      
      return response.data.updateCompany;
    } catch (error) {
      console.error(`Error updating company ${company.id}:`, error);
      throw error;
    }
  },

  async deleteCompany(id: string): Promise<string> {
    try {
      await client.graphql({
        query: deleteCompanyMutation,
        variables: { input: { id } }
      });
      
      return id;
    } catch (error) {
      console.error(`Error deleting company ${id}:`, error);
      throw error;
    }
  }
};
