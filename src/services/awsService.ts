
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { GraphQLResult } from 'aws-amplify/api';
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
      }) as GraphQLResult<{ listUsers: { items: User[] } }>;
      
      return response.data?.listUsers.items || [];
    } catch (error) {
      console.error('Error listing users:', error);
      throw error;
    }
  },

  async getUser(id: string): Promise<User | null> {
    try {
      const response = await client.graphql({
        query: getUserQuery,
        variables: { id }
      }) as GraphQLResult<{ getUser: User }>;
      
      return response.data?.getUser || null;
    } catch (error) {
      console.error(`Error getting user ${id}:`, error);
      throw error;
    }
  },

  async createUser(user: User): Promise<User | null> {
    try {
      const response = await client.graphql({
        query: createUserMutation,
        variables: { input: user }
      }) as GraphQLResult<{ createUser: User }>;
      
      return response.data?.createUser || null;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async updateUser(user: User): Promise<User | null> {
    try {
      const response = await client.graphql({
        query: updateUserMutation,
        variables: { input: user }
      }) as GraphQLResult<{ updateUser: User }>;
      
      return response.data?.updateUser || null;
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
      }) as GraphQLResult<{ deleteUser: { id: string } }>;
      
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
      }) as GraphQLResult<{ listCompanies: { items: Company[] } }>;
      
      return response.data?.listCompanies.items || [];
    } catch (error) {
      console.error('Error listing companies:', error);
      throw error;
    }
  },

  async getCompany(id: string): Promise<Company | null> {
    try {
      const response = await client.graphql({
        query: getCompanyQuery,
        variables: { id }
      }) as GraphQLResult<{ getCompany: Company }>;
      
      return response.data?.getCompany || null;
    } catch (error) {
      console.error(`Error getting company ${id}:`, error);
      throw error;
    }
  },

  async createCompany(company: Company): Promise<Company | null> {
    try {
      const response = await client.graphql({
        query: createCompanyMutation,
        variables: { input: company }
      }) as GraphQLResult<{ createCompany: Company }>;
      
      return response.data?.createCompany || null;
    } catch (error) {
      console.error('Error creating company:', error);
      throw error;
    }
  },

  async updateCompany(company: Company): Promise<Company | null> {
    try {
      const response = await client.graphql({
        query: updateCompanyMutation,
        variables: { input: company }
      }) as GraphQLResult<{ updateCompany: Company }>;
      
      return response.data?.updateCompany || null;
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
      }) as GraphQLResult<{ deleteCompany: { id: string } }>;
      
      return id;
    } catch (error) {
      console.error(`Error deleting company ${id}:`, error);
      throw error;
    }
  }
};
