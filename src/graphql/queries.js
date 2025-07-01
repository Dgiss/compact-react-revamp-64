export const listCompanies = /* GraphQL */ `
  query ListCompanies(
    $id: ID
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCompanies(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            login
            motDePasse
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
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
`;

export const listUsers = /* GraphQL */ `
  query ListUsers(
    $sub: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      sub: $sub
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        sub
        firstname
        lastname
        mobile
        beginDate
        endDate
        mappingId
        languageCode
        lastModificationDate
        showReport
        dispatcher
        applicationVersion
        themeId
        companyUsersId
        login
        motDePasse
        company {
          id
          name
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
`;

export const vehiclesByCompanyVehiclesId = /* GraphQL */ `
  query VehiclesByCompanyVehiclesId(
    $companyVehiclesId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    vehiclesByCompanyVehiclesId(
      companyVehiclesId: $companyVehiclesId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      nextToken
      __typename
    }
  }
`;
