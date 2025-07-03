/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const executeCustomAction = /* GraphQL */ `mutation ExecuteCustomAction(
  $operation: CustomActionOperation!
  $request: AWSJSON!
) {
  executeCustomAction(operation: $operation, request: $request) {
    status
    message
    __typename
  }
}
` as GeneratedMutation<
  APITypes.ExecuteCustomActionMutationVariables,
  APITypes.ExecuteCustomActionMutation
>;
export const executeMaintenanceAction = /* GraphQL */ `mutation ExecuteMaintenanceAction(
  $action: MaintenanceAction!
  $maintenanceId: ID!
  $input: AWSJSON
) {
  executeMaintenanceAction(
    action: $action
    maintenanceId: $maintenanceId
    input: $input
  ) {
    status
    message
    __typename
  }
}
` as GeneratedMutation<
  APITypes.ExecuteMaintenanceActionMutationVariables,
  APITypes.ExecuteMaintenanceActionMutation
>;
export const updateUserPassword = /* GraphQL */ `mutation UpdateUserPassword(
  $userPoolId: String!
  $username: String!
  $newPassword: String!
) {
  updateUserPassword(
    userPoolId: $userPoolId
    username: $username
    newPassword: $newPassword
  ) {
    message
    error
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserPasswordMutationVariables,
  APITypes.UpdateUserPasswordMutation
>;
export const createCompany = /* GraphQL */ `mutation CreateCompany(
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
` as GeneratedMutation<
  APITypes.CreateCompanyMutationVariables,
  APITypes.CreateCompanyMutation
>;
export const updateCompany = /* GraphQL */ `mutation UpdateCompany(
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
` as GeneratedMutation<
  APITypes.UpdateCompanyMutationVariables,
  APITypes.UpdateCompanyMutation
>;
export const deleteCompany = /* GraphQL */ `mutation DeleteCompany(
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
` as GeneratedMutation<
  APITypes.DeleteCompanyMutationVariables,
  APITypes.DeleteCompanyMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createDriver = /* GraphQL */ `mutation CreateDriver(
  $input: CreateDriverInput!
  $condition: ModelDriverConditionInput
) {
  createDriver(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateDriverMutationVariables,
  APITypes.CreateDriverMutation
>;
export const updateDriver = /* GraphQL */ `mutation UpdateDriver(
  $input: UpdateDriverInput!
  $condition: ModelDriverConditionInput
) {
  updateDriver(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateDriverMutationVariables,
  APITypes.UpdateDriverMutation
>;
export const deleteDriver = /* GraphQL */ `mutation DeleteDriver(
  $input: DeleteDriverInput!
  $condition: ModelDriverConditionInput
) {
  deleteDriver(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteDriverMutationVariables,
  APITypes.DeleteDriverMutation
>;
export const createVehicle = /* GraphQL */ `mutation CreateVehicle(
  $input: CreateVehicleInput!
  $condition: ModelVehicleConditionInput
) {
  createVehicle(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateVehicleMutationVariables,
  APITypes.CreateVehicleMutation
>;
export const updateVehicle = /* GraphQL */ `mutation UpdateVehicle(
  $input: UpdateVehicleInput!
  $condition: ModelVehicleConditionInput
) {
  updateVehicle(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateVehicleMutationVariables,
  APITypes.UpdateVehicleMutation
>;
export const deleteVehicle = /* GraphQL */ `mutation DeleteVehicle(
  $input: DeleteVehicleInput!
  $condition: ModelVehicleConditionInput
) {
  deleteVehicle(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteVehicleMutationVariables,
  APITypes.DeleteVehicleMutation
>;
export const createAlert = /* GraphQL */ `mutation CreateAlert(
  $input: CreateAlertInput!
  $condition: ModelAlertConditionInput
) {
  createAlert(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateAlertMutationVariables,
  APITypes.CreateAlertMutation
>;
export const updateAlert = /* GraphQL */ `mutation UpdateAlert(
  $input: UpdateAlertInput!
  $condition: ModelAlertConditionInput
) {
  updateAlert(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateAlertMutationVariables,
  APITypes.UpdateAlertMutation
>;
export const deleteAlert = /* GraphQL */ `mutation DeleteAlert(
  $input: DeleteAlertInput!
  $condition: ModelAlertConditionInput
) {
  deleteAlert(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteAlertMutationVariables,
  APITypes.DeleteAlertMutation
>;
export const createVehicleAlerts = /* GraphQL */ `mutation CreateVehicleAlerts(
  $input: CreateVehicleAlertsInput!
  $condition: ModelVehicleAlertsConditionInput
) {
  createVehicleAlerts(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateVehicleAlertsMutationVariables,
  APITypes.CreateVehicleAlertsMutation
>;
export const updateVehicleAlerts = /* GraphQL */ `mutation UpdateVehicleAlerts(
  $input: UpdateVehicleAlertsInput!
  $condition: ModelVehicleAlertsConditionInput
) {
  updateVehicleAlerts(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateVehicleAlertsMutationVariables,
  APITypes.UpdateVehicleAlertsMutation
>;
export const deleteVehicleAlerts = /* GraphQL */ `mutation DeleteVehicleAlerts(
  $input: DeleteVehicleAlertsInput!
  $condition: ModelVehicleAlertsConditionInput
) {
  deleteVehicleAlerts(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteVehicleAlertsMutationVariables,
  APITypes.DeleteVehicleAlertsMutation
>;
export const createAlertDefinition = /* GraphQL */ `mutation CreateAlertDefinition(
  $input: CreateAlertDefinitionInput!
  $condition: ModelAlertDefinitionConditionInput
) {
  createAlertDefinition(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateAlertDefinitionMutationVariables,
  APITypes.CreateAlertDefinitionMutation
>;
export const updateAlertDefinition = /* GraphQL */ `mutation UpdateAlertDefinition(
  $input: UpdateAlertDefinitionInput!
  $condition: ModelAlertDefinitionConditionInput
) {
  updateAlertDefinition(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateAlertDefinitionMutationVariables,
  APITypes.UpdateAlertDefinitionMutation
>;
export const deleteAlertDefinition = /* GraphQL */ `mutation DeleteAlertDefinition(
  $input: DeleteAlertDefinitionInput!
  $condition: ModelAlertDefinitionConditionInput
) {
  deleteAlertDefinition(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteAlertDefinitionMutationVariables,
  APITypes.DeleteAlertDefinitionMutation
>;
export const createVehicleAlertState = /* GraphQL */ `mutation CreateVehicleAlertState(
  $input: CreateVehicleAlertStateInput!
  $condition: ModelVehicleAlertStateConditionInput
) {
  createVehicleAlertState(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateVehicleAlertStateMutationVariables,
  APITypes.CreateVehicleAlertStateMutation
>;
export const updateVehicleAlertState = /* GraphQL */ `mutation UpdateVehicleAlertState(
  $input: UpdateVehicleAlertStateInput!
  $condition: ModelVehicleAlertStateConditionInput
) {
  updateVehicleAlertState(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateVehicleAlertStateMutationVariables,
  APITypes.UpdateVehicleAlertStateMutation
>;
export const deleteVehicleAlertState = /* GraphQL */ `mutation DeleteVehicleAlertState(
  $input: DeleteVehicleAlertStateInput!
  $condition: ModelVehicleAlertStateConditionInput
) {
  deleteVehicleAlertState(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteVehicleAlertStateMutationVariables,
  APITypes.DeleteVehicleAlertStateMutation
>;
export const createAlertHistory = /* GraphQL */ `mutation CreateAlertHistory(
  $input: CreateAlertHistoryInput!
  $condition: ModelAlertHistoryConditionInput
) {
  createAlertHistory(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateAlertHistoryMutationVariables,
  APITypes.CreateAlertHistoryMutation
>;
export const updateAlertHistory = /* GraphQL */ `mutation UpdateAlertHistory(
  $input: UpdateAlertHistoryInput!
  $condition: ModelAlertHistoryConditionInput
) {
  updateAlertHistory(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateAlertHistoryMutationVariables,
  APITypes.UpdateAlertHistoryMutation
>;
export const deleteAlertHistory = /* GraphQL */ `mutation DeleteAlertHistory(
  $input: DeleteAlertHistoryInput!
  $condition: ModelAlertHistoryConditionInput
) {
  deleteAlertHistory(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteAlertHistoryMutationVariables,
  APITypes.DeleteAlertHistoryMutation
>;
export const createZone = /* GraphQL */ `mutation CreateZone(
  $input: CreateZoneInput!
  $condition: ModelZoneConditionInput
) {
  createZone(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateZoneMutationVariables,
  APITypes.CreateZoneMutation
>;
export const updateZone = /* GraphQL */ `mutation UpdateZone(
  $input: UpdateZoneInput!
  $condition: ModelZoneConditionInput
) {
  updateZone(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateZoneMutationVariables,
  APITypes.UpdateZoneMutation
>;
export const deleteZone = /* GraphQL */ `mutation DeleteZone(
  $input: DeleteZoneInput!
  $condition: ModelZoneConditionInput
) {
  deleteZone(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteZoneMutationVariables,
  APITypes.DeleteZoneMutation
>;
export const createPoi = /* GraphQL */ `mutation CreatePoi(
  $input: CreatePoiInput!
  $condition: ModelPoiConditionInput
) {
  createPoi(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreatePoiMutationVariables,
  APITypes.CreatePoiMutation
>;
export const updatePoi = /* GraphQL */ `mutation UpdatePoi(
  $input: UpdatePoiInput!
  $condition: ModelPoiConditionInput
) {
  updatePoi(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdatePoiMutationVariables,
  APITypes.UpdatePoiMutation
>;
export const deletePoi = /* GraphQL */ `mutation DeletePoi(
  $input: DeletePoiInput!
  $condition: ModelPoiConditionInput
) {
  deletePoi(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeletePoiMutationVariables,
  APITypes.DeletePoiMutation
>;
export const createVehicleCategory = /* GraphQL */ `mutation CreateVehicleCategory(
  $input: CreateVehicleCategoryInput!
  $condition: ModelVehicleCategoryConditionInput
) {
  createVehicleCategory(input: $input, condition: $condition) {
    id
    category
    description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateVehicleCategoryMutationVariables,
  APITypes.CreateVehicleCategoryMutation
>;
export const updateVehicleCategory = /* GraphQL */ `mutation UpdateVehicleCategory(
  $input: UpdateVehicleCategoryInput!
  $condition: ModelVehicleCategoryConditionInput
) {
  updateVehicleCategory(input: $input, condition: $condition) {
    id
    category
    description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateVehicleCategoryMutationVariables,
  APITypes.UpdateVehicleCategoryMutation
>;
export const deleteVehicleCategory = /* GraphQL */ `mutation DeleteVehicleCategory(
  $input: DeleteVehicleCategoryInput!
  $condition: ModelVehicleCategoryConditionInput
) {
  deleteVehicleCategory(input: $input, condition: $condition) {
    id
    category
    description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteVehicleCategoryMutationVariables,
  APITypes.DeleteVehicleCategoryMutation
>;
export const createVehicleBrand = /* GraphQL */ `mutation CreateVehicleBrand(
  $input: CreateVehicleBrandInput!
  $condition: ModelVehicleBrandConditionInput
) {
  createVehicleBrand(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateVehicleBrandMutationVariables,
  APITypes.CreateVehicleBrandMutation
>;
export const updateVehicleBrand = /* GraphQL */ `mutation UpdateVehicleBrand(
  $input: UpdateVehicleBrandInput!
  $condition: ModelVehicleBrandConditionInput
) {
  updateVehicleBrand(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateVehicleBrandMutationVariables,
  APITypes.UpdateVehicleBrandMutation
>;
export const deleteVehicleBrand = /* GraphQL */ `mutation DeleteVehicleBrand(
  $input: DeleteVehicleBrandInput!
  $condition: ModelVehicleBrandConditionInput
) {
  deleteVehicleBrand(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteVehicleBrandMutationVariables,
  APITypes.DeleteVehicleBrandMutation
>;
export const createVehicleModel = /* GraphQL */ `mutation CreateVehicleModel(
  $input: CreateVehicleModelInput!
  $condition: ModelVehicleModelConditionInput
) {
  createVehicleModel(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateVehicleModelMutationVariables,
  APITypes.CreateVehicleModelMutation
>;
export const updateVehicleModel = /* GraphQL */ `mutation UpdateVehicleModel(
  $input: UpdateVehicleModelInput!
  $condition: ModelVehicleModelConditionInput
) {
  updateVehicleModel(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateVehicleModelMutationVariables,
  APITypes.UpdateVehicleModelMutation
>;
export const deleteVehicleModel = /* GraphQL */ `mutation DeleteVehicleModel(
  $input: DeleteVehicleModelInput!
  $condition: ModelVehicleModelConditionInput
) {
  deleteVehicleModel(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteVehicleModelMutationVariables,
  APITypes.DeleteVehicleModelMutation
>;
export const createDevice = /* GraphQL */ `mutation CreateDevice(
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
` as GeneratedMutation<
  APITypes.CreateDeviceMutationVariables,
  APITypes.CreateDeviceMutation
>;
export const updateDevice = /* GraphQL */ `mutation UpdateDevice(
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
` as GeneratedMutation<
  APITypes.UpdateDeviceMutationVariables,
  APITypes.UpdateDeviceMutation
>;
export const deleteDevice = /* GraphQL */ `mutation DeleteDevice(
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
` as GeneratedMutation<
  APITypes.DeleteDeviceMutationVariables,
  APITypes.DeleteDeviceMutation
>;
export const createTrame = /* GraphQL */ `mutation CreateTrame(
  $input: CreateTrameInput!
  $condition: ModelTrameConditionInput
) {
  createTrame(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTrameMutationVariables,
  APITypes.CreateTrameMutation
>;
export const updateTrame = /* GraphQL */ `mutation UpdateTrame(
  $input: UpdateTrameInput!
  $condition: ModelTrameConditionInput
) {
  updateTrame(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTrameMutationVariables,
  APITypes.UpdateTrameMutation
>;
export const deleteTrame = /* GraphQL */ `mutation DeleteTrame(
  $input: DeleteTrameInput!
  $condition: ModelTrameConditionInput
) {
  deleteTrame(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTrameMutationVariables,
  APITypes.DeleteTrameMutation
>;
export const createDvD = /* GraphQL */ `mutation CreateDvD(
  $input: CreateDvDInput!
  $condition: ModelDvDConditionInput
) {
  createDvD(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateDvDMutationVariables,
  APITypes.CreateDvDMutation
>;
export const updateDvD = /* GraphQL */ `mutation UpdateDvD(
  $input: UpdateDvDInput!
  $condition: ModelDvDConditionInput
) {
  updateDvD(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateDvDMutationVariables,
  APITypes.UpdateDvDMutation
>;
export const deleteDvD = /* GraphQL */ `mutation DeleteDvD(
  $input: DeleteDvDInput!
  $condition: ModelDvDConditionInput
) {
  deleteDvD(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteDvDMutationVariables,
  APITypes.DeleteDvDMutation
>;
export const createMaintenance = /* GraphQL */ `mutation CreateMaintenance(
  $input: CreateMaintenanceInput!
  $condition: ModelMaintenanceConditionInput
) {
  createMaintenance(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateMaintenanceMutationVariables,
  APITypes.CreateMaintenanceMutation
>;
export const updateMaintenance = /* GraphQL */ `mutation UpdateMaintenance(
  $input: UpdateMaintenanceInput!
  $condition: ModelMaintenanceConditionInput
) {
  updateMaintenance(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateMaintenanceMutationVariables,
  APITypes.UpdateMaintenanceMutation
>;
export const deleteMaintenance = /* GraphQL */ `mutation DeleteMaintenance(
  $input: DeleteMaintenanceInput!
  $condition: ModelMaintenanceConditionInput
) {
  deleteMaintenance(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteMaintenanceMutationVariables,
  APITypes.DeleteMaintenanceMutation
>;
export const createTypeDepense = /* GraphQL */ `mutation CreateTypeDepense(
  $input: CreateTypeDepenseInput!
  $condition: ModelTypeDepenseConditionInput
) {
  createTypeDepense(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTypeDepenseMutationVariables,
  APITypes.CreateTypeDepenseMutation
>;
export const updateTypeDepense = /* GraphQL */ `mutation UpdateTypeDepense(
  $input: UpdateTypeDepenseInput!
  $condition: ModelTypeDepenseConditionInput
) {
  updateTypeDepense(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTypeDepenseMutationVariables,
  APITypes.UpdateTypeDepenseMutation
>;
export const deleteTypeDepense = /* GraphQL */ `mutation DeleteTypeDepense(
  $input: DeleteTypeDepenseInput!
  $condition: ModelTypeDepenseConditionInput
) {
  deleteTypeDepense(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTypeDepenseMutationVariables,
  APITypes.DeleteTypeDepenseMutation
>;
export const createDepense = /* GraphQL */ `mutation CreateDepense(
  $input: CreateDepenseInput!
  $condition: ModelDepenseConditionInput
) {
  createDepense(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateDepenseMutationVariables,
  APITypes.CreateDepenseMutation
>;
export const updateDepense = /* GraphQL */ `mutation UpdateDepense(
  $input: UpdateDepenseInput!
  $condition: ModelDepenseConditionInput
) {
  updateDepense(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateDepenseMutationVariables,
  APITypes.UpdateDepenseMutation
>;
export const deleteDepense = /* GraphQL */ `mutation DeleteDepense(
  $input: DeleteDepenseInput!
  $condition: ModelDepenseConditionInput
) {
  deleteDepense(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteDepenseMutationVariables,
  APITypes.DeleteDepenseMutation
>;
export const createLabelsCollection = /* GraphQL */ `mutation CreateLabelsCollection(
  $input: CreateLabelsCollectionInput!
  $condition: ModelLabelsCollectionConditionInput
) {
  createLabelsCollection(input: $input, condition: $condition) {
    key
    label
    type
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateLabelsCollectionMutationVariables,
  APITypes.CreateLabelsCollectionMutation
>;
export const updateLabelsCollection = /* GraphQL */ `mutation UpdateLabelsCollection(
  $input: UpdateLabelsCollectionInput!
  $condition: ModelLabelsCollectionConditionInput
) {
  updateLabelsCollection(input: $input, condition: $condition) {
    key
    label
    type
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateLabelsCollectionMutationVariables,
  APITypes.UpdateLabelsCollectionMutation
>;
export const deleteLabelsCollection = /* GraphQL */ `mutation DeleteLabelsCollection(
  $input: DeleteLabelsCollectionInput!
  $condition: ModelLabelsCollectionConditionInput
) {
  deleteLabelsCollection(input: $input, condition: $condition) {
    key
    label
    type
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteLabelsCollectionMutationVariables,
  APITypes.DeleteLabelsCollectionMutation
>;
export const createTag = /* GraphQL */ `mutation CreateTag(
  $input: CreateTagInput!
  $condition: ModelTagConditionInput
) {
  createTag(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTagMutationVariables,
  APITypes.CreateTagMutation
>;
export const updateTag = /* GraphQL */ `mutation UpdateTag(
  $input: UpdateTagInput!
  $condition: ModelTagConditionInput
) {
  updateTag(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTagMutationVariables,
  APITypes.UpdateTagMutation
>;
export const deleteTag = /* GraphQL */ `mutation DeleteTag(
  $input: DeleteTagInput!
  $condition: ModelTagConditionInput
) {
  deleteTag(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTagMutationVariables,
  APITypes.DeleteTagMutation
>;
export const createVehicleTags = /* GraphQL */ `mutation CreateVehicleTags(
  $input: CreateVehicleTagsInput!
  $condition: ModelVehicleTagsConditionInput
) {
  createVehicleTags(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateVehicleTagsMutationVariables,
  APITypes.CreateVehicleTagsMutation
>;
export const updateVehicleTags = /* GraphQL */ `mutation UpdateVehicleTags(
  $input: UpdateVehicleTagsInput!
  $condition: ModelVehicleTagsConditionInput
) {
  updateVehicleTags(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateVehicleTagsMutationVariables,
  APITypes.UpdateVehicleTagsMutation
>;
export const deleteVehicleTags = /* GraphQL */ `mutation DeleteVehicleTags(
  $input: DeleteVehicleTagsInput!
  $condition: ModelVehicleTagsConditionInput
) {
  deleteVehicleTags(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteVehicleTagsMutationVariables,
  APITypes.DeleteVehicleTagsMutation
>;
