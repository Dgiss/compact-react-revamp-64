/* eslint-disable */
// Simplified mutations to avoid GraphQL null field errors

export const updateVehicleSimple = /* GraphQL */ `
  mutation UpdateVehicleSimple(
    $input: UpdateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    updateVehicle(input: $input, condition: $condition) {
      immat
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
  }
`;

export const createVehicleSimple = /* GraphQL */ `
  mutation CreateVehicleSimple(
    $input: CreateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    createVehicle(input: $input, condition: $condition) {
      immat
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
  }
`;