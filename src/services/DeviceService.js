
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import { waitForAmplifyConfig } from '@/config/aws-config.js';

const client = generateClient();

export const fetchAllDevices = async () => {
  await waitForAmplifyConfig();
  let allDevices = [];
  let nextToken = null;
  
  do {
    const variables = {
      limit: 1000,
      nextToken: nextToken
    };
    
    const deviceList = await client.graphql({
      query: queries.listDevices,
      variables: variables
    });
    
    const data = deviceList.data.listDevices;
    allDevices = allDevices.concat(data.items);
    nextToken = data.nextToken;
    
  } while (nextToken);
  
  return allDevices;
};

// Helper function to determine device type/name from protocolId
export const getDeviceTypeName = (protocolId) => {
  const deviceTypeMap = {
    '1': 'Tracker GPS Standard',
    '2': 'Tracker GPS Avancé',
    '3': 'Boîtier Teltonika',
    '4': 'Dispositif OBD',
    '5': 'Tracker Magnétique',
    // Add more mappings as needed
  };
  
  return deviceTypeMap[protocolId] || 'GPS Tracker';
};
