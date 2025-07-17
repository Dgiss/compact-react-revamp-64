/* tslint:disable */
/* eslint-disable */
// this is an auto-generated file. This file will be overwritten

export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
      id
      name
      siret
      address
      postalCode
      city
      countryCode
      contact
      email
      mobile
      phone
      fax
      creationDate
      subscriptionDate
      keyedStart
      createdAt
      updatedAt
    }
  }
`;

export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
      id
      name
      siret
      address
      postalCode
      city
      countryCode
      contact
      email
      mobile
      phone
      fax
      creationDate
      subscriptionDate
      keyedStart
      createdAt
      updatedAt
    }
  }
`;

export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
      id
      name
      siret
      address
      postalCode
      city
      countryCode
      contact
      email
      mobile
      phone
      fax
      creationDate
      subscriptionDate
      keyedStart
      createdAt
      updatedAt
    }
  }
`;

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      sub
      firstname
      lastname
      address
      mobile
      username
      email
      role
      accessType
      accessibleVehicles
      companyUsersId
      createdAt
      updatedAt
      company {
        id
        name
        email
        createdAt
        updatedAt
      }
    }
  }
`;

export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      sub
      firstname
      lastname
      address
      mobile
      username
      email
      role
      accessType
      accessibleVehicles
      companyUsersId
      createdAt
      updatedAt
      company {
        id
        name
        email
        createdAt
        updatedAt
      }
    }
  }
`;

export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      sub
      firstname
      lastname
      address
      mobile
      username
      email
      role
      accessType
      accessibleVehicles
      companyUsersId
      createdAt
      updatedAt
    }
  }
`;

export const createVehicle = /* GraphQL */ `
  mutation CreateVehicle(
    $input: CreateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    createVehicle(input: $input, condition: $condition) {
      immat
      nomVehicule
      marque
      AWN_model
      year
      fuelType
      consumption
      maxSpeed
      seatCount
      icon
      kilometerage
      kilometerPrice
      co2
      companyVehiclesId
      createdAt
      updatedAt
      company {
        id
        name
        email
        createdAt
        updatedAt
      }
      device {
        imei
        sim
        name
        enabled
        createdAt
        updatedAt
      }
    }
  }
`;

export const updateVehicle = /* GraphQL */ `
  mutation UpdateVehicle(
    $input: UpdateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    updateVehicle(input: $input, condition: $condition) {
      immat
      nomVehicule
      marque
      AWN_model
      year
      fuelType
      consumption
      maxSpeed
      seatCount
      icon
      kilometerage
      kilometerPrice
      co2
      companyVehiclesId
      createdAt
      updatedAt
      company {
        id
        name
        email
        createdAt
        updatedAt
      }
      device {
        imei
        sim
        name
        enabled
        createdAt
        updatedAt
      }
    }
  }
`;

export const deleteVehicle = /* GraphQL */ `
  mutation DeleteVehicle(
    $input: DeleteVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    deleteVehicle(input: $input, condition: $condition) {
      immat
      nomVehicule
      marque
      AWN_model
      year
      fuelType
      consumption
      maxSpeed
      seatCount
      icon
      kilometerage
      kilometerPrice
      co2
      companyVehiclesId
      createdAt
      updatedAt
    }
  }
`;

export const createDevice = /* GraphQL */ `
  mutation CreateDevice(
    $input: CreateDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    createDevice(input: $input, condition: $condition) {
      imei
      protocolId
      sim
      messages_ttl
      device_type_id
      flespi_id
      enabled
      media_ttl
      name
      cid
      media_rotate
      messages_rotate
      createdAt
      updatedAt
      vehicle {
        immat
        nomVehicule
        marque
        AWN_model
        companyVehiclesId
        createdAt
        updatedAt
      }
    }
  }
`;

export const updateDevice = /* GraphQL */ `
  mutation UpdateDevice(
    $input: UpdateDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    updateDevice(input: $input, condition: $condition) {
      imei
      protocolId
      sim
      messages_ttl
      device_type_id
      flespi_id
      enabled
      media_ttl
      name
      cid
      media_rotate
      messages_rotate
      createdAt
      updatedAt
      vehicle {
        immat
        nomVehicule
        marque
        AWN_model
        companyVehiclesId
        createdAt
        updatedAt
      }
    }
  }
`;

export const deleteDevice = /* GraphQL */ `
  mutation DeleteDevice(
    $input: DeleteDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    deleteDevice(input: $input, condition: $condition) {
      imei
      protocolId
      sim
      messages_ttl
      device_type_id
      flespi_id
      enabled
      media_ttl
      name
      cid
      media_rotate
      messages_rotate
      createdAt
      updatedAt
    }
  }
`;