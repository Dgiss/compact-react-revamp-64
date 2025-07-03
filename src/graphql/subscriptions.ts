
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateCompany = /* GraphQL */ `subscription OnCreateCompany(
  $filter: ModelSubscriptionCompanyFilterInput
) {
  onCreateCompany(filter: $filter) {
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
` as GeneratedSubscription<APITypes.OnCreateCompanySubscriptionVariables, APITypes.OnCreateCompanySubscription>;

export const onUpdateCompany = /* GraphQL */ `subscription OnUpdateCompany(
  $filter: ModelSubscriptionCompanyFilterInput
) {
  onUpdateCompany(filter: $filter) {
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
` as GeneratedSubscription<APITypes.OnUpdateCompanySubscriptionVariables, APITypes.OnUpdateCompanySubscription>;

export const onDeleteCompany = /* GraphQL */ `subscription OnDeleteCompany(
  $filter: ModelSubscriptionCompanyFilterInput
) {
  onDeleteCompany(filter: $filter) {
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
` as GeneratedSubscription<APITypes.OnDeleteCompanySubscriptionVariables, APITypes.OnDeleteCompanySubscription>;

export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
) {
  onCreateUser(filter: $filter) {
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
` as GeneratedSubscription<APITypes.OnCreateUserSubscriptionVariables, APITypes.OnCreateUserSubscription>;

export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
) {
  onUpdateUser(filter: $filter) {
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
` as GeneratedSubscription<APITypes.OnUpdateUserSubscriptionVariables, APITypes.OnUpdateUserSubscription>;

export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
) {
  onDeleteUser(filter: $filter) {
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
` as GeneratedSubscription<APITypes.OnDeleteUserSubscriptionVariables, APITypes.OnDeleteUserSubscription>;

export const onCreateVehicle = /* GraphQL */ `subscription OnCreateVehicle(
  $filter: ModelSubscriptionVehicleFilterInput
) {
  onCreateVehicle(filter: $filter) {
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
` as GeneratedSubscription<APITypes.OnCreateVehicleSubscriptionVariables, APITypes.OnCreateVehicleSubscription>;

export const onUpdateVehicle = /* GraphQL */ `subscription OnUpdateVehicle(
  $filter: ModelSubscriptionVehicleFilterInput
) {
  onUpdateVehicle(filter: $filter) {
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
` as GeneratedSubscription<APITypes.OnUpdateVehicleSubscriptionVariables, APITypes.OnUpdateVehicleSubscription>;

export const onDeleteVehicle = /* GraphQL */ `subscription OnDeleteVehicle(
  $filter: ModelSubscriptionVehicleFilterInput
) {
  onDeleteVehicle(filter: $filter) {
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
` as GeneratedSubscription<APITypes.OnDeleteVehicleSubscriptionVariables, APITypes.OnDeleteVehicleSubscription>;

export const onCreateDevice = /* GraphQL */ `subscription OnCreateDevice(
  $filter: ModelSubscriptionDeviceFilterInput
) {
  onCreateDevice(filter: $filter) {
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
` as GeneratedSubscription<APITypes.OnCreateDeviceSubscriptionVariables, APITypes.OnCreateDeviceSubscription>;

export const onUpdateDevice = /* GraphQL */ `subscription OnUpdateDevice(
  $filter: ModelSubscriptionDeviceFilterInput
) {
  onUpdateDevice(filter: $filter) {
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
` as GeneratedSubscription<APITypes.OnUpdateDeviceSubscriptionVariables, APITypes.OnUpdateDeviceSubscription>;

export const onDeleteDevice = /* GraphQL */ `subscription OnDeleteDevice(
  $filter: ModelSubscriptionDeviceFilterInput
) {
  onDeleteDevice(filter: $filter) {
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
` as GeneratedSubscription<APITypes.OnDeleteDeviceSubscriptionVariables, APITypes.OnDeleteDeviceSubscription>;

export const onCreateSimCard = /* GraphQL */ `subscription OnCreateSimCard(
  $filter: ModelSubscriptionSimCardFilterInput
) {
  onCreateSimCard(filter: $filter) {
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
` as GeneratedSubscription<APITypes.OnCreateSimCardSubscriptionVariables, APITypes.OnCreateSimCardSubscription>;

export const onUpdateSimCard = /* GraphQL */ `subscription OnUpdateSimCard(
  $filter: ModelSubscriptionSimCardFilterInput
) {
  onUpdateSimCard(filter: $filter) {
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
` as GeneratedSubscription<APITypes.OnUpdateSimCardSubscriptionVariables, APITypes.OnUpdateSimCardSubscription>;

export const onDeleteSimCard = /* GraphQL */ `subscription OnDeleteSimCard(
  $filter: ModelSubscriptionSimCardFilterInput
) {
  onDeleteSimCard(filter: $filter) {
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
` as GeneratedSubscription<APITypes.OnDeleteSimCardSubscriptionVariables, APITypes.OnDeleteSimCardSubscription>;
