/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCompanyInput = {
  id?: string | null,
  name: string,
  address?: string | null,
  phone?: string | null,
  email?: string | null,
  contactName?: string | null,
  isActive?: boolean | null,
};

export type ModelCompanyConditionInput = {
  name?: ModelStringInput | null,
  address?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  email?: ModelStringInput | null,
  contactName?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  and?: Array< ModelCompanyConditionInput | null > | null,
  or?: Array< ModelCompanyConditionInput | null > | null,
  not?: ModelCompanyConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Company = {
  __typename: "Company",
  id: string,
  name: string,
  address?: string | null,
  phone?: string | null,
  email?: string | null,
  contactName?: string | null,
  isActive?: boolean | null,
  users?: ModelUserConnection | null,
  vehicles?: ModelVehicleConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items: Array< User | null >,
  nextToken?: string | null,
};

export type User = {
  __typename: "User",
  id: string,
  username: string,
  email: string,
  firstName?: string | null,
  lastName?: string | null,
  role: UserRole,
  isActive?: boolean | null,
  companyId?: string | null,
  company?: Company | null,
  lastLogin?: string | null,
  createdAt: string,
  updatedAt: string,
};

export enum UserRole {
  ADMIN = "ADMIN",
  COMPANY_ADMIN = "COMPANY_ADMIN",
  USER = "USER",
}

export type ModelVehicleConnection = {
  __typename: "ModelVehicleConnection",
  items: Array< Vehicle | null >,
  nextToken?: string | null,
};

export type Vehicle = {
  __typename: "Vehicle",
  id: string,
  licensePlate: string,
  make?: string | null,
  model?: string | null,
  year?: number | null,
  vin?: string | null,
  companyId: string,
  company?: Company | null,
  deviceId?: string | null,
  device?: Device | null,
  isActive?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type Device = {
  __typename: "Device",
  id: string,
  imei: string,
  serialNumber?: string | null,
  model?: string | null,
  firmwareVersion?: string | null,
  isActive?: boolean | null,
  vehicleId?: string | null,
  vehicle?: Vehicle | null,
  simCardId?: string | null,
  simCard?: SimCard | null,
  lastSeen?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type SimCard = {
  __typename: "SimCard",
  id: string,
  iccid: string,
  phoneNumber?: string | null,
  carrier?: string | null,
  plan?: string | null,
  isActive?: boolean | null,
  deviceId?: string | null,
  device?: Device | null,
  dataUsage?: number | null,
  monthlyLimit?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCompanyInput = {
  id: string,
  name?: string | null,
  address?: string | null,
  phone?: string | null,
  email?: string | null,
  contactName?: string | null,
  isActive?: boolean | null,
};

export type DeleteCompanyInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  username: string,
  email: string,
  firstName?: string | null,
  lastName?: string | null,
  role: UserRole,
  isActive?: boolean | null,
  companyId?: string | null,
  lastLogin?: string | null,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  role?: ModelUserRoleInput | null,
  isActive?: ModelBooleanInput | null,
  companyId?: ModelIDInput | null,
  lastLogin?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelUserRoleInput = {
  eq?: UserRole | null,
  ne?: UserRole | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  email?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  role?: UserRole | null,
  isActive?: boolean | null,
  companyId?: string | null,
  lastLogin?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateVehicleInput = {
  id?: string | null,
  licensePlate: string,
  make?: string | null,
  model?: string | null,
  year?: number | null,
  vin?: string | null,
  companyId: string,
  deviceId?: string | null,
  isActive?: boolean | null,
};

export type ModelVehicleConditionInput = {
  licensePlate?: ModelStringInput | null,
  make?: ModelStringInput | null,
  model?: ModelStringInput | null,
  year?: ModelIntInput | null,
  vin?: ModelStringInput | null,
  companyId?: ModelIDInput | null,
  deviceId?: ModelIDInput | null,
  isActive?: ModelBooleanInput | null,
  and?: Array< ModelVehicleConditionInput | null > | null,
  or?: Array< ModelVehicleConditionInput | null > | null,
  not?: ModelVehicleConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateVehicleInput = {
  id: string,
  licensePlate?: string | null,
  make?: string | null,
  model?: string | null,
  year?: number | null,
  vin?: string | null,
  companyId?: string | null,
  deviceId?: string | null,
  isActive?: boolean | null,
};

export type DeleteVehicleInput = {
  id: string,
};

export type CreateDeviceInput = {
  id?: string | null,
  imei: string,
  serialNumber?: string | null,
  model?: string | null,
  firmwareVersion?: string | null,
  isActive?: boolean | null,
  vehicleId?: string | null,
  simCardId?: string | null,
  lastSeen?: string | null,
};

export type ModelDeviceConditionInput = {
  imei?: ModelStringInput | null,
  serialNumber?: ModelStringInput | null,
  model?: ModelStringInput | null,
  firmwareVersion?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  vehicleId?: ModelIDInput | null,
  simCardId?: ModelIDInput | null,
  lastSeen?: ModelStringInput | null,
  and?: Array< ModelDeviceConditionInput | null > | null,
  or?: Array< ModelDeviceConditionInput | null > | null,
  not?: ModelDeviceConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateDeviceInput = {
  id: string,
  imei?: string | null,
  serialNumber?: string | null,
  model?: string | null,
  firmwareVersion?: string | null,
  isActive?: boolean | null,
  vehicleId?: string | null,
  simCardId?: string | null,
  lastSeen?: string | null,
};

export type DeleteDeviceInput = {
  id: string,
};

export type CreateSimCardInput = {
  id?: string | null,
  iccid: string,
  phoneNumber?: string | null,
  carrier?: string | null,
  plan?: string | null,
  isActive?: boolean | null,
  deviceId?: string | null,
  dataUsage?: number | null,
  monthlyLimit?: number | null,
};

export type ModelSimCardConditionInput = {
  iccid?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  carrier?: ModelStringInput | null,
  plan?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  deviceId?: ModelIDInput | null,
  dataUsage?: ModelFloatInput | null,
  monthlyLimit?: ModelFloatInput | null,
  and?: Array< ModelSimCardConditionInput | null > | null,
  or?: Array< ModelSimCardConditionInput | null > | null,
  not?: ModelSimCardConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateSimCardInput = {
  id: string,
  iccid?: string | null,
  phoneNumber?: string | null,
  carrier?: string | null,
  plan?: string | null,
  isActive?: boolean | null,
  deviceId?: string | null,
  dataUsage?: number | null,
  monthlyLimit?: number | null,
};

export type DeleteSimCardInput = {
  id: string,
};

export type ModelCompanyFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  address?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  email?: ModelStringInput | null,
  contactName?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCompanyFilterInput | null > | null,
  or?: Array< ModelCompanyFilterInput | null > | null,
  not?: ModelCompanyFilterInput | null,
};

export type ModelCompanyConnection = {
  __typename: "ModelCompanyConnection",
  items: Array< Company | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  role?: ModelUserRoleInput | null,
  isActive?: ModelBooleanInput | null,
  companyId?: ModelIDInput | null,
  lastLogin?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelVehicleFilterInput = {
  id?: ModelIDInput | null,
  licensePlate?: ModelStringInput | null,
  make?: ModelStringInput | null,
  model?: ModelStringInput | null,
  year?: ModelIntInput | null,
  vin?: ModelStringInput | null,
  companyId?: ModelIDInput | null,
  deviceId?: ModelIDInput | null,
  isActive?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelVehicleFilterInput | null > | null,
  or?: Array< ModelVehicleFilterInput | null > | null,
  not?: ModelVehicleFilterInput | null,
};

export type ModelDeviceFilterInput = {
  id?: ModelIDInput | null,
  imei?: ModelStringInput | null,
  serialNumber?: ModelStringInput | null,
  model?: ModelStringInput | null,
  firmwareVersion?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  vehicleId?: ModelIDInput | null,
  simCardId?: ModelIDInput | null,
  lastSeen?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelDeviceFilterInput | null > | null,
  or?: Array< ModelDeviceFilterInput | null > | null,
  not?: ModelDeviceFilterInput | null,
};

export type ModelDeviceConnection = {
  __typename: "ModelDeviceConnection",
  items: Array< Device | null >,
  nextToken?: string | null,
};

export type ModelSimCardFilterInput = {
  id?: ModelIDInput | null,
  iccid?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  carrier?: ModelStringInput | null,
  plan?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  deviceId?: ModelIDInput | null,
  dataUsage?: ModelFloatInput | null,
  monthlyLimit?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSimCardFilterInput | null > | null,
  or?: Array< ModelSimCardFilterInput | null > | null,
  not?: ModelSimCardFilterInput | null,
};

export type ModelSimCardConnection = {
  __typename: "ModelSimCardConnection",
  items: Array< SimCard | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionCompanyFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  address?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  contactName?: ModelSubscriptionStringInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCompanyFilterInput | null > | null,
  or?: Array< ModelSubscriptionCompanyFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  username?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  role?: ModelSubscriptionStringInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  companyId?: ModelSubscriptionIDInput | null,
  lastLogin?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionVehicleFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  licensePlate?: ModelSubscriptionStringInput | null,
  make?: ModelSubscriptionStringInput | null,
  model?: ModelSubscriptionStringInput | null,
  year?: ModelSubscriptionIntInput | null,
  vin?: ModelSubscriptionStringInput | null,
  companyId?: ModelSubscriptionIDInput | null,
  deviceId?: ModelSubscriptionIDInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionVehicleFilterInput | null > | null,
  or?: Array< ModelSubscriptionVehicleFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionDeviceFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  imei?: ModelSubscriptionStringInput | null,
  serialNumber?: ModelSubscriptionStringInput | null,
  model?: ModelSubscriptionStringInput | null,
  firmwareVersion?: ModelSubscriptionStringInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  vehicleId?: ModelSubscriptionIDInput | null,
  simCardId?: ModelSubscriptionIDInput | null,
  lastSeen?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionDeviceFilterInput | null > | null,
  or?: Array< ModelSubscriptionDeviceFilterInput | null > | null,
};

export type ModelSubscriptionSimCardFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  iccid?: ModelSubscriptionStringInput | null,
  phoneNumber?: ModelSubscriptionStringInput | null,
  carrier?: ModelSubscriptionStringInput | null,
  plan?: ModelSubscriptionStringInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  deviceId?: ModelSubscriptionIDInput | null,
  dataUsage?: ModelSubscriptionFloatInput | null,
  monthlyLimit?: ModelSubscriptionFloatInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSimCardFilterInput | null > | null,
  or?: Array< ModelSubscriptionSimCardFilterInput | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateCompanyMutationVariables = {
  input: CreateCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type UpdateCompanyMutationVariables = {
  input: UpdateCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type DeleteCompanyMutationVariables = {
  input: DeleteCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateVehicleMutationVariables = {
  input: CreateVehicleInput,
  condition?: ModelVehicleConditionInput | null,
};

export type UpdateVehicleMutationVariables = {
  input: UpdateVehicleInput,
  condition?: ModelVehicleConditionInput | null,
};

export type DeleteVehicleMutationVariables = {
  input: DeleteVehicleInput,
  condition?: ModelVehicleConditionInput | null,
};

export type CreateDeviceMutationVariables = {
  input: CreateDeviceInput,
  condition?: ModelDeviceConditionInput | null,
};

export type UpdateDeviceMutationVariables = {
  input: UpdateDeviceInput,
  condition?: ModelDeviceConditionInput | null,
};

export type DeleteDeviceMutationVariables = {
  input: DeleteDeviceInput,
  condition?: ModelDeviceConditionInput | null,
};

export type CreateSimCardMutationVariables = {
  input: CreateSimCardInput,
  condition?: ModelSimCardConditionInput | null,
};

export type UpdateSimCardMutationVariables = {
  input: UpdateSimCardInput,
  condition?: ModelSimCardConditionInput | null,
};

export type DeleteSimCardMutationVariables = {
  input: DeleteSimCardInput,
  condition?: ModelSimCardConditionInput | null,
};

export type GetCompanyQueryVariables = {
  id: string,
};

export type ListCompaniesQueryVariables = {
  filter?: ModelCompanyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetVehicleQueryVariables = {
  id: string,
};

export type ListVehiclesQueryVariables = {
  filter?: ModelVehicleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetDeviceQueryVariables = {
  id: string,
};

export type ListDevicesQueryVariables = {
  filter?: ModelDeviceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetSimCardQueryVariables = {
  id: string,
};

export type ListSimCardsQueryVariables = {
  filter?: ModelSimCardFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UsersByCompanyUsersIdQueryVariables = {
  companyUsersId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UsersByCompanyUsersIdQuery = {
  __typename: "UsersByCompanyUsersIdQuery",
  usersByCompanyUsersId?: ModelUserConnection | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type OnCreateCompanySubscriptionVariables = {
  filter?: ModelSubscriptionCompanyFilterInput | null,
};

export type OnUpdateCompanySubscriptionVariables = {
  filter?: ModelSubscriptionCompanyFilterInput | null,
};

export type OnDeleteCompanySubscriptionVariables = {
  filter?: ModelSubscriptionCompanyFilterInput | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateVehicleSubscriptionVariables = {
  filter?: ModelSubscriptionVehicleFilterInput | null,
};

export type OnUpdateVehicleSubscriptionVariables = {
  filter?: ModelSubscriptionVehicleFilterInput | null,
};

export type OnDeleteVehicleSubscriptionVariables = {
  filter?: ModelSubscriptionVehicleFilterInput | null,
};

export type OnCreateDeviceSubscriptionVariables = {
  filter?: ModelSubscriptionDeviceFilterInput | null,
};

export type OnUpdateDeviceSubscriptionVariables = {
  filter?: ModelSubscriptionDeviceFilterInput | null,
};

export type OnDeleteDeviceSubscriptionVariables = {
  filter?: ModelSubscriptionDeviceFilterInput | null,
};

export type OnCreateSimCardSubscriptionVariables = {
  filter?: ModelSubscriptionSimCardFilterInput | null,
};

export type OnUpdateSimCardSubscriptionVariables = {
  filter?: ModelSubscriptionSimCardFilterInput | null,
};

export type OnDeleteSimCardSubscriptionVariables = {
  filter?: ModelSubscriptionSimCardFilterInput | null,
};

export type CreateCompanyMutation = {
  __typename: "CreateCompanyMutation",
  createCompany?: Company | null,
};

export type UpdateCompanyMutation = {
  __typename: "UpdateCompanyMutation",
  updateCompany?: Company | null,
};

export type DeleteCompanyMutation = {
  __typename: "DeleteCompanyMutation",
  deleteCompany?: Company | null,
};

export type CreateUserMutation = {
  __typename: "CreateUserMutation",
  createUser?: User | null,
};

export type UpdateUserMutation = {
  __typename: "UpdateUserMutation",
  updateUser?: User | null,
};

export type DeleteUserMutation = {
  __typename: "DeleteUserMutation",
  deleteUser?: User | null,
};

export type CreateVehicleMutation = {
  __typename: "CreateVehicleMutation",
  createVehicle?: Vehicle | null,
};

export type UpdateVehicleMutation = {
  __typename: "UpdateVehicleMutation",
  updateVehicle?: Vehicle | null,
};

export type DeleteVehicleMutation = {
  __typename: "DeleteVehicleMutation",
  deleteVehicle?: Vehicle | null,
};

export type CreateDeviceMutation = {
  __typename: "CreateDeviceMutation",
  createDevice?: Device | null,
};

export type UpdateDeviceMutation = {
  __typename: "UpdateDeviceMutation",
  updateDevice?: Device | null,
};

export type DeleteDeviceMutation = {
  __typename: "DeleteDeviceMutation",
  deleteDevice?: Device | null,
};

export type CreateSimCardMutation = {
  __typename: "CreateSimCardMutation",
  createSimCard?: SimCard | null,
};

export type UpdateSimCardMutation = {
  __typename: "UpdateSimCardMutation",
  updateSimCard?: SimCard | null,
};

export type DeleteSimCardMutation = {
  __typename: "DeleteSimCardMutation",
  deleteSimCard?: SimCard | null,
};

export type GetCompanyQuery = {
  __typename: "GetCompanyQuery",
  getCompany?: Company | null,
};

export type ListCompaniesQuery = {
  __typename: "ListCompaniesQuery",
  listCompanies?: ModelCompanyConnection | null,
};

export type GetUserQuery = {
  __typename: "GetUserQuery",
  getUser?: User | null,
};

export type ListUsersQuery = {
  __typename: "ListUsersQuery",
  listUsers?: ModelUserConnection | null,
};

export type GetVehicleQuery = {
  __typename: "GetVehicleQuery",
  getVehicle?: Vehicle | null,
};

export type ListVehiclesQuery = {
  __typename: "ListVehiclesQuery",
  listVehicles?: ModelVehicleConnection | null,
};

export type GetDeviceQuery = {
  __typename: "GetDeviceQuery",
  getDevice?: Device | null,
};

export type ListDevicesQuery = {
  __typename: "ListDevicesQuery",
  listDevices?: ModelDeviceConnection | null,
};

export type GetSimCardQuery = {
  __typename: "GetSimCardQuery",
  getSimCard?: SimCard | null,
};

export type ListSimCardsQuery = {
  __typename: "ListSimCardsQuery",
  listSimCards?: ModelSimCardConnection | null,
};

export type OnCreateCompanySubscription = {
  __typename: "OnCreateCompanySubscription",
  onCreateCompany?: Company | null,
};

export type OnUpdateCompanySubscription = {
  __typename: "OnUpdateCompanySubscription",
  onUpdateCompany?: Company | null,
};

export type OnDeleteCompanySubscription = {
  __typename: "OnDeleteCompanySubscription",
  onDeleteCompany?: Company | null,
};

export type OnCreateUserSubscription = {
  __typename: "OnCreateUserSubscription",
  onCreateUser?: User | null,
};

export type OnUpdateUserSubscription = {
  __typename: "OnUpdateUserSubscription",
  onUpdateUser?: User | null,
};

export type OnDeleteUserSubscription = {
  __typename: "OnDeleteUserSubscription",
  onDeleteUser?: User | null,
};

export type OnCreateVehicleSubscription = {
  __typename: "OnCreateVehicleSubscription",
  onCreateVehicle?: Vehicle | null,
};

export type OnUpdateVehicleSubscription = {
  __typename: "OnUpdateVehicleSubscription",
  onUpdateVehicle?: Vehicle | null,
};

export type OnDeleteVehicleSubscription = {
  __typename: "OnDeleteVehicleSubscription",
  onDeleteVehicle?: Vehicle | null,
};

export type OnCreateDeviceSubscription = {
  __typename: "OnCreateDeviceSubscription",
  onCreateDevice?: Device | null,
};

export type OnUpdateDeviceSubscription = {
  __typename: "OnUpdateDeviceSubscription",
  onUpdateDevice?: Device | null,
};

export type OnDeleteDeviceSubscription = {
  __typename: "OnDeleteDeviceSubscription",
  onDeleteDevice?: Device | null,
};

export type OnCreateSimCardSubscription = {
  __typename: "OnCreateSimCardSubscription",
  onCreateSimCard?: SimCard | null,
};

export type OnUpdateSimCardSubscription = {
  __typename: "OnUpdateSimCardSubscription",
  onUpdateSimCard?: SimCard | null,
};

export type OnDeleteSimCardSubscription = {
  __typename: "OnDeleteSimCardSubscription",
  onDeleteSimCard?: SimCard | null,
};
