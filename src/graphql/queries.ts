
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getCompany = /* GraphQL */ `query GetCompany($id: ID!) {
  getCompany(id: $id) {
    id
    name
    address
    phone
    email
    contactName
    isActive
    users {
      items {
        id
        username
        email
        firstName
        lastName
        role
        isActive
        companyId
        lastLogin
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    vehicles {
      items {
        id
        licensePlate
        make
        model
        year
        vin
        companyId
        deviceId
        isActive
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetCompanyQueryVariables, APITypes.GetCompanyQuery>;

export const listCompanies = /* GraphQL */ `query ListCompanies(
  $filter: ModelCompanyFilterInput
  $limit: Int
  $nextToken: String
) {
  listCompanies(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      address
      phone
      email
      contactName
      isActive
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListCompaniesQueryVariables, APITypes.ListCompaniesQuery>;

export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    email
    firstName
    lastName
    role
    isActive
    companyId
    company {
      id
      name
      address
      phone
      email
      contactName
      isActive
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
    lastLogin
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;

export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      email
      firstName
      lastName
      role
      isActive
      companyId
      company {
        id
        name
        address
        phone
        email
        contactName
        isActive
        createdAt
        updatedAt
        __typename
      }
      lastLogin
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;

export const getVehicle = /* GraphQL */ `query GetVehicle($id: ID!) {
  getVehicle(id: $id) {
    id
    licensePlate
    make
    model
    year
    vin
    companyId
    company {
      id
      name
      address
      phone
      email
      contactName
      isActive
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
    deviceId
    device {
      id
      imei
      serialNumber
      model
      firmwareVersion
      isActive
      vehicleId
      vehicle {
        id
        licensePlate
        make
        model
        year
        vin
        companyId
        deviceId
        isActive
        createdAt
        updatedAt
        __typename
      }
      simCardId
      simCard {
        id
        iccid
        phoneNumber
        carrier
        plan
        isActive
        deviceId
        dataUsage
        monthlyLimit
        createdAt
        updatedAt
        __typename
      }
      lastSeen
      createdAt
      updatedAt
      __typename
    }
    isActive
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetVehicleQueryVariables, APITypes.GetVehicleQuery>;

export const listVehicles = /* GraphQL */ `query ListVehicles(
  $filter: ModelVehicleFilterInput
  $limit: Int
  $nextToken: String
) {
  listVehicles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      licensePlate
      make
      model
      year
      vin
      companyId
      company {
        id
        name
        address
        phone
        email
        contactName
        isActive
        createdAt
        updatedAt
        __typename
      }
      deviceId
      device {
        id
        imei
        serialNumber
        model
        firmwareVersion
        isActive
        vehicleId
        simCardId
        lastSeen
        createdAt
        updatedAt
        __typename
      }
      isActive
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListVehiclesQueryVariables, APITypes.ListVehiclesQuery>;

export const getDevice = /* GraphQL */ `query GetDevice($id: ID!) {
  getDevice(id: $id) {
    id
    imei
    serialNumber
    model
    firmwareVersion
    isActive
    vehicleId
    vehicle {
      id
      licensePlate
      make
      model
      year
      vin
      companyId
      company {
        id
        name
        address
        phone
        email
        contactName
        isActive
        createdAt
        updatedAt
        __typename
      }
      deviceId
      device {
        id
        imei
        serialNumber
        model
        firmwareVersion
        isActive
        vehicleId
        simCardId
        lastSeen
        createdAt
        updatedAt
        __typename
      }
      isActive
      createdAt
      updatedAt
      __typename
    }
    simCardId
    simCard {
      id
      iccid
      phoneNumber
      carrier
      plan
      isActive
      deviceId
      device {
        id
        imei
        serialNumber
        model
        firmwareVersion
        isActive
        vehicleId
        simCardId
        lastSeen
        createdAt
        updatedAt
        __typename
      }
      dataUsage
      monthlyLimit
      createdAt
      updatedAt
      __typename
    }
    lastSeen
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetDeviceQueryVariables, APITypes.GetDeviceQuery>;

export const listDevices = /* GraphQL */ `query ListDevices(
  $filter: ModelDeviceFilterInput
  $limit: Int
  $nextToken: String
) {
  listDevices(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      imei
      serialNumber
      model
      firmwareVersion
      isActive
      vehicleId
      vehicle {
        id
        licensePlate
        make
        model
        year
        vin
        companyId
        deviceId
        isActive
        createdAt
        updatedAt
        __typename
      }
      simCardId
      simCard {
        id
        iccid
        phoneNumber
        carrier
        plan
        isActive
        deviceId
        dataUsage
        monthlyLimit
        createdAt
        updatedAt
        __typename
      }
      lastSeen
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListDevicesQueryVariables, APITypes.ListDevicesQuery>;

export const getSimCard = /* GraphQL */ `query GetSimCard($id: ID!) {
  getSimCard(id: $id) {
    id
    iccid
    phoneNumber
    carrier
    plan
    isActive
    deviceId
    device {
      id
      imei
      serialNumber
      model
      firmwareVersion
      isActive
      vehicleId
      vehicle {
        id
        licensePlate
        make
        model
        year
        vin
        companyId
        deviceId
        isActive
        createdAt
        updatedAt
        __typename
      }
      simCardId
      simCard {
        id
        iccid
        phoneNumber
        carrier
        plan
        isActive
        deviceId
        dataUsage
        monthlyLimit
        createdAt
        updatedAt
        __typename
      }
      lastSeen
      createdAt
      updatedAt
      __typename
    }
    dataUsage
    monthlyLimit
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSimCardQueryVariables, APITypes.GetSimCardQuery>;

export const listSimCards = /* GraphQL */ `query ListSimCards(
  $filter: ModelSimCardFilterInput
  $limit: Int
  $nextToken: String
) {
  listSimCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      iccid
      phoneNumber
      carrier
      plan
      isActive
      deviceId
      device {
        id
        imei
        serialNumber
        model
        firmwareVersion
        isActive
        vehicleId
        simCardId
        lastSeen
        createdAt
        updatedAt
        __typename
      }
      dataUsage
      monthlyLimit
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListSimCardsQueryVariables, APITypes.ListSimCardsQuery>;

export const usersByCompanyUsersId = /* GraphQL */ `query UsersByCompanyUsersId(
  $companyUsersId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  usersByCompanyUsersId(
    companyUsersId: $companyUsersId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      sub
      firstname
      lastname
      address
      mobile
      username
      password
      beginDate
      endDate
      mappingId
      languageCode
      lastModificationDate
      showReport
      dispatcher
      applicationVersion
      themeId
      role
      accessExpiresAt
      accessType
      accessibleVehicles
      companyUsersId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.UsersByCompanyUsersIdQueryVariables, APITypes.UsersByCompanyUsersIdQuery>;
