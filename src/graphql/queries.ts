/* tslint:disable */
/* eslint-disable */
// this is an auto-generated file. This file will be overwritten

export const listCompanies = /* GraphQL */ `
  query ListCompanies(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        users {
          items {
            sub
            firstname
            lastname
            email
            role
            companyUsersId
            createdAt
            updatedAt
          }
          nextToken
        }
        vehicles {
          items {
            immat
            nomVehicule
            marque
            AWN_model
            year
            companyVehiclesId
            createdAt
            updatedAt
            device {
              imei
              sim
              name
              enabled
              createdAt
              updatedAt
            }
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;

export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;

export const listVehicles = /* GraphQL */ `
  query ListVehicles(
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVehicles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          protocolId
          device_type_id
          flespi_id
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;

export const listDevices = /* GraphQL */ `
  query ListDevices(
    $filter: ModelDeviceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDevices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;

export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
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
      users {
        items {
          sub
          firstname
          lastname
          email
          role
          companyUsersId
          createdAt
          updatedAt
        }
        nextToken
      }
      vehicles {
        items {
          immat
          nomVehicule
          marque
          AWN_model
          year
          companyVehiclesId
          createdAt
          updatedAt
          device {
            imei
            sim
            name
            enabled
            createdAt
            updatedAt
          }
        }
        nextToken
      }
    }
  }
`;

export const getUser = /* GraphQL */ `
  query GetUser($sub: String!) {
    getUser(sub: $sub) {
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

export const getVehicle = /* GraphQL */ `
  query GetVehicle($immat: String!) {
    getVehicle(immat: $immat) {
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
        protocolId
        device_type_id
        flespi_id
        createdAt
        updatedAt
      }
    }
  }
`;

export const getDevice = /* GraphQL */ `
  query GetDevice($imei: String!) {
    getDevice(imei: $imei) {
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