/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getTrajectoryHistory = /* GraphQL */ `query GetTrajectoryHistory(
  $driverSub: String
  $vehicleImmat: String
  $tagId: String
  $from: String!
  $to: String!
  $page: Int!
  $mode: ReportCallMode!
) {
  getTrajectoryHistory(
    driverSub: $driverSub
    vehicleImmat: $vehicleImmat
    tagId: $tagId
    from: $from
    to: $to
    page: $page
    mode: $mode
  ) {
    pagesCount
    currentPageNumber
    currentPageItemsCount
    fullItemsCount
    items {
      deviceId
      imei
      avgSpeed
      begin
      end
      groupingDate
      addressStart
      addressEnd
      distance
      eco
      acceleration
      braking
      totalDistance
      tempsArret
      duration
      idleTime
      maxSpeed
      vehicleImmat
      vehicleBrand
      driverSub
      driverFirstname
      driverLastname
      points {
        gisgraphyAddressFormatedPostal
        positionAltitude
        positionLatitude
        positionLongitude
        positionSatellites
        positionSpeed
        timestamp
        __typename
      }
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTrajectoryHistoryQueryVariables,
  APITypes.GetTrajectoryHistoryQuery
>;
export const getDailySummary = /* GraphQL */ `query GetDailySummary(
  $driverSub: String
  $vehicleImmat: String
  $tagId: String
  $from: String!
  $to: String!
  $page: Int!
  $mode: ReportCallMode!
) {
  getDailySummary(
    driverSub: $driverSub
    vehicleImmat: $vehicleImmat
    tagId: $tagId
    from: $from
    to: $to
    page: $page
    mode: $mode
  ) {
    pagesCount
    currentPageNumber
    currentPageItemsCount
    fullItemsCount
    items {
      begin
      end
      route
      duration
      distance
      totalMileage
      vehicleImmat
      vehicleBrand
      driverSub
      driverFirstname
      driverLastname
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetDailySummaryQueryVariables,
  APITypes.GetDailySummaryQuery
>;
export const getActivityReport = /* GraphQL */ `query GetActivityReport(
  $driverSub: String
  $vehicleImmat: String
  $tagId: String
  $from: String!
  $to: String!
  $page: Int!
  $mode: ReportCallMode!
) {
  getActivityReport(
    driverSub: $driverSub
    vehicleImmat: $vehicleImmat
    tagId: $tagId
    from: $from
    to: $to
    page: $page
    mode: $mode
  ) {
    pagesCount
    currentPageNumber
    currentPageItemsCount
    fullItemsCount
    items {
      begin
      end
      route
      duration
      totalMileage
      maxSpeed
      canMileageStart
      canMileageEnd
      totalCanMileage
      totalFuelConsumed
      vehicleImmat
      vehicleBrand
      driverSub
      driverFirstname
      driverLastname
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetActivityReportQueryVariables,
  APITypes.GetActivityReportQuery
>;
export const getFuelReport = /* GraphQL */ `query GetFuelReport(
  $driverSub: String
  $vehicleImmat: String
  $tagId: String
  $from: String!
  $to: String!
  $page: Int!
  $mode: ReportCallMode!
) {
  getFuelReport(
    driverSub: $driverSub
    vehicleImmat: $vehicleImmat
    tagId: $tagId
    from: $from
    to: $to
    page: $page
    mode: $mode
  ) {
    pagesCount
    currentPageNumber
    currentPageItemsCount
    fullItemsCount
    items {
      begin
      end
      duration
      fuelBefore
      fuelAfter
      fuelDelta
      distance
      lat
      lng
      vehicleImmat
      vehicleBrand
      driverSub
      driverFirstname
      driverLastname
      driverFullName
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetFuelReportQueryVariables,
  APITypes.GetFuelReportQuery
>;
export const getProximitySearch = /* GraphQL */ `query GetProximitySearch($address: String!, $companyId: ID!) {
  getProximitySearch(address: $address, companyId: $companyId) {
    id
    speed
    lat
    lng
    distance
    address
    azimut
    immobilisation
    timestamp
    state
    fuel
    ibuttonCode
    companyId
    driverFullName
    vehicleBrandName
    companyTramesId
    company {
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
        nextToken
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      zones {
        nextToken
        __typename
      }
      pois {
        nextToken
        __typename
      }
      drivers {
        nextToken
        __typename
      }
      trames {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    driver {
      sub
      firstname
      lastname
      password
      username
      fullname
      birthDate
      drivingLicenseNumber
      drivingLicenseType
      job
      hiringDate
      comment
      driverKey
      email
      mobile
      lastModificationDate
      code
      address
      agencyId
      cdc
      pdm
      nni
      companyDriversId
      company {
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
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    vehicle {
      immat
      code_certificat_qualite_air
      ad_blue
      AWN_genre
      emissions
      AWN_nom_commercial
      AWN_numero_de_serie
      AWN_niveau_de_bruit_au_ralenti
      AWN_consommation_ex_urbaine
      AWN_consommation_urbaine
      AWN_max_speed
      AWN_emission_co_2_prf
      AWN_depollution
      AWN_nbr_soupapes
      AWN_nbr_vitesses
      AWN_nbr_portes
      AWN_nbr_places
      AWN_propulsion
      AWN_date_30
      AWN_date_cg
      AWN_collection
      AWN_segment
      AWN_type_frein
      AWN_group
      AWN_VIN
      AWN_k_type
      AWN_version
      AWN_label
      AWN_code_moteur
      AWN_nbr_cylindre_energie
      AWN_nbr_cylindres
      AWN_energie_code
      AWN_mode_injection
      AWN_type_injection
      AWN_turbo_compressor
      AWN_vitesse_moteur
      AWN_generation
      AWN_poids_total
      AWN_poids_vide
      AWN_poids_total_roulant
      AWN_consommation_mixte
      ad_green
      AWN_poids_max_autorise
      depollution
      cl_environ_prf
      AWN_model
      AWN_model_image
      dateMiseEnCirculation
      puissanceFiscale
      puissanceDin
      energie
      AWN_puissance_KW
      boiteVitesse
      couleur
      carrosserie
      marque
      marque_id
      modele_id
      version
      immatriculation
      VIN
      k_type
      type_mine
      AWN_url_image
      year
      fuelType
      consumption
      maxSpeed
      seatCount
      icon
      picture {
        bucket
        region
        key
        __typename
      }
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
      nomVehicule
      vehicleCategory {
        id
        category
        description
        createdAt
        updatedAt
        __typename
      }
      brand {
        brandName
        createdAt
        updatedAt
        __typename
      }
      modele {
        id
        modele
        createdAt
        updatedAt
        vehicleBrandModelsBrandName
        __typename
      }
      gefcoSend
      tankCapacity
      canMileage
      companyVehiclesId
      company {
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
        __typename
      }
      device {
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
        deviceVehicleImmat
        __typename
      }
      alerts {
        nextToken
        __typename
      }
      tags {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      vehicleVehicleCategoryId
      vehicleBrandBrandName
      vehicleModeleId
      vehicleDeviceImei
      __typename
    }
    processor
    createdAt
    updatedAt
    trameDriverSub
    trameVehicleImmat
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetProximitySearchQueryVariables,
  APITypes.GetProximitySearchQuery
>;
export const getCompany = /* GraphQL */ `query GetCompany($id: ID!) {
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
    users {
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
    vehicles {
      items {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      nextToken
      __typename
    }
    zones {
      items {
        id
        name
        adress
        lat
        lng
        radius
        companyZonesId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    pois {
      items {
        id
        name
        adress
        lat
        lng
        companyPoisId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    drivers {
      items {
        sub
        firstname
        lastname
        password
        username
        fullname
        birthDate
        drivingLicenseNumber
        drivingLicenseType
        job
        hiringDate
        comment
        driverKey
        email
        mobile
        lastModificationDate
        code
        address
        agencyId
        cdc
        pdm
        nni
        companyDriversId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    trames {
      items {
        id
        speed
        lat
        lng
        distance
        address
        azimut
        immobilisation
        timestamp
        state
        fuel
        ibuttonCode
        companyId
        driverFullName
        vehicleBrandName
        companyTramesId
        processor
        createdAt
        updatedAt
        trameDriverSub
        trameVehicleImmat
        __typename
      }
      nextToken
      __typename
    }
    maintenances {
      items {
        id
        operationType
        status
        reminderDays
        alertDate
        cost
        email
        notes
        creationDate
        lastModificationDate
        companyMaintenancesId
        vehicleMaintenancesImmat
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    depenses {
      items {
        id
        vehicleImmat
        typeDepenseId
        prestataire
        montantTTC
        montantHT
        associateDate
        produit
        ville
        qte
        description
        companyDepensesId
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
` as GeneratedQuery<
  APITypes.GetCompanyQueryVariables,
  APITypes.GetCompanyQuery
>;
export const listCompanies = /* GraphQL */ `query ListCompanies(
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
        nextToken
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      zones {
        nextToken
        __typename
      }
      pois {
        nextToken
        __typename
      }
      drivers {
        nextToken
        __typename
      }
      trames {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
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
` as GeneratedQuery<
  APITypes.ListCompaniesQueryVariables,
  APITypes.ListCompaniesQuery
>;
export const getUser = /* GraphQL */ `query GetUser($sub: String!) {
  getUser(sub: $sub) {
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
    picture {
      bucket
      region
      key
      __typename
    }
    role
    accessExpiresAt
    accessType
    accessibleVehicles
    companyUsersId
    company {
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
        nextToken
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      zones {
        nextToken
        __typename
      }
      pois {
        nextToken
        __typename
      }
      drivers {
        nextToken
        __typename
      }
      trames {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
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
      picture {
        bucket
        region
        key
        __typename
      }
      role
      accessExpiresAt
      accessType
      accessibleVehicles
      companyUsersId
      company {
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
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const usersByRole = /* GraphQL */ `query UsersByRole(
  $role: UserRole!
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  usersByRole(
    role: $role
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
      picture {
        bucket
        region
        key
        __typename
      }
      role
      accessExpiresAt
      accessType
      accessibleVehicles
      companyUsersId
      company {
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
` as GeneratedQuery<
  APITypes.UsersByRoleQueryVariables,
  APITypes.UsersByRoleQuery
>;
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
      picture {
        bucket
        region
        key
        __typename
      }
      role
      accessExpiresAt
      accessType
      accessibleVehicles
      companyUsersId
      company {
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
` as GeneratedQuery<
  APITypes.UsersByCompanyUsersIdQueryVariables,
  APITypes.UsersByCompanyUsersIdQuery
>;
export const getDriver = /* GraphQL */ `query GetDriver($sub: String!) {
  getDriver(sub: $sub) {
    sub
    firstname
    lastname
    password
    username
    fullname
    birthDate
    drivingLicenseNumber
    drivingLicenseType
    job
    hiringDate
    comment
    driverKey
    email
    mobile
    lastModificationDate
    code
    address
    agencyId
    cdc
    pdm
    nni
    companyDriversId
    company {
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
        nextToken
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      zones {
        nextToken
        __typename
      }
      pois {
        nextToken
        __typename
      }
      drivers {
        nextToken
        __typename
      }
      trames {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetDriverQueryVariables, APITypes.GetDriverQuery>;
export const listDrivers = /* GraphQL */ `query ListDrivers(
  $sub: String
  $filter: ModelDriverFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listDrivers(
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
      password
      username
      fullname
      birthDate
      drivingLicenseNumber
      drivingLicenseType
      job
      hiringDate
      comment
      driverKey
      email
      mobile
      lastModificationDate
      code
      address
      agencyId
      cdc
      pdm
      nni
      companyDriversId
      company {
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
` as GeneratedQuery<
  APITypes.ListDriversQueryVariables,
  APITypes.ListDriversQuery
>;
export const driversByDriverKey = /* GraphQL */ `query DriversByDriverKey(
  $driverKey: String!
  $sortDirection: ModelSortDirection
  $filter: ModelDriverFilterInput
  $limit: Int
  $nextToken: String
) {
  driversByDriverKey(
    driverKey: $driverKey
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      sub
      firstname
      lastname
      password
      username
      fullname
      birthDate
      drivingLicenseNumber
      drivingLicenseType
      job
      hiringDate
      comment
      driverKey
      email
      mobile
      lastModificationDate
      code
      address
      agencyId
      cdc
      pdm
      nni
      companyDriversId
      company {
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
` as GeneratedQuery<
  APITypes.DriversByDriverKeyQueryVariables,
  APITypes.DriversByDriverKeyQuery
>;
export const driversByCompanyDriversId = /* GraphQL */ `query DriversByCompanyDriversId(
  $companyDriversId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelDriverFilterInput
  $limit: Int
  $nextToken: String
) {
  driversByCompanyDriversId(
    companyDriversId: $companyDriversId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      sub
      firstname
      lastname
      password
      username
      fullname
      birthDate
      drivingLicenseNumber
      drivingLicenseType
      job
      hiringDate
      comment
      driverKey
      email
      mobile
      lastModificationDate
      code
      address
      agencyId
      cdc
      pdm
      nni
      companyDriversId
      company {
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
` as GeneratedQuery<
  APITypes.DriversByCompanyDriversIdQueryVariables,
  APITypes.DriversByCompanyDriversIdQuery
>;
export const getVehicle = /* GraphQL */ `query GetVehicle($immat: String!) {
  getVehicle(immat: $immat) {
    immat
    code_certificat_qualite_air
    ad_blue
    AWN_genre
    emissions
    AWN_nom_commercial
    AWN_numero_de_serie
    AWN_niveau_de_bruit_au_ralenti
    AWN_consommation_ex_urbaine
    AWN_consommation_urbaine
    AWN_max_speed
    AWN_emission_co_2_prf
    AWN_depollution
    AWN_nbr_soupapes
    AWN_nbr_vitesses
    AWN_nbr_portes
    AWN_nbr_places
    AWN_propulsion
    AWN_date_30
    AWN_date_cg
    AWN_collection
    AWN_segment
    AWN_type_frein
    AWN_group
    AWN_VIN
    AWN_k_type
    AWN_version
    AWN_label
    AWN_code_moteur
    AWN_nbr_cylindre_energie
    AWN_nbr_cylindres
    AWN_energie_code
    AWN_mode_injection
    AWN_type_injection
    AWN_turbo_compressor
    AWN_vitesse_moteur
    AWN_generation
    AWN_poids_total
    AWN_poids_vide
    AWN_poids_total_roulant
    AWN_consommation_mixte
    ad_green
    AWN_poids_max_autorise
    depollution
    cl_environ_prf
    AWN_model
    AWN_model_image
    dateMiseEnCirculation
    puissanceFiscale
    puissanceDin
    energie
    AWN_puissance_KW
    boiteVitesse
    couleur
    carrosserie
    marque
    marque_id
    modele_id
    version
    immatriculation
    VIN
    k_type
    type_mine
    AWN_url_image
    year
    fuelType
    consumption
    maxSpeed
    seatCount
    icon
    picture {
      bucket
      region
      key
      __typename
    }
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
    nomVehicule
    vehicleCategory {
      id
      category
      description
      createdAt
      updatedAt
      __typename
    }
    brand {
      brandName
      logo {
        bucket
        region
        key
        __typename
      }
      models {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    modele {
      id
      modele
      brand {
        brandName
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      vehicleBrandModelsBrandName
      __typename
    }
    gefcoSend
    tankCapacity
    canMileage
    companyVehiclesId
    company {
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
        nextToken
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      zones {
        nextToken
        __typename
      }
      pois {
        nextToken
        __typename
      }
      drivers {
        nextToken
        __typename
      }
      trames {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    device {
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
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      createdAt
      updatedAt
      deviceVehicleImmat
      __typename
    }
    alerts {
      items {
        id
        vehicleImmat
        alertId
        isFlespi
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    tags {
      items {
        id
        vehicleImmat
        tagId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    maintenances {
      items {
        id
        operationType
        status
        reminderDays
        alertDate
        cost
        email
        notes
        creationDate
        lastModificationDate
        companyMaintenancesId
        vehicleMaintenancesImmat
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    depenses {
      items {
        id
        vehicleImmat
        typeDepenseId
        prestataire
        montantTTC
        montantHT
        associateDate
        produit
        ville
        qte
        description
        companyDepensesId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    vehicleVehicleCategoryId
    vehicleBrandBrandName
    vehicleModeleId
    vehicleDeviceImei
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVehicleQueryVariables,
  APITypes.GetVehicleQuery
>;
export const listVehicles = /* GraphQL */ `query ListVehicles(
  $immat: String
  $filter: ModelVehicleFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listVehicles(
    immat: $immat
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      immat
      code_certificat_qualite_air
      ad_blue
      AWN_genre
      emissions
      AWN_nom_commercial
      AWN_numero_de_serie
      AWN_niveau_de_bruit_au_ralenti
      AWN_consommation_ex_urbaine
      AWN_consommation_urbaine
      AWN_max_speed
      AWN_emission_co_2_prf
      AWN_depollution
      AWN_nbr_soupapes
      AWN_nbr_vitesses
      AWN_nbr_portes
      AWN_nbr_places
      AWN_propulsion
      AWN_date_30
      AWN_date_cg
      AWN_collection
      AWN_segment
      AWN_type_frein
      AWN_group
      AWN_VIN
      AWN_k_type
      AWN_version
      AWN_label
      AWN_code_moteur
      AWN_nbr_cylindre_energie
      AWN_nbr_cylindres
      AWN_energie_code
      AWN_mode_injection
      AWN_type_injection
      AWN_turbo_compressor
      AWN_vitesse_moteur
      AWN_generation
      AWN_poids_total
      AWN_poids_vide
      AWN_poids_total_roulant
      AWN_consommation_mixte
      ad_green
      AWN_poids_max_autorise
      depollution
      cl_environ_prf
      AWN_model
      AWN_model_image
      dateMiseEnCirculation
      puissanceFiscale
      puissanceDin
      energie
      AWN_puissance_KW
      boiteVitesse
      couleur
      carrosserie
      marque
      marque_id
      modele_id
      version
      immatriculation
      VIN
      k_type
      type_mine
      AWN_url_image
      year
      fuelType
      consumption
      maxSpeed
      seatCount
      icon
      picture {
        bucket
        region
        key
        __typename
      }
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
      nomVehicule
      vehicleCategory {
        id
        category
        description
        createdAt
        updatedAt
        __typename
      }
      brand {
        brandName
        createdAt
        updatedAt
        __typename
      }
      modele {
        id
        modele
        createdAt
        updatedAt
        vehicleBrandModelsBrandName
        __typename
      }
      gefcoSend
      tankCapacity
      canMileage
      companyVehiclesId
      company {
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
        __typename
      }
      device {
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
        deviceVehicleImmat
        __typename
      }
      alerts {
        nextToken
        __typename
      }
      tags {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
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
` as GeneratedQuery<
  APITypes.ListVehiclesQueryVariables,
  APITypes.ListVehiclesQuery
>;
export const vehiclesByCompanyVehiclesId = /* GraphQL */ `query VehiclesByCompanyVehiclesId(
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
      code_certificat_qualite_air
      ad_blue
      AWN_genre
      emissions
      AWN_nom_commercial
      AWN_numero_de_serie
      AWN_niveau_de_bruit_au_ralenti
      AWN_consommation_ex_urbaine
      AWN_consommation_urbaine
      AWN_max_speed
      AWN_emission_co_2_prf
      AWN_depollution
      AWN_nbr_soupapes
      AWN_nbr_vitesses
      AWN_nbr_portes
      AWN_nbr_places
      AWN_propulsion
      AWN_date_30
      AWN_date_cg
      AWN_collection
      AWN_segment
      AWN_type_frein
      AWN_group
      AWN_VIN
      AWN_k_type
      AWN_version
      AWN_label
      AWN_code_moteur
      AWN_nbr_cylindre_energie
      AWN_nbr_cylindres
      AWN_energie_code
      AWN_mode_injection
      AWN_type_injection
      AWN_turbo_compressor
      AWN_vitesse_moteur
      AWN_generation
      AWN_poids_total
      AWN_poids_vide
      AWN_poids_total_roulant
      AWN_consommation_mixte
      ad_green
      AWN_poids_max_autorise
      depollution
      cl_environ_prf
      AWN_model
      AWN_model_image
      dateMiseEnCirculation
      puissanceFiscale
      puissanceDin
      energie
      AWN_puissance_KW
      boiteVitesse
      couleur
      carrosserie
      marque
      marque_id
      modele_id
      version
      immatriculation
      VIN
      k_type
      type_mine
      AWN_url_image
      year
      fuelType
      consumption
      maxSpeed
      seatCount
      icon
      picture {
        bucket
        region
        key
        __typename
      }
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
      nomVehicule
      vehicleCategory {
        id
        category
        description
        createdAt
        updatedAt
        __typename
      }
      brand {
        brandName
        createdAt
        updatedAt
        __typename
      }
      modele {
        id
        modele
        createdAt
        updatedAt
        vehicleBrandModelsBrandName
        __typename
      }
      gefcoSend
      tankCapacity
      canMileage
      companyVehiclesId
      company {
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
        __typename
      }
      device {
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
        deviceVehicleImmat
        __typename
      }
      alerts {
        nextToken
        __typename
      }
      tags {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
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
` as GeneratedQuery<
  APITypes.VehiclesByCompanyVehiclesIdQueryVariables,
  APITypes.VehiclesByCompanyVehiclesIdQuery
>;
export const getAlert = /* GraphQL */ `query GetAlert($id: ID!) {
  getAlert(id: $id) {
    id
    name
    type
    typeLabel
    disabled
    instantaneous
    reportFrequency
    byMail
    bySms
    byWhatsapp
    smsTemplate
    emailTemplate
    sentToDriver
    phones
    emails
    company {
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
        nextToken
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      zones {
        nextToken
        __typename
      }
      pois {
        nextToken
        __typename
      }
      drivers {
        nextToken
        __typename
      }
      trames {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    vehicles {
      items {
        id
        vehicleImmat
        alertId
        isFlespi
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    extra
    zone {
      id
      name
      adress
      lat
      lng
      radius
      companyZonesId
      company {
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
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    alertCompanyId
    alertZoneId
    __typename
  }
}
` as GeneratedQuery<APITypes.GetAlertQueryVariables, APITypes.GetAlertQuery>;
export const listAlerts = /* GraphQL */ `query ListAlerts(
  $id: ID
  $filter: ModelAlertFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listAlerts(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      name
      type
      typeLabel
      disabled
      instantaneous
      reportFrequency
      byMail
      bySms
      byWhatsapp
      smsTemplate
      emailTemplate
      sentToDriver
      phones
      emails
      company {
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
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      extra
      zone {
        id
        name
        adress
        lat
        lng
        radius
        companyZonesId
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      alertCompanyId
      alertZoneId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAlertsQueryVariables,
  APITypes.ListAlertsQuery
>;
export const getVehicleAlerts = /* GraphQL */ `query GetVehicleAlerts($id: ID!) {
  getVehicleAlerts(id: $id) {
    id
    vehicleImmat
    vehicle {
      immat
      code_certificat_qualite_air
      ad_blue
      AWN_genre
      emissions
      AWN_nom_commercial
      AWN_numero_de_serie
      AWN_niveau_de_bruit_au_ralenti
      AWN_consommation_ex_urbaine
      AWN_consommation_urbaine
      AWN_max_speed
      AWN_emission_co_2_prf
      AWN_depollution
      AWN_nbr_soupapes
      AWN_nbr_vitesses
      AWN_nbr_portes
      AWN_nbr_places
      AWN_propulsion
      AWN_date_30
      AWN_date_cg
      AWN_collection
      AWN_segment
      AWN_type_frein
      AWN_group
      AWN_VIN
      AWN_k_type
      AWN_version
      AWN_label
      AWN_code_moteur
      AWN_nbr_cylindre_energie
      AWN_nbr_cylindres
      AWN_energie_code
      AWN_mode_injection
      AWN_type_injection
      AWN_turbo_compressor
      AWN_vitesse_moteur
      AWN_generation
      AWN_poids_total
      AWN_poids_vide
      AWN_poids_total_roulant
      AWN_consommation_mixte
      ad_green
      AWN_poids_max_autorise
      depollution
      cl_environ_prf
      AWN_model
      AWN_model_image
      dateMiseEnCirculation
      puissanceFiscale
      puissanceDin
      energie
      AWN_puissance_KW
      boiteVitesse
      couleur
      carrosserie
      marque
      marque_id
      modele_id
      version
      immatriculation
      VIN
      k_type
      type_mine
      AWN_url_image
      year
      fuelType
      consumption
      maxSpeed
      seatCount
      icon
      picture {
        bucket
        region
        key
        __typename
      }
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
      nomVehicule
      vehicleCategory {
        id
        category
        description
        createdAt
        updatedAt
        __typename
      }
      brand {
        brandName
        createdAt
        updatedAt
        __typename
      }
      modele {
        id
        modele
        createdAt
        updatedAt
        vehicleBrandModelsBrandName
        __typename
      }
      gefcoSend
      tankCapacity
      canMileage
      companyVehiclesId
      company {
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
        __typename
      }
      device {
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
        deviceVehicleImmat
        __typename
      }
      alerts {
        nextToken
        __typename
      }
      tags {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      vehicleVehicleCategoryId
      vehicleBrandBrandName
      vehicleModeleId
      vehicleDeviceImei
      __typename
    }
    alertId
    alert {
      id
      name
      type
      typeLabel
      disabled
      instantaneous
      reportFrequency
      byMail
      bySms
      byWhatsapp
      smsTemplate
      emailTemplate
      sentToDriver
      phones
      emails
      company {
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
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      extra
      zone {
        id
        name
        adress
        lat
        lng
        radius
        companyZonesId
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      alertCompanyId
      alertZoneId
      __typename
    }
    isFlespi
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVehicleAlertsQueryVariables,
  APITypes.GetVehicleAlertsQuery
>;
export const listVehicleAlerts = /* GraphQL */ `query ListVehicleAlerts(
  $id: ID
  $filter: ModelVehicleAlertsFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listVehicleAlerts(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      vehicleImmat
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      alertId
      alert {
        id
        name
        type
        typeLabel
        disabled
        instantaneous
        reportFrequency
        byMail
        bySms
        byWhatsapp
        smsTemplate
        emailTemplate
        sentToDriver
        phones
        emails
        extra
        createdAt
        updatedAt
        alertCompanyId
        alertZoneId
        __typename
      }
      isFlespi
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListVehicleAlertsQueryVariables,
  APITypes.ListVehicleAlertsQuery
>;
export const vehicleAlertsByVehicleImmat = /* GraphQL */ `query VehicleAlertsByVehicleImmat(
  $vehicleImmat: String!
  $sortDirection: ModelSortDirection
  $filter: ModelVehicleAlertsFilterInput
  $limit: Int
  $nextToken: String
) {
  vehicleAlertsByVehicleImmat(
    vehicleImmat: $vehicleImmat
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      vehicleImmat
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      alertId
      alert {
        id
        name
        type
        typeLabel
        disabled
        instantaneous
        reportFrequency
        byMail
        bySms
        byWhatsapp
        smsTemplate
        emailTemplate
        sentToDriver
        phones
        emails
        extra
        createdAt
        updatedAt
        alertCompanyId
        alertZoneId
        __typename
      }
      isFlespi
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.VehicleAlertsByVehicleImmatQueryVariables,
  APITypes.VehicleAlertsByVehicleImmatQuery
>;
export const vehicleAlertsByAlertId = /* GraphQL */ `query VehicleAlertsByAlertId(
  $alertId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelVehicleAlertsFilterInput
  $limit: Int
  $nextToken: String
) {
  vehicleAlertsByAlertId(
    alertId: $alertId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      vehicleImmat
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      alertId
      alert {
        id
        name
        type
        typeLabel
        disabled
        instantaneous
        reportFrequency
        byMail
        bySms
        byWhatsapp
        smsTemplate
        emailTemplate
        sentToDriver
        phones
        emails
        extra
        createdAt
        updatedAt
        alertCompanyId
        alertZoneId
        __typename
      }
      isFlespi
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.VehicleAlertsByAlertIdQueryVariables,
  APITypes.VehicleAlertsByAlertIdQuery
>;
export const getAlertDefinition = /* GraphQL */ `query GetAlertDefinition($key: AlertType!) {
  getAlertDefinition(key: $key) {
    key
    label
    description
    isFlespi
    calculator
    variables
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAlertDefinitionQueryVariables,
  APITypes.GetAlertDefinitionQuery
>;
export const listAlertDefinitions = /* GraphQL */ `query ListAlertDefinitions(
  $key: AlertType
  $filter: ModelAlertDefinitionFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listAlertDefinitions(
    key: $key
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      key
      label
      description
      isFlespi
      calculator
      variables
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAlertDefinitionsQueryVariables,
  APITypes.ListAlertDefinitionsQuery
>;
export const getVehicleAlertState = /* GraphQL */ `query GetVehicleAlertState($id: String!) {
  getVehicleAlertState(id: $id) {
    id
    alert
    state
    timestamp
    zone {
      id
      name
      adress
      lat
      lng
      radius
      companyZonesId
      company {
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
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    vehicle {
      immat
      code_certificat_qualite_air
      ad_blue
      AWN_genre
      emissions
      AWN_nom_commercial
      AWN_numero_de_serie
      AWN_niveau_de_bruit_au_ralenti
      AWN_consommation_ex_urbaine
      AWN_consommation_urbaine
      AWN_max_speed
      AWN_emission_co_2_prf
      AWN_depollution
      AWN_nbr_soupapes
      AWN_nbr_vitesses
      AWN_nbr_portes
      AWN_nbr_places
      AWN_propulsion
      AWN_date_30
      AWN_date_cg
      AWN_collection
      AWN_segment
      AWN_type_frein
      AWN_group
      AWN_VIN
      AWN_k_type
      AWN_version
      AWN_label
      AWN_code_moteur
      AWN_nbr_cylindre_energie
      AWN_nbr_cylindres
      AWN_energie_code
      AWN_mode_injection
      AWN_type_injection
      AWN_turbo_compressor
      AWN_vitesse_moteur
      AWN_generation
      AWN_poids_total
      AWN_poids_vide
      AWN_poids_total_roulant
      AWN_consommation_mixte
      ad_green
      AWN_poids_max_autorise
      depollution
      cl_environ_prf
      AWN_model
      AWN_model_image
      dateMiseEnCirculation
      puissanceFiscale
      puissanceDin
      energie
      AWN_puissance_KW
      boiteVitesse
      couleur
      carrosserie
      marque
      marque_id
      modele_id
      version
      immatriculation
      VIN
      k_type
      type_mine
      AWN_url_image
      year
      fuelType
      consumption
      maxSpeed
      seatCount
      icon
      picture {
        bucket
        region
        key
        __typename
      }
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
      nomVehicule
      vehicleCategory {
        id
        category
        description
        createdAt
        updatedAt
        __typename
      }
      brand {
        brandName
        createdAt
        updatedAt
        __typename
      }
      modele {
        id
        modele
        createdAt
        updatedAt
        vehicleBrandModelsBrandName
        __typename
      }
      gefcoSend
      tankCapacity
      canMileage
      companyVehiclesId
      company {
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
        __typename
      }
      device {
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
        deviceVehicleImmat
        __typename
      }
      alerts {
        nextToken
        __typename
      }
      tags {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      vehicleVehicleCategoryId
      vehicleBrandBrandName
      vehicleModeleId
      vehicleDeviceImei
      __typename
    }
    createdAt
    updatedAt
    vehicleAlertStateZoneId
    vehicleAlertStateVehicleImmat
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVehicleAlertStateQueryVariables,
  APITypes.GetVehicleAlertStateQuery
>;
export const listVehicleAlertStates = /* GraphQL */ `query ListVehicleAlertStates(
  $id: String
  $filter: ModelVehicleAlertStateFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listVehicleAlertStates(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      alert
      state
      timestamp
      zone {
        id
        name
        adress
        lat
        lng
        radius
        companyZonesId
        createdAt
        updatedAt
        __typename
      }
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      createdAt
      updatedAt
      vehicleAlertStateZoneId
      vehicleAlertStateVehicleImmat
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListVehicleAlertStatesQueryVariables,
  APITypes.ListVehicleAlertStatesQuery
>;
export const getAlertHistory = /* GraphQL */ `query GetAlertHistory($id: ID!) {
  getAlertHistory(id: $id) {
    id
    type
    imei
    vehicle {
      immat
      code_certificat_qualite_air
      ad_blue
      AWN_genre
      emissions
      AWN_nom_commercial
      AWN_numero_de_serie
      AWN_niveau_de_bruit_au_ralenti
      AWN_consommation_ex_urbaine
      AWN_consommation_urbaine
      AWN_max_speed
      AWN_emission_co_2_prf
      AWN_depollution
      AWN_nbr_soupapes
      AWN_nbr_vitesses
      AWN_nbr_portes
      AWN_nbr_places
      AWN_propulsion
      AWN_date_30
      AWN_date_cg
      AWN_collection
      AWN_segment
      AWN_type_frein
      AWN_group
      AWN_VIN
      AWN_k_type
      AWN_version
      AWN_label
      AWN_code_moteur
      AWN_nbr_cylindre_energie
      AWN_nbr_cylindres
      AWN_energie_code
      AWN_mode_injection
      AWN_type_injection
      AWN_turbo_compressor
      AWN_vitesse_moteur
      AWN_generation
      AWN_poids_total
      AWN_poids_vide
      AWN_poids_total_roulant
      AWN_consommation_mixte
      ad_green
      AWN_poids_max_autorise
      depollution
      cl_environ_prf
      AWN_model
      AWN_model_image
      dateMiseEnCirculation
      puissanceFiscale
      puissanceDin
      energie
      AWN_puissance_KW
      boiteVitesse
      couleur
      carrosserie
      marque
      marque_id
      modele_id
      version
      immatriculation
      VIN
      k_type
      type_mine
      AWN_url_image
      year
      fuelType
      consumption
      maxSpeed
      seatCount
      icon
      picture {
        bucket
        region
        key
        __typename
      }
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
      nomVehicule
      vehicleCategory {
        id
        category
        description
        createdAt
        updatedAt
        __typename
      }
      brand {
        brandName
        createdAt
        updatedAt
        __typename
      }
      modele {
        id
        modele
        createdAt
        updatedAt
        vehicleBrandModelsBrandName
        __typename
      }
      gefcoSend
      tankCapacity
      canMileage
      companyVehiclesId
      company {
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
        __typename
      }
      device {
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
        deviceVehicleImmat
        __typename
      }
      alerts {
        nextToken
        __typename
      }
      tags {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      vehicleVehicleCategoryId
      vehicleBrandBrandName
      vehicleModeleId
      vehicleDeviceImei
      __typename
    }
    driver {
      sub
      firstname
      lastname
      password
      username
      fullname
      birthDate
      drivingLicenseNumber
      drivingLicenseType
      job
      hiringDate
      comment
      driverKey
      email
      mobile
      lastModificationDate
      code
      address
      agencyId
      cdc
      pdm
      nni
      companyDriversId
      company {
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
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    company {
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
        nextToken
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      zones {
        nextToken
        __typename
      }
      pois {
        nextToken
        __typename
      }
      drivers {
        nextToken
        __typename
      }
      trames {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    timestamp
    config {
      id
      name
      type
      typeLabel
      disabled
      instantaneous
      reportFrequency
      byMail
      bySms
      byWhatsapp
      smsTemplate
      emailTemplate
      sentToDriver
      phones
      emails
      company {
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
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      extra
      zone {
        id
        name
        adress
        lat
        lng
        radius
        companyZonesId
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      alertCompanyId
      alertZoneId
      __typename
    }
    data
    createdAt
    updatedAt
    alertHistoryVehicleImmat
    alertHistoryDriverSub
    alertHistoryCompanyId
    alertHistoryConfigId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAlertHistoryQueryVariables,
  APITypes.GetAlertHistoryQuery
>;
export const listAlertHistories = /* GraphQL */ `query ListAlertHistories(
  $id: ID
  $filter: ModelAlertHistoryFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listAlertHistories(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      type
      imei
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      driver {
        sub
        firstname
        lastname
        password
        username
        fullname
        birthDate
        drivingLicenseNumber
        drivingLicenseType
        job
        hiringDate
        comment
        driverKey
        email
        mobile
        lastModificationDate
        code
        address
        agencyId
        cdc
        pdm
        nni
        companyDriversId
        createdAt
        updatedAt
        __typename
      }
      company {
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
        __typename
      }
      timestamp
      config {
        id
        name
        type
        typeLabel
        disabled
        instantaneous
        reportFrequency
        byMail
        bySms
        byWhatsapp
        smsTemplate
        emailTemplate
        sentToDriver
        phones
        emails
        extra
        createdAt
        updatedAt
        alertCompanyId
        alertZoneId
        __typename
      }
      data
      createdAt
      updatedAt
      alertHistoryVehicleImmat
      alertHistoryDriverSub
      alertHistoryCompanyId
      alertHistoryConfigId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAlertHistoriesQueryVariables,
  APITypes.ListAlertHistoriesQuery
>;
export const getZone = /* GraphQL */ `query GetZone($id: ID!) {
  getZone(id: $id) {
    id
    name
    adress
    lat
    lng
    radius
    companyZonesId
    company {
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
        nextToken
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      zones {
        nextToken
        __typename
      }
      pois {
        nextToken
        __typename
      }
      drivers {
        nextToken
        __typename
      }
      trames {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetZoneQueryVariables, APITypes.GetZoneQuery>;
export const listZones = /* GraphQL */ `query ListZones(
  $filter: ModelZoneFilterInput
  $limit: Int
  $nextToken: String
) {
  listZones(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      adress
      lat
      lng
      radius
      companyZonesId
      company {
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
` as GeneratedQuery<APITypes.ListZonesQueryVariables, APITypes.ListZonesQuery>;
export const zonesByCompanyZonesId = /* GraphQL */ `query ZonesByCompanyZonesId(
  $companyZonesId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelZoneFilterInput
  $limit: Int
  $nextToken: String
) {
  zonesByCompanyZonesId(
    companyZonesId: $companyZonesId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      adress
      lat
      lng
      radius
      companyZonesId
      company {
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
` as GeneratedQuery<
  APITypes.ZonesByCompanyZonesIdQueryVariables,
  APITypes.ZonesByCompanyZonesIdQuery
>;
export const getPoi = /* GraphQL */ `query GetPoi($id: ID!) {
  getPoi(id: $id) {
    id
    name
    adress
    lat
    lng
    companyPoisId
    company {
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
        nextToken
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      zones {
        nextToken
        __typename
      }
      pois {
        nextToken
        __typename
      }
      drivers {
        nextToken
        __typename
      }
      trames {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetPoiQueryVariables, APITypes.GetPoiQuery>;
export const listPois = /* GraphQL */ `query ListPois($filter: ModelPoiFilterInput, $limit: Int, $nextToken: String) {
  listPois(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      adress
      lat
      lng
      companyPoisId
      company {
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
` as GeneratedQuery<APITypes.ListPoisQueryVariables, APITypes.ListPoisQuery>;
export const poisByCompanyPoisId = /* GraphQL */ `query PoisByCompanyPoisId(
  $companyPoisId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelPoiFilterInput
  $limit: Int
  $nextToken: String
) {
  poisByCompanyPoisId(
    companyPoisId: $companyPoisId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      adress
      lat
      lng
      companyPoisId
      company {
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
` as GeneratedQuery<
  APITypes.PoisByCompanyPoisIdQueryVariables,
  APITypes.PoisByCompanyPoisIdQuery
>;
export const getVehicleCategory = /* GraphQL */ `query GetVehicleCategory($id: ID!) {
  getVehicleCategory(id: $id) {
    id
    category
    description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVehicleCategoryQueryVariables,
  APITypes.GetVehicleCategoryQuery
>;
export const listVehicleCategories = /* GraphQL */ `query ListVehicleCategories(
  $id: ID
  $filter: ModelVehicleCategoryFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listVehicleCategories(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      category
      description
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListVehicleCategoriesQueryVariables,
  APITypes.ListVehicleCategoriesQuery
>;
export const getVehicleBrand = /* GraphQL */ `query GetVehicleBrand($brandName: String!) {
  getVehicleBrand(brandName: $brandName) {
    brandName
    logo {
      bucket
      region
      key
      __typename
    }
    models {
      items {
        id
        modele
        createdAt
        updatedAt
        vehicleBrandModelsBrandName
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
` as GeneratedQuery<
  APITypes.GetVehicleBrandQueryVariables,
  APITypes.GetVehicleBrandQuery
>;
export const listVehicleBrands = /* GraphQL */ `query ListVehicleBrands(
  $brandName: String
  $filter: ModelVehicleBrandFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listVehicleBrands(
    brandName: $brandName
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      brandName
      logo {
        bucket
        region
        key
        __typename
      }
      models {
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
` as GeneratedQuery<
  APITypes.ListVehicleBrandsQueryVariables,
  APITypes.ListVehicleBrandsQuery
>;
export const getVehicleModel = /* GraphQL */ `query GetVehicleModel($id: ID!) {
  getVehicleModel(id: $id) {
    id
    modele
    brand {
      brandName
      logo {
        bucket
        region
        key
        __typename
      }
      models {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    vehicleBrandModelsBrandName
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVehicleModelQueryVariables,
  APITypes.GetVehicleModelQuery
>;
export const listVehicleModels = /* GraphQL */ `query ListVehicleModels(
  $id: ID
  $filter: ModelVehicleModelFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listVehicleModels(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      modele
      brand {
        brandName
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      vehicleBrandModelsBrandName
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListVehicleModelsQueryVariables,
  APITypes.ListVehicleModelsQuery
>;
export const getDevice = /* GraphQL */ `query GetDevice($imei: String!) {
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
    vehicle {
      immat
      code_certificat_qualite_air
      ad_blue
      AWN_genre
      emissions
      AWN_nom_commercial
      AWN_numero_de_serie
      AWN_niveau_de_bruit_au_ralenti
      AWN_consommation_ex_urbaine
      AWN_consommation_urbaine
      AWN_max_speed
      AWN_emission_co_2_prf
      AWN_depollution
      AWN_nbr_soupapes
      AWN_nbr_vitesses
      AWN_nbr_portes
      AWN_nbr_places
      AWN_propulsion
      AWN_date_30
      AWN_date_cg
      AWN_collection
      AWN_segment
      AWN_type_frein
      AWN_group
      AWN_VIN
      AWN_k_type
      AWN_version
      AWN_label
      AWN_code_moteur
      AWN_nbr_cylindre_energie
      AWN_nbr_cylindres
      AWN_energie_code
      AWN_mode_injection
      AWN_type_injection
      AWN_turbo_compressor
      AWN_vitesse_moteur
      AWN_generation
      AWN_poids_total
      AWN_poids_vide
      AWN_poids_total_roulant
      AWN_consommation_mixte
      ad_green
      AWN_poids_max_autorise
      depollution
      cl_environ_prf
      AWN_model
      AWN_model_image
      dateMiseEnCirculation
      puissanceFiscale
      puissanceDin
      energie
      AWN_puissance_KW
      boiteVitesse
      couleur
      carrosserie
      marque
      marque_id
      modele_id
      version
      immatriculation
      VIN
      k_type
      type_mine
      AWN_url_image
      year
      fuelType
      consumption
      maxSpeed
      seatCount
      icon
      picture {
        bucket
        region
        key
        __typename
      }
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
      nomVehicule
      vehicleCategory {
        id
        category
        description
        createdAt
        updatedAt
        __typename
      }
      brand {
        brandName
        createdAt
        updatedAt
        __typename
      }
      modele {
        id
        modele
        createdAt
        updatedAt
        vehicleBrandModelsBrandName
        __typename
      }
      gefcoSend
      tankCapacity
      canMileage
      companyVehiclesId
      company {
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
        __typename
      }
      device {
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
        deviceVehicleImmat
        __typename
      }
      alerts {
        nextToken
        __typename
      }
      tags {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      vehicleVehicleCategoryId
      vehicleBrandBrandName
      vehicleModeleId
      vehicleDeviceImei
      __typename
    }
    createdAt
    updatedAt
    deviceVehicleImmat
    __typename
  }
}
` as GeneratedQuery<APITypes.GetDeviceQueryVariables, APITypes.GetDeviceQuery>;
export const listDevices = /* GraphQL */ `query ListDevices(
  $imei: String
  $filter: ModelDeviceFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listDevices(
    imei: $imei
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
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
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      createdAt
      updatedAt
      deviceVehicleImmat
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDevicesQueryVariables,
  APITypes.ListDevicesQuery
>;
export const getTrame = /* GraphQL */ `query GetTrame($id: String!) {
  getTrame(id: $id) {
    id
    speed
    lat
    lng
    distance
    address
    azimut
    immobilisation
    timestamp
    state
    fuel
    ibuttonCode
    companyId
    driverFullName
    vehicleBrandName
    companyTramesId
    company {
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
        nextToken
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      zones {
        nextToken
        __typename
      }
      pois {
        nextToken
        __typename
      }
      drivers {
        nextToken
        __typename
      }
      trames {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    driver {
      sub
      firstname
      lastname
      password
      username
      fullname
      birthDate
      drivingLicenseNumber
      drivingLicenseType
      job
      hiringDate
      comment
      driverKey
      email
      mobile
      lastModificationDate
      code
      address
      agencyId
      cdc
      pdm
      nni
      companyDriversId
      company {
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
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    vehicle {
      immat
      code_certificat_qualite_air
      ad_blue
      AWN_genre
      emissions
      AWN_nom_commercial
      AWN_numero_de_serie
      AWN_niveau_de_bruit_au_ralenti
      AWN_consommation_ex_urbaine
      AWN_consommation_urbaine
      AWN_max_speed
      AWN_emission_co_2_prf
      AWN_depollution
      AWN_nbr_soupapes
      AWN_nbr_vitesses
      AWN_nbr_portes
      AWN_nbr_places
      AWN_propulsion
      AWN_date_30
      AWN_date_cg
      AWN_collection
      AWN_segment
      AWN_type_frein
      AWN_group
      AWN_VIN
      AWN_k_type
      AWN_version
      AWN_label
      AWN_code_moteur
      AWN_nbr_cylindre_energie
      AWN_nbr_cylindres
      AWN_energie_code
      AWN_mode_injection
      AWN_type_injection
      AWN_turbo_compressor
      AWN_vitesse_moteur
      AWN_generation
      AWN_poids_total
      AWN_poids_vide
      AWN_poids_total_roulant
      AWN_consommation_mixte
      ad_green
      AWN_poids_max_autorise
      depollution
      cl_environ_prf
      AWN_model
      AWN_model_image
      dateMiseEnCirculation
      puissanceFiscale
      puissanceDin
      energie
      AWN_puissance_KW
      boiteVitesse
      couleur
      carrosserie
      marque
      marque_id
      modele_id
      version
      immatriculation
      VIN
      k_type
      type_mine
      AWN_url_image
      year
      fuelType
      consumption
      maxSpeed
      seatCount
      icon
      picture {
        bucket
        region
        key
        __typename
      }
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
      nomVehicule
      vehicleCategory {
        id
        category
        description
        createdAt
        updatedAt
        __typename
      }
      brand {
        brandName
        createdAt
        updatedAt
        __typename
      }
      modele {
        id
        modele
        createdAt
        updatedAt
        vehicleBrandModelsBrandName
        __typename
      }
      gefcoSend
      tankCapacity
      canMileage
      companyVehiclesId
      company {
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
        __typename
      }
      device {
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
        deviceVehicleImmat
        __typename
      }
      alerts {
        nextToken
        __typename
      }
      tags {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      vehicleVehicleCategoryId
      vehicleBrandBrandName
      vehicleModeleId
      vehicleDeviceImei
      __typename
    }
    processor
    createdAt
    updatedAt
    trameDriverSub
    trameVehicleImmat
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTrameQueryVariables, APITypes.GetTrameQuery>;
export const listTrames = /* GraphQL */ `query ListTrames(
  $id: String
  $filter: ModelTrameFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listTrames(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      speed
      lat
      lng
      distance
      address
      azimut
      immobilisation
      timestamp
      state
      fuel
      ibuttonCode
      companyId
      driverFullName
      vehicleBrandName
      companyTramesId
      company {
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
        __typename
      }
      driver {
        sub
        firstname
        lastname
        password
        username
        fullname
        birthDate
        drivingLicenseNumber
        drivingLicenseType
        job
        hiringDate
        comment
        driverKey
        email
        mobile
        lastModificationDate
        code
        address
        agencyId
        cdc
        pdm
        nni
        companyDriversId
        createdAt
        updatedAt
        __typename
      }
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      processor
      createdAt
      updatedAt
      trameDriverSub
      trameVehicleImmat
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTramesQueryVariables,
  APITypes.ListTramesQuery
>;
export const tramesByCompanyTramesId = /* GraphQL */ `query TramesByCompanyTramesId(
  $companyTramesId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelTrameFilterInput
  $limit: Int
  $nextToken: String
) {
  tramesByCompanyTramesId(
    companyTramesId: $companyTramesId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      speed
      lat
      lng
      distance
      address
      azimut
      immobilisation
      timestamp
      state
      fuel
      ibuttonCode
      companyId
      driverFullName
      vehicleBrandName
      companyTramesId
      company {
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
        __typename
      }
      driver {
        sub
        firstname
        lastname
        password
        username
        fullname
        birthDate
        drivingLicenseNumber
        drivingLicenseType
        job
        hiringDate
        comment
        driverKey
        email
        mobile
        lastModificationDate
        code
        address
        agencyId
        cdc
        pdm
        nni
        companyDriversId
        createdAt
        updatedAt
        __typename
      }
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      processor
      createdAt
      updatedAt
      trameDriverSub
      trameVehicleImmat
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TramesByCompanyTramesIdQueryVariables,
  APITypes.TramesByCompanyTramesIdQuery
>;
export const getDvD = /* GraphQL */ `query GetDvD($id: ID!) {
  getDvD(id: $id) {
    id
    dvDVehicleImmat
    vehicle {
      immat
      code_certificat_qualite_air
      ad_blue
      AWN_genre
      emissions
      AWN_nom_commercial
      AWN_numero_de_serie
      AWN_niveau_de_bruit_au_ralenti
      AWN_consommation_ex_urbaine
      AWN_consommation_urbaine
      AWN_max_speed
      AWN_emission_co_2_prf
      AWN_depollution
      AWN_nbr_soupapes
      AWN_nbr_vitesses
      AWN_nbr_portes
      AWN_nbr_places
      AWN_propulsion
      AWN_date_30
      AWN_date_cg
      AWN_collection
      AWN_segment
      AWN_type_frein
      AWN_group
      AWN_VIN
      AWN_k_type
      AWN_version
      AWN_label
      AWN_code_moteur
      AWN_nbr_cylindre_energie
      AWN_nbr_cylindres
      AWN_energie_code
      AWN_mode_injection
      AWN_type_injection
      AWN_turbo_compressor
      AWN_vitesse_moteur
      AWN_generation
      AWN_poids_total
      AWN_poids_vide
      AWN_poids_total_roulant
      AWN_consommation_mixte
      ad_green
      AWN_poids_max_autorise
      depollution
      cl_environ_prf
      AWN_model
      AWN_model_image
      dateMiseEnCirculation
      puissanceFiscale
      puissanceDin
      energie
      AWN_puissance_KW
      boiteVitesse
      couleur
      carrosserie
      marque
      marque_id
      modele_id
      version
      immatriculation
      VIN
      k_type
      type_mine
      AWN_url_image
      year
      fuelType
      consumption
      maxSpeed
      seatCount
      icon
      picture {
        bucket
        region
        key
        __typename
      }
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
      nomVehicule
      vehicleCategory {
        id
        category
        description
        createdAt
        updatedAt
        __typename
      }
      brand {
        brandName
        createdAt
        updatedAt
        __typename
      }
      modele {
        id
        modele
        createdAt
        updatedAt
        vehicleBrandModelsBrandName
        __typename
      }
      gefcoSend
      tankCapacity
      canMileage
      companyVehiclesId
      company {
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
        __typename
      }
      device {
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
        deviceVehicleImmat
        __typename
      }
      alerts {
        nextToken
        __typename
      }
      tags {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      vehicleVehicleCategoryId
      vehicleBrandBrandName
      vehicleModeleId
      vehicleDeviceImei
      __typename
    }
    dvDDriverSub
    driver {
      sub
      firstname
      lastname
      password
      username
      fullname
      birthDate
      drivingLicenseNumber
      drivingLicenseType
      job
      hiringDate
      comment
      driverKey
      email
      mobile
      lastModificationDate
      code
      address
      agencyId
      cdc
      pdm
      nni
      companyDriversId
      company {
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
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    company {
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
        nextToken
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      zones {
        nextToken
        __typename
      }
      pois {
        nextToken
        __typename
      }
      drivers {
        nextToken
        __typename
      }
      trames {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    assignmentDate
    unassignmentDate
    createdAt
    updatedAt
    dvDCompanyId
    __typename
  }
}
` as GeneratedQuery<APITypes.GetDvDQueryVariables, APITypes.GetDvDQuery>;
export const listDvDS = /* GraphQL */ `query ListDvDS(
  $id: ID
  $filter: ModelDvDFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listDvDS(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      dvDVehicleImmat
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      dvDDriverSub
      driver {
        sub
        firstname
        lastname
        password
        username
        fullname
        birthDate
        drivingLicenseNumber
        drivingLicenseType
        job
        hiringDate
        comment
        driverKey
        email
        mobile
        lastModificationDate
        code
        address
        agencyId
        cdc
        pdm
        nni
        companyDriversId
        createdAt
        updatedAt
        __typename
      }
      company {
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
        __typename
      }
      assignmentDate
      unassignmentDate
      createdAt
      updatedAt
      dvDCompanyId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListDvDSQueryVariables, APITypes.ListDvDSQuery>;
export const dvDSByDvDVehicleImmat = /* GraphQL */ `query DvDSByDvDVehicleImmat(
  $dvDVehicleImmat: String!
  $sortDirection: ModelSortDirection
  $filter: ModelDvDFilterInput
  $limit: Int
  $nextToken: String
) {
  dvDSByDvDVehicleImmat(
    dvDVehicleImmat: $dvDVehicleImmat
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      dvDVehicleImmat
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      dvDDriverSub
      driver {
        sub
        firstname
        lastname
        password
        username
        fullname
        birthDate
        drivingLicenseNumber
        drivingLicenseType
        job
        hiringDate
        comment
        driverKey
        email
        mobile
        lastModificationDate
        code
        address
        agencyId
        cdc
        pdm
        nni
        companyDriversId
        createdAt
        updatedAt
        __typename
      }
      company {
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
        __typename
      }
      assignmentDate
      unassignmentDate
      createdAt
      updatedAt
      dvDCompanyId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.DvDSByDvDVehicleImmatQueryVariables,
  APITypes.DvDSByDvDVehicleImmatQuery
>;
export const dvDSByDvDDriverSub = /* GraphQL */ `query DvDSByDvDDriverSub(
  $dvDDriverSub: String!
  $sortDirection: ModelSortDirection
  $filter: ModelDvDFilterInput
  $limit: Int
  $nextToken: String
) {
  dvDSByDvDDriverSub(
    dvDDriverSub: $dvDDriverSub
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      dvDVehicleImmat
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      dvDDriverSub
      driver {
        sub
        firstname
        lastname
        password
        username
        fullname
        birthDate
        drivingLicenseNumber
        drivingLicenseType
        job
        hiringDate
        comment
        driverKey
        email
        mobile
        lastModificationDate
        code
        address
        agencyId
        cdc
        pdm
        nni
        companyDriversId
        createdAt
        updatedAt
        __typename
      }
      company {
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
        __typename
      }
      assignmentDate
      unassignmentDate
      createdAt
      updatedAt
      dvDCompanyId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.DvDSByDvDDriverSubQueryVariables,
  APITypes.DvDSByDvDDriverSubQuery
>;
export const getMaintenance = /* GraphQL */ `query GetMaintenance($id: ID!) {
  getMaintenance(id: $id) {
    id
    operationType
    status
    reminderDays
    alertDate
    cost
    email
    notes
    creationDate
    lastModificationDate
    companyMaintenancesId
    company {
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
        nextToken
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      zones {
        nextToken
        __typename
      }
      pois {
        nextToken
        __typename
      }
      drivers {
        nextToken
        __typename
      }
      trames {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    vehicleMaintenancesImmat
    vehicle {
      immat
      code_certificat_qualite_air
      ad_blue
      AWN_genre
      emissions
      AWN_nom_commercial
      AWN_numero_de_serie
      AWN_niveau_de_bruit_au_ralenti
      AWN_consommation_ex_urbaine
      AWN_consommation_urbaine
      AWN_max_speed
      AWN_emission_co_2_prf
      AWN_depollution
      AWN_nbr_soupapes
      AWN_nbr_vitesses
      AWN_nbr_portes
      AWN_nbr_places
      AWN_propulsion
      AWN_date_30
      AWN_date_cg
      AWN_collection
      AWN_segment
      AWN_type_frein
      AWN_group
      AWN_VIN
      AWN_k_type
      AWN_version
      AWN_label
      AWN_code_moteur
      AWN_nbr_cylindre_energie
      AWN_nbr_cylindres
      AWN_energie_code
      AWN_mode_injection
      AWN_type_injection
      AWN_turbo_compressor
      AWN_vitesse_moteur
      AWN_generation
      AWN_poids_total
      AWN_poids_vide
      AWN_poids_total_roulant
      AWN_consommation_mixte
      ad_green
      AWN_poids_max_autorise
      depollution
      cl_environ_prf
      AWN_model
      AWN_model_image
      dateMiseEnCirculation
      puissanceFiscale
      puissanceDin
      energie
      AWN_puissance_KW
      boiteVitesse
      couleur
      carrosserie
      marque
      marque_id
      modele_id
      version
      immatriculation
      VIN
      k_type
      type_mine
      AWN_url_image
      year
      fuelType
      consumption
      maxSpeed
      seatCount
      icon
      picture {
        bucket
        region
        key
        __typename
      }
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
      nomVehicule
      vehicleCategory {
        id
        category
        description
        createdAt
        updatedAt
        __typename
      }
      brand {
        brandName
        createdAt
        updatedAt
        __typename
      }
      modele {
        id
        modele
        createdAt
        updatedAt
        vehicleBrandModelsBrandName
        __typename
      }
      gefcoSend
      tankCapacity
      canMileage
      companyVehiclesId
      company {
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
        __typename
      }
      device {
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
        deviceVehicleImmat
        __typename
      }
      alerts {
        nextToken
        __typename
      }
      tags {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      vehicleVehicleCategoryId
      vehicleBrandBrandName
      vehicleModeleId
      vehicleDeviceImei
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMaintenanceQueryVariables,
  APITypes.GetMaintenanceQuery
>;
export const listMaintenances = /* GraphQL */ `query ListMaintenances(
  $id: ID
  $filter: ModelMaintenanceFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listMaintenances(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      operationType
      status
      reminderDays
      alertDate
      cost
      email
      notes
      creationDate
      lastModificationDate
      companyMaintenancesId
      company {
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
        __typename
      }
      vehicleMaintenancesImmat
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
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
` as GeneratedQuery<
  APITypes.ListMaintenancesQueryVariables,
  APITypes.ListMaintenancesQuery
>;
export const maintenancesByCompanyMaintenancesId = /* GraphQL */ `query MaintenancesByCompanyMaintenancesId(
  $companyMaintenancesId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelMaintenanceFilterInput
  $limit: Int
  $nextToken: String
) {
  maintenancesByCompanyMaintenancesId(
    companyMaintenancesId: $companyMaintenancesId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      operationType
      status
      reminderDays
      alertDate
      cost
      email
      notes
      creationDate
      lastModificationDate
      companyMaintenancesId
      company {
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
        __typename
      }
      vehicleMaintenancesImmat
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
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
` as GeneratedQuery<
  APITypes.MaintenancesByCompanyMaintenancesIdQueryVariables,
  APITypes.MaintenancesByCompanyMaintenancesIdQuery
>;
export const maintenancesByVehicleMaintenancesImmat = /* GraphQL */ `query MaintenancesByVehicleMaintenancesImmat(
  $vehicleMaintenancesImmat: String!
  $sortDirection: ModelSortDirection
  $filter: ModelMaintenanceFilterInput
  $limit: Int
  $nextToken: String
) {
  maintenancesByVehicleMaintenancesImmat(
    vehicleMaintenancesImmat: $vehicleMaintenancesImmat
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      operationType
      status
      reminderDays
      alertDate
      cost
      email
      notes
      creationDate
      lastModificationDate
      companyMaintenancesId
      company {
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
        __typename
      }
      vehicleMaintenancesImmat
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
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
` as GeneratedQuery<
  APITypes.MaintenancesByVehicleMaintenancesImmatQueryVariables,
  APITypes.MaintenancesByVehicleMaintenancesImmatQuery
>;
export const getTypeDepense = /* GraphQL */ `query GetTypeDepense($id: ID!) {
  getTypeDepense(id: $id) {
    id
    name
    description
    depenses {
      items {
        id
        vehicleImmat
        typeDepenseId
        prestataire
        montantTTC
        montantHT
        associateDate
        produit
        ville
        qte
        description
        companyDepensesId
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
` as GeneratedQuery<
  APITypes.GetTypeDepenseQueryVariables,
  APITypes.GetTypeDepenseQuery
>;
export const listTypeDepenses = /* GraphQL */ `query ListTypeDepenses(
  $id: ID
  $filter: ModelTypeDepenseFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listTypeDepenses(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      name
      description
      depenses {
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
` as GeneratedQuery<
  APITypes.ListTypeDepensesQueryVariables,
  APITypes.ListTypeDepensesQuery
>;
export const getDepense = /* GraphQL */ `query GetDepense($id: ID!) {
  getDepense(id: $id) {
    id
    vehicleImmat
    vehicle {
      immat
      code_certificat_qualite_air
      ad_blue
      AWN_genre
      emissions
      AWN_nom_commercial
      AWN_numero_de_serie
      AWN_niveau_de_bruit_au_ralenti
      AWN_consommation_ex_urbaine
      AWN_consommation_urbaine
      AWN_max_speed
      AWN_emission_co_2_prf
      AWN_depollution
      AWN_nbr_soupapes
      AWN_nbr_vitesses
      AWN_nbr_portes
      AWN_nbr_places
      AWN_propulsion
      AWN_date_30
      AWN_date_cg
      AWN_collection
      AWN_segment
      AWN_type_frein
      AWN_group
      AWN_VIN
      AWN_k_type
      AWN_version
      AWN_label
      AWN_code_moteur
      AWN_nbr_cylindre_energie
      AWN_nbr_cylindres
      AWN_energie_code
      AWN_mode_injection
      AWN_type_injection
      AWN_turbo_compressor
      AWN_vitesse_moteur
      AWN_generation
      AWN_poids_total
      AWN_poids_vide
      AWN_poids_total_roulant
      AWN_consommation_mixte
      ad_green
      AWN_poids_max_autorise
      depollution
      cl_environ_prf
      AWN_model
      AWN_model_image
      dateMiseEnCirculation
      puissanceFiscale
      puissanceDin
      energie
      AWN_puissance_KW
      boiteVitesse
      couleur
      carrosserie
      marque
      marque_id
      modele_id
      version
      immatriculation
      VIN
      k_type
      type_mine
      AWN_url_image
      year
      fuelType
      consumption
      maxSpeed
      seatCount
      icon
      picture {
        bucket
        region
        key
        __typename
      }
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
      nomVehicule
      vehicleCategory {
        id
        category
        description
        createdAt
        updatedAt
        __typename
      }
      brand {
        brandName
        createdAt
        updatedAt
        __typename
      }
      modele {
        id
        modele
        createdAt
        updatedAt
        vehicleBrandModelsBrandName
        __typename
      }
      gefcoSend
      tankCapacity
      canMileage
      companyVehiclesId
      company {
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
        __typename
      }
      device {
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
        deviceVehicleImmat
        __typename
      }
      alerts {
        nextToken
        __typename
      }
      tags {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      vehicleVehicleCategoryId
      vehicleBrandBrandName
      vehicleModeleId
      vehicleDeviceImei
      __typename
    }
    typeDepenseId
    typeDepense {
      id
      name
      description
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    prestataire
    montantTTC
    montantHT
    associateDate
    produit
    ville
    qte
    description
    companyDepensesId
    company {
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
        nextToken
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      zones {
        nextToken
        __typename
      }
      pois {
        nextToken
        __typename
      }
      drivers {
        nextToken
        __typename
      }
      trames {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetDepenseQueryVariables,
  APITypes.GetDepenseQuery
>;
export const listDepenses = /* GraphQL */ `query ListDepenses(
  $id: ID
  $filter: ModelDepenseFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listDepenses(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      vehicleImmat
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      typeDepenseId
      typeDepense {
        id
        name
        description
        createdAt
        updatedAt
        __typename
      }
      prestataire
      montantTTC
      montantHT
      associateDate
      produit
      ville
      qte
      description
      companyDepensesId
      company {
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
` as GeneratedQuery<
  APITypes.ListDepensesQueryVariables,
  APITypes.ListDepensesQuery
>;
export const depensesByVehicleImmat = /* GraphQL */ `query DepensesByVehicleImmat(
  $vehicleImmat: String!
  $sortDirection: ModelSortDirection
  $filter: ModelDepenseFilterInput
  $limit: Int
  $nextToken: String
) {
  depensesByVehicleImmat(
    vehicleImmat: $vehicleImmat
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      vehicleImmat
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      typeDepenseId
      typeDepense {
        id
        name
        description
        createdAt
        updatedAt
        __typename
      }
      prestataire
      montantTTC
      montantHT
      associateDate
      produit
      ville
      qte
      description
      companyDepensesId
      company {
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
` as GeneratedQuery<
  APITypes.DepensesByVehicleImmatQueryVariables,
  APITypes.DepensesByVehicleImmatQuery
>;
export const depensesByTypeDepenseId = /* GraphQL */ `query DepensesByTypeDepenseId(
  $typeDepenseId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelDepenseFilterInput
  $limit: Int
  $nextToken: String
) {
  depensesByTypeDepenseId(
    typeDepenseId: $typeDepenseId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      vehicleImmat
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      typeDepenseId
      typeDepense {
        id
        name
        description
        createdAt
        updatedAt
        __typename
      }
      prestataire
      montantTTC
      montantHT
      associateDate
      produit
      ville
      qte
      description
      companyDepensesId
      company {
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
` as GeneratedQuery<
  APITypes.DepensesByTypeDepenseIdQueryVariables,
  APITypes.DepensesByTypeDepenseIdQuery
>;
export const depensesByCompanyDepensesId = /* GraphQL */ `query DepensesByCompanyDepensesId(
  $companyDepensesId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelDepenseFilterInput
  $limit: Int
  $nextToken: String
) {
  depensesByCompanyDepensesId(
    companyDepensesId: $companyDepensesId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      vehicleImmat
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      typeDepenseId
      typeDepense {
        id
        name
        description
        createdAt
        updatedAt
        __typename
      }
      prestataire
      montantTTC
      montantHT
      associateDate
      produit
      ville
      qte
      description
      companyDepensesId
      company {
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
` as GeneratedQuery<
  APITypes.DepensesByCompanyDepensesIdQueryVariables,
  APITypes.DepensesByCompanyDepensesIdQuery
>;
export const getLabelsCollection = /* GraphQL */ `query GetLabelsCollection($key: String!) {
  getLabelsCollection(key: $key) {
    key
    label
    type
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetLabelsCollectionQueryVariables,
  APITypes.GetLabelsCollectionQuery
>;
export const listLabelsCollections = /* GraphQL */ `query ListLabelsCollections(
  $key: String
  $filter: ModelLabelsCollectionFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listLabelsCollections(
    key: $key
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      key
      label
      type
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListLabelsCollectionsQueryVariables,
  APITypes.ListLabelsCollectionsQuery
>;
export const getTag = /* GraphQL */ `query GetTag($id: ID!) {
  getTag(id: $id) {
    id
    name
    description
    color
    company {
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
        nextToken
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      zones {
        nextToken
        __typename
      }
      pois {
        nextToken
        __typename
      }
      drivers {
        nextToken
        __typename
      }
      trames {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    vehicles {
      items {
        id
        vehicleImmat
        tagId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    tagCompanyId
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTagQueryVariables, APITypes.GetTagQuery>;
export const listTags = /* GraphQL */ `query ListTags($filter: ModelTagFilterInput, $limit: Int, $nextToken: String) {
  listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      color
      company {
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
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      tagCompanyId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTagsQueryVariables, APITypes.ListTagsQuery>;
export const getVehicleTags = /* GraphQL */ `query GetVehicleTags($id: ID!) {
  getVehicleTags(id: $id) {
    id
    vehicleImmat
    tagId
    vehicle {
      immat
      code_certificat_qualite_air
      ad_blue
      AWN_genre
      emissions
      AWN_nom_commercial
      AWN_numero_de_serie
      AWN_niveau_de_bruit_au_ralenti
      AWN_consommation_ex_urbaine
      AWN_consommation_urbaine
      AWN_max_speed
      AWN_emission_co_2_prf
      AWN_depollution
      AWN_nbr_soupapes
      AWN_nbr_vitesses
      AWN_nbr_portes
      AWN_nbr_places
      AWN_propulsion
      AWN_date_30
      AWN_date_cg
      AWN_collection
      AWN_segment
      AWN_type_frein
      AWN_group
      AWN_VIN
      AWN_k_type
      AWN_version
      AWN_label
      AWN_code_moteur
      AWN_nbr_cylindre_energie
      AWN_nbr_cylindres
      AWN_energie_code
      AWN_mode_injection
      AWN_type_injection
      AWN_turbo_compressor
      AWN_vitesse_moteur
      AWN_generation
      AWN_poids_total
      AWN_poids_vide
      AWN_poids_total_roulant
      AWN_consommation_mixte
      ad_green
      AWN_poids_max_autorise
      depollution
      cl_environ_prf
      AWN_model
      AWN_model_image
      dateMiseEnCirculation
      puissanceFiscale
      puissanceDin
      energie
      AWN_puissance_KW
      boiteVitesse
      couleur
      carrosserie
      marque
      marque_id
      modele_id
      version
      immatriculation
      VIN
      k_type
      type_mine
      AWN_url_image
      year
      fuelType
      consumption
      maxSpeed
      seatCount
      icon
      picture {
        bucket
        region
        key
        __typename
      }
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
      nomVehicule
      vehicleCategory {
        id
        category
        description
        createdAt
        updatedAt
        __typename
      }
      brand {
        brandName
        createdAt
        updatedAt
        __typename
      }
      modele {
        id
        modele
        createdAt
        updatedAt
        vehicleBrandModelsBrandName
        __typename
      }
      gefcoSend
      tankCapacity
      canMileage
      companyVehiclesId
      company {
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
        __typename
      }
      device {
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
        deviceVehicleImmat
        __typename
      }
      alerts {
        nextToken
        __typename
      }
      tags {
        nextToken
        __typename
      }
      maintenances {
        nextToken
        __typename
      }
      depenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      vehicleVehicleCategoryId
      vehicleBrandBrandName
      vehicleModeleId
      vehicleDeviceImei
      __typename
    }
    tag {
      id
      name
      description
      color
      company {
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
        __typename
      }
      vehicles {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      tagCompanyId
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVehicleTagsQueryVariables,
  APITypes.GetVehicleTagsQuery
>;
export const listVehicleTags = /* GraphQL */ `query ListVehicleTags(
  $filter: ModelVehicleTagsFilterInput
  $limit: Int
  $nextToken: String
) {
  listVehicleTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      vehicleImmat
      tagId
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      tag {
        id
        name
        description
        color
        createdAt
        updatedAt
        tagCompanyId
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
` as GeneratedQuery<
  APITypes.ListVehicleTagsQueryVariables,
  APITypes.ListVehicleTagsQuery
>;
export const vehicleTagsByVehicleImmat = /* GraphQL */ `query VehicleTagsByVehicleImmat(
  $vehicleImmat: String!
  $sortDirection: ModelSortDirection
  $filter: ModelVehicleTagsFilterInput
  $limit: Int
  $nextToken: String
) {
  vehicleTagsByVehicleImmat(
    vehicleImmat: $vehicleImmat
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      vehicleImmat
      tagId
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      tag {
        id
        name
        description
        color
        createdAt
        updatedAt
        tagCompanyId
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
` as GeneratedQuery<
  APITypes.VehicleTagsByVehicleImmatQueryVariables,
  APITypes.VehicleTagsByVehicleImmatQuery
>;
export const vehicleTagsByTagId = /* GraphQL */ `query VehicleTagsByTagId(
  $tagId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelVehicleTagsFilterInput
  $limit: Int
  $nextToken: String
) {
  vehicleTagsByTagId(
    tagId: $tagId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      vehicleImmat
      tagId
      vehicle {
        immat
        code_certificat_qualite_air
        ad_blue
        AWN_genre
        emissions
        AWN_nom_commercial
        AWN_numero_de_serie
        AWN_niveau_de_bruit_au_ralenti
        AWN_consommation_ex_urbaine
        AWN_consommation_urbaine
        AWN_max_speed
        AWN_emission_co_2_prf
        AWN_depollution
        AWN_nbr_soupapes
        AWN_nbr_vitesses
        AWN_nbr_portes
        AWN_nbr_places
        AWN_propulsion
        AWN_date_30
        AWN_date_cg
        AWN_collection
        AWN_segment
        AWN_type_frein
        AWN_group
        AWN_VIN
        AWN_k_type
        AWN_version
        AWN_label
        AWN_code_moteur
        AWN_nbr_cylindre_energie
        AWN_nbr_cylindres
        AWN_energie_code
        AWN_mode_injection
        AWN_type_injection
        AWN_turbo_compressor
        AWN_vitesse_moteur
        AWN_generation
        AWN_poids_total
        AWN_poids_vide
        AWN_poids_total_roulant
        AWN_consommation_mixte
        ad_green
        AWN_poids_max_autorise
        depollution
        cl_environ_prf
        AWN_model
        AWN_model_image
        dateMiseEnCirculation
        puissanceFiscale
        puissanceDin
        energie
        AWN_puissance_KW
        boiteVitesse
        couleur
        carrosserie
        marque
        marque_id
        modele_id
        version
        immatriculation
        VIN
        k_type
        type_mine
        AWN_url_image
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
        nomVehicule
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      tag {
        id
        name
        description
        color
        createdAt
        updatedAt
        tagCompanyId
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
` as GeneratedQuery<
  APITypes.VehicleTagsByTagIdQueryVariables,
  APITypes.VehicleTagsByTagIdQuery
>;
