
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany(
    $filter: ModelSubscriptionCompanyFilterInput
    $owner: String
  ) {
    onCreateCompany(filter: $filter, owner: $owner) {
      id
      name
      siren
      address
      email
      contact
      mobile
      siret
      users {
        nextToken
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany(
    $filter: ModelSubscriptionCompanyFilterInput
    $owner: String
  ) {
    onUpdateCompany(filter: $filter, owner: $owner) {
      id
      name
      siren
      address
      email
      contact
      mobile
      siret
      users {
        nextToken
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany(
    $filter: ModelSubscriptionCompanyFilterInput
    $owner: String
  ) {
    onDeleteCompany(filter: $filter, owner: $owner) {
      id
      name
      siren
      address
      email
      contact
      mobile
      siret
      users {
        nextToken
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
      id
      username
      email
      firstname
      lastname
      phone
      role
      password
      companyUsersId
      company {
        id
        name
        siren
        address
        email
        contact
        mobile
        siret
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
      id
      username
      email
      firstname
      lastname
      phone
      role
      password
      companyUsersId
      company {
        id
        name
        siren
        address
        email
        contact
        mobile
        siret
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
      id
      username
      email
      firstname
      lastname
      phone
      role
      password
      companyUsersId
      company {
        id
        name
        siren
        address
        email
        contact
        mobile
        siret
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const onCreateVehicle = /* GraphQL */ `
  subscription OnCreateVehicle(
    $filter: ModelSubscriptionVehicleFilterInput
    $owner: String
  ) {
    onCreateVehicle(filter: $filter, owner: $owner) {
      immat
      code
      vehicleDeviceImei
      vehicleVehicleCategoryId
      vehicleBrandBrandName
      vehicleModeleId
      kilometerage
      kilometerageStart
      vehicleCompanyId
      locations
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const onUpdateVehicle = /* GraphQL */ `
  subscription OnUpdateVehicle(
    $filter: ModelSubscriptionVehicleFilterInput
    $owner: String
  ) {
    onUpdateVehicle(filter: $filter, owner: $owner) {
      immat
      code
      vehicleDeviceImei
      vehicleVehicleCategoryId
      vehicleBrandBrandName
      vehicleModeleId
      kilometerage
      kilometerageStart
      vehicleCompanyId
      locations
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const onDeleteVehicle = /* GraphQL */ `
  subscription OnDeleteVehicle(
    $filter: ModelSubscriptionVehicleFilterInput
    $owner: String
  ) {
    onDeleteVehicle(filter: $filter, owner: $owner) {
      immat
      code
      vehicleDeviceImei
      vehicleVehicleCategoryId
      vehicleBrandBrandName
      vehicleModeleId
      kilometerage
      kilometerageStart
      vehicleCompanyId
      locations
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const onCreateDevice = /* GraphQL */ `
  subscription OnCreateDevice(
    $filter: ModelSubscriptionDeviceFilterInput
    $owner: String
  ) {
    onCreateDevice(filter: $filter, owner: $owner) {
      imei
      protocolId
      sim
      lastKnownLocation
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const onUpdateDevice = /* GraphQL */ `
  subscription OnUpdateDevice(
    $filter: ModelSubscriptionDeviceFilterInput
    $owner: String
  ) {
    onUpdateDevice(filter: $filter, owner: $owner) {
      imei
      protocolId
      sim
      lastKnownLocation
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const onDeleteDevice = /* GraphQL */ `
  subscription OnDeleteDevice(
    $filter: ModelSubscriptionDeviceFilterInput
    $owner: String
  ) {
    onDeleteDevice(filter: $filter, owner: $owner) {
      imei
      protocolId
      sim
      lastKnownLocation
      createdAt
      updatedAt
      __typename
    }
  }
`;

// Subscriptions filtrées par companyId pour écouter les changements d'une entreprise spécifique
export const onCreateUserByCompany = /* GraphQL */ `
  subscription OnCreateUserByCompany($companyUsersId: ID!) {
    onCreateUser(filter: { companyUsersId: { eq: $companyUsersId } }) {
      id
      username
      email
      firstname
      lastname
      phone
      role
      password
      companyUsersId
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const onUpdateUserByCompany = /* GraphQL */ `
  subscription OnUpdateUserByCompany($companyUsersId: ID!) {
    onUpdateUser(filter: { companyUsersId: { eq: $companyUsersId } }) {
      id
      username
      email
      firstname
      lastname
      phone
      role
      password
      companyUsersId
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const onDeleteUserByCompany = /* GraphQL */ `
  subscription OnDeleteUserByCompany($companyUsersId: ID!) {
    onDeleteUser(filter: { companyUsersId: { eq: $companyUsersId } }) {
      id
      username
      email
      firstname
      lastname
      phone
      role
      password
      companyUsersId
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const onCreateVehicleByCompany = /* GraphQL */ `
  subscription OnCreateVehicleByCompany($vehicleCompanyId: ID!) {
    onCreateVehicle(filter: { vehicleCompanyId: { eq: $vehicleCompanyId } }) {
      immat
      code
      vehicleDeviceImei
      vehicleVehicleCategoryId
      vehicleBrandBrandName
      vehicleModeleId
      kilometerage
      kilometerageStart
      vehicleCompanyId
      locations
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const onUpdateVehicleByCompany = /* GraphQL */ `
  subscription OnUpdateVehicleByCompany($vehicleCompanyId: ID!) {
    onUpdateVehicle(filter: { vehicleCompanyId: { eq: $vehicleCompanyId } }) {
      immat
      code
      vehicleDeviceImei
      vehicleVehicleCategoryId
      vehicleBrandBrandName
      vehicleModeleId
      kilometerage
      kilometerageStart
      vehicleCompanyId
      locations
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const onDeleteVehicleByCompany = /* GraphQL */ `
  subscription OnDeleteVehicleByCompany($vehicleCompanyId: ID!) {
    onDeleteVehicle(filter: { vehicleCompanyId: { eq: $vehicleCompanyId } }) {
      immat
      code
      vehicleDeviceImei
      vehicleVehicleCategoryId
      vehicleBrandBrandName
      vehicleModeleId
      kilometerage
      kilometerageStart
      vehicleCompanyId
      locations
      createdAt
      updatedAt
      __typename
    }
  }
`;
