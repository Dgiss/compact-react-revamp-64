
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createCompany = /* GraphQL */ `mutation CreateCompany(
  $input: CreateCompanyInput!
  $condition: ModelCompanyConditionInput
) {
  createCompany(input: $input, condition: $condition) {
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
` as GeneratedMutation<APITypes.CreateCompanyMutationVariables, APITypes.CreateCompanyMutation>;

export const updateCompany = /* GraphQL */ `mutation UpdateCompany(
  $input: UpdateCompanyInput!
  $condition: ModelCompanyConditionInput
) {
  updateCompany(input: $input, condition: $condition) {
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
` as GeneratedMutation<APITypes.UpdateCompanyMutationVariables, APITypes.UpdateCompanyMutation>;

export const deleteCompany = /* GraphQL */ `mutation DeleteCompany(
  $input: DeleteCompanyInput!
  $condition: ModelCompanyConditionInput
) {
  deleteCompany(input: $input, condition: $condition) {
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
` as GeneratedMutation<APITypes.DeleteCompanyMutationVariables, APITypes.DeleteCompanyMutation>;

export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<APITypes.CreateUserMutationVariables, APITypes.CreateUserMutation>;

export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<APITypes.UpdateUserMutationVariables, APITypes.UpdateUserMutation>;

export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<APITypes.DeleteUserMutationVariables, APITypes.DeleteUserMutation>;

export const createVehicle = /* GraphQL */ `mutation CreateVehicle(
  $input: CreateVehicleInput!
  $condition: ModelVehicleConditionInput
) {
  createVehicle(input: $input, condition: $condition) {
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
` as GeneratedMutation<APITypes.CreateVehicleMutationVariables, APITypes.CreateVehicleMutation>;

export const updateVehicle = /* GraphQL */ `mutation UpdateVehicle(
  $input: UpdateVehicleInput!
  $condition: ModelVehicleConditionInput
) {
  updateVehicle(input: $input, condition: $condition) {
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
` as GeneratedMutation<APITypes.UpdateVehicleMutationVariables, APITypes.UpdateVehicleMutation>;

export const deleteVehicle = /* GraphQL */ `mutation DeleteVehicle(
  $input: DeleteVehicleInput!
  $condition: ModelVehicleConditionInput
) {
  deleteVehicle(input: $input, condition: $condition) {
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
` as GeneratedMutation<APITypes.DeleteVehicleMutationVariables, APITypes.DeleteVehicleMutation>;

export const createDevice = /* GraphQL */ `mutation CreateDevice(
  $input: CreateDeviceInput!
  $condition: ModelDeviceConditionInput
) {
  createDevice(input: $input, condition: $condition) {
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
` as GeneratedMutation<APITypes.CreateDeviceMutationVariables, APITypes.CreateDeviceMutation>;

export const updateDevice = /* GraphQL */ `mutation UpdateDevice(
  $input: UpdateDeviceInput!
  $condition: ModelDeviceConditionInput
) {
  updateDevice(input: $input, condition: $condition) {
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
` as GeneratedMutation<APITypes.UpdateDeviceMutationVariables, APITypes.UpdateDeviceMutation>;

export const deleteDevice = /* GraphQL */ `mutation DeleteDevice(
  $input: DeleteDeviceInput!
  $condition: ModelDeviceConditionInput
) {
  deleteDevice(input: $input, condition: $condition) {
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
` as GeneratedMutation<APITypes.DeleteDeviceMutationVariables, APITypes.DeleteDeviceMutation>;

export const createSimCard = /* GraphQL */ `mutation CreateSimCard(
  $input: CreateSimCardInput!
  $condition: ModelSimCardConditionInput
) {
  createSimCard(input: $input, condition: $condition) {
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
` as GeneratedMutation<APITypes.CreateSimCardMutationVariables, APITypes.CreateSimCardMutation>;

export const updateSimCard = /* GraphQL */ `mutation UpdateSimCard(
  $input: UpdateSimCardInput!
  $condition: ModelSimCardConditionInput
) {
  updateSimCard(input: $input, condition: $condition) {
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
` as GeneratedMutation<APITypes.UpdateSimCardMutationVariables, APITypes.UpdateSimCardMutation>;

export const deleteSimCard = /* GraphQL */ `mutation DeleteSimCard(
  $input: DeleteSimCardInput!
  $condition: ModelSimCardConditionInput
) {
  deleteSimCard(input: $input, condition: $condition) {
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
` as GeneratedMutation<APITypes.DeleteSimCardMutationVariables, APITypes.DeleteSimCardMutation>;
