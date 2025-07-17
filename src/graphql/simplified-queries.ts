/* eslint-disable */
// Simplified GraphQL queries to avoid complex nested fields that cause issues

export const listVehiclesSimple = /* GraphQL */ `
  query ListVehiclesSimple(
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVehicles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        immat
        vehicleDeviceImei
        companyVehiclesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const listDevicesSimple = /* GraphQL */ `
  query ListDevicesSimple(
    $filter: ModelDeviceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDevices(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        imei
        typeBoitier
        deviceVehicleImmat
        __typename
      }
      nextToken
      __typename
    }
  }
`;