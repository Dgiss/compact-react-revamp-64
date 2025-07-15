
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { waitForAmplifyConfig, withCredentialRetry } from '@/config/aws-config.js';
import { fetchAllDevices } from './DeviceService.js';
import { cleanDataForGraphQL } from '@/lib/utils';

const client = generateClient();

export const fetchCompaniesWithVehicles = async () => {
  return await withCredentialRetry(async () => {
    console.log('=== FETCHING COMPANIES WITH VEHICLES (NEW APPROACH) ===');
    let allCompanies = [];
    let allVehicles = [];
    let allDevices = [];
    
    // First, fetch all companies to get the list of company IDs
    let nextToken = null;
    do {
      const variables = {
        limit: 1000,
        nextToken: nextToken
      };
      
      console.log('Fetching companies batch with variables:', variables);
      
      const companyList = await client.graphql({
        query: queries.listCompanies,
        variables: variables
      });
      
      const data = companyList.data.listCompanies;
      console.log('Companies batch received:', data.items.length);
      
      allCompanies = allCompanies.concat(data.items);
      nextToken = data.nextToken;
      
    } while (nextToken);
    
    console.log('Total companies fetched:', allCompanies.length);
    
    // Now for each company, fetch vehicles using vehiclesByCompanyVehiclesId
    // This query already includes company and device relations
    let totalVehiclesFromCompanies = 0;
    
    for (const company of allCompanies) {
      console.log(`=== PROCESSING COMPANY: ${company.name} (ID: ${company.id}) ===`);
      
      let companyNextToken = null;
      const companyVehicles = [];
      
      do {
        const vehiclesResult = await client.graphql({
          query: queries.vehiclesByCompanyVehiclesId,
          variables: {
            companyVehiclesId: company.id,
            limit: 1000,
            nextToken: companyNextToken
          }
        });
        
        const vehiclesData = vehiclesResult.data.vehiclesByCompanyVehiclesId;
        if (vehiclesData && vehiclesData.items && vehiclesData.items.length > 0) {
          console.log('Vehicles batch received for company:', vehiclesData.items.length);
          console.log('Sample vehicle with complete data:', vehiclesData.items[0]);
          
          vehiclesData.items.forEach(vehicle => {
            console.log(`Processing vehicle: ${vehicle.immat}`);
            console.log('Vehicle.company data:', vehicle.company);
            console.log('Vehicle.device data:', vehicle.device);
            
            // Use direct GraphQL data - company and device are already populated
            const companyName = vehicle.company?.name || "Non définie";
            const deviceData = vehicle.device;
            
            console.log('Direct company name from GraphQL:', companyName);
            console.log('Direct device SIM data from GraphQL:', deviceData?.sim);
            
            // Enhanced SIM/ICCID mapping using direct GraphQL data
            let simValue = "";
            if (deviceData) {
              simValue = deviceData.sim || 
                        deviceData.iccid || 
                        deviceData.telephone || 
                        deviceData.phoneNumber || 
                        deviceData.msisdn || 
                        "";
            }
            
            console.log('Final SIM value extracted:', simValue);
            
            const mappedVehicle = {
              ...vehicle,
              entreprise: companyName,
              type: "vehicle",
              immatriculation: vehicle.immat || "",
              nomVehicule: vehicle.nomVehicule || vehicle.code || "",
              imei: deviceData?.imei || "",
              typeBoitier: deviceData ? deviceData.protocolId?.toString() : "",
              marque: vehicle.marque || vehicle.brand?.brandName || "",
              modele: vehicle.modele_id || vehicle.modele?.modele || "",
              kilometrage: vehicle.kilometerage?.toString() || "",
              telephone: simValue,
              emplacement: vehicle.locations || "",
              deviceData: deviceData || null,
              isAssociated: !!deviceData,
              // Additional fields
              AWN_nom_commercial: vehicle.AWN_nom_commercial || "",
              energie: vehicle.energie || "",
              puissanceFiscale: vehicle.puissanceFiscale || "",
              couleur: vehicle.couleur || "",
              dateMiseEnCirculation: vehicle.dateMiseEnCirculation || "",
              VIN: vehicle.VIN || vehicle.AWN_VIN || ""
            };
            
            companyVehicles.push(mappedVehicle);
            totalVehiclesFromCompanies++;
          });
        }
        
        companyNextToken = vehiclesData?.nextToken;
        
      } while (companyNextToken);
      
      console.log(`Company ${company.name} has ${companyVehicles.length} vehicles`);
      allVehicles = allVehicles.concat(companyVehicles);
    }
    
    console.log('Total vehicles processed from companies using new approach:', totalVehiclesFromCompanies);
    
    // Fetch all devices for unassociated devices detection
    const devices = await fetchAllDevices();
    console.log('=== DEVICE DEBUG INFO ===');
    console.log('Total devices fetched:', devices.length);
    
    // Find devices that are not associated with any vehicle
    const associatedDeviceImeis = new Set(allVehicles.map(v => v.deviceData?.imei).filter(Boolean));
    const unassociatedDevices = devices
      .filter(device => device.imei && !associatedDeviceImeis.has(device.imei))
      .map(device => {
        // Enhanced SIM/ICCID mapping for unassociated devices too
        const simValue = device.sim || 
                        device.iccid || 
                        device.telephone || 
                        device.phoneNumber || 
                        device.msisdn || 
                        "";
        
        console.log(`Unassociated device ${device.imei} SIM mapping:`, {
          sim: device.sim,
          iccid: device.iccid,
          telephone: device.telephone,
          phoneNumber: device.phoneNumber,
          msisdn: device.msisdn,
          extractedSim: simValue
        });
        
        return {
          id: device.imei,
          entreprise: "Boîtier libre",
          type: "device",
          immatriculation: "",
          nomVehicule: "",
          imei: device.imei,
          typeBoitier: device.protocolId?.toString() || "",
          marque: "",
          modele: "",
          kilometrage: "",
          telephone: simValue,
          emplacement: "",
          deviceData: device,
          isAssociated: false
        };
      });
    
    console.log('Unassociated devices count:', unassociatedDevices.length);
    
    allDevices = [...allVehicles, ...unassociatedDevices];
    
    console.log('=== FINAL RESULT SUMMARY ===');
    console.log('Total companies:', allCompanies.length);
    console.log('Total vehicles:', allVehicles.length);
    console.log('Total unassociated devices:', unassociatedDevices.length);
    console.log('Total combined data:', allDevices.length);
    
    // Debug company names for search
    const companyNames = [...new Set(allDevices.map(item => item.entreprise).filter(Boolean))];
    console.log('Available company names for search:', companyNames);
    
    return { companies: allCompanies, vehicles: allDevices };
  });
};

export const updateVehicleData = async (data) => {
  await waitForAmplifyConfig();
  
  // Clean and adapt data for GraphQL - remove non-serializable properties
  const cleanedData = cleanDataForGraphQL(data);
  
  // Adapter aux nouveaux champs du schéma
  const vehicleDetails = {
    immat: cleanedData.immat || cleanedData.immatriculation,
    code: cleanedData.code,
    nomVehicule: cleanedData.nomVehicule,
    kilometerage: cleanedData.kilometerage ? parseInt(cleanedData.kilometerage) : undefined,
    kilometerageStart: cleanedData.kilometerageStart ? parseInt(cleanedData.kilometerageStart) : undefined,
    locations: cleanedData.locations || cleanedData.emplacement,
    marque: cleanedData.marque,
    modele_id: cleanedData.modele_id || cleanedData.modele,
    energie: cleanedData.energie,
    couleur: cleanedData.couleur,
    dateMiseEnCirculation: cleanedData.dateMiseEnCirculation,
    VIN: cleanedData.VIN,
    AWN_nom_commercial: cleanedData.AWN_nom_commercial,
    puissanceFiscale: cleanedData.puissanceFiscale ? parseInt(cleanedData.puissanceFiscale) : undefined,
    lastModificationDate: new Date().toISOString(),
    // Relation avec l'entreprise (nouvelle structure)
    companyVehiclesId: cleanedData.companyVehiclesId
  };

  // Remove undefined values to avoid GraphQL errors
  Object.keys(vehicleDetails).forEach(key => {
    if (vehicleDetails[key] === undefined) {
      delete vehicleDetails[key];
    }
  });

  console.log('Cleaned vehicle data for GraphQL:', vehicleDetails);

  await client.graphql({
    query: mutations.updateVehicle,
    variables: {
      input: vehicleDetails
    }
  });
};

export const deleteVehicleData = async (item) => {
  await waitForAmplifyConfig();
  
  // Clean data before sending to GraphQL
  const cleanedItem = cleanDataForGraphQL(item);
  
  const vehicleDetails = {
    immat: cleanedItem.immat || cleanedItem.immatriculation
  };

  console.log('Cleaned delete data for GraphQL:', vehicleDetails);

  await client.graphql({
    query: mutations.deleteVehicle,
    variables: { input: vehicleDetails }
  });
};

/**
 * Create a new vehicle
 */
export const createVehicleData = async (data) => {
  await waitForAmplifyConfig();
  
  // Clean and adapt data for GraphQL - remove non-serializable properties
  const cleanedData = cleanDataForGraphQL(data);
  
  const vehicleDetails = {
    immat: cleanedData.immatriculation,
    code: cleanedData.code,
    nomVehicule: cleanedData.nomVehicule,
    kilometerage: cleanedData.kilometrage ? parseInt(cleanedData.kilometrage) : undefined,
    locations: cleanedData.emplacement,
    marque: cleanedData.marque,
    modele_id: cleanedData.modele,
    energie: cleanedData.energie,
    couleur: cleanedData.couleur,
    dateMiseEnCirculation: cleanedData.dateMiseEnCirculation,
    VIN: cleanedData.VIN,
    AWN_nom_commercial: cleanedData.AWN_nom_commercial,
    puissanceFiscale: cleanedData.puissanceFiscale ? parseInt(cleanedData.puissanceFiscale) : undefined,
    lastModificationDate: new Date().toISOString(),
    companyVehiclesId: cleanedData.companyVehiclesId
  };

  // Remove undefined values to avoid GraphQL errors
  Object.keys(vehicleDetails).forEach(key => {
    if (vehicleDetails[key] === undefined) {
      delete vehicleDetails[key];
    }
  });

  console.log('Cleaned vehicle creation data for GraphQL:', vehicleDetails);

  const result = await client.graphql({
    query: mutations.createVehicle,
    variables: {
      input: vehicleDetails
    }
  });

  return result;
};

/**
 * Associate a device to a vehicle
 * @param {string} deviceImei - Device IMEI
 * @param {string} vehicleImmat - Vehicle immatriculation
 * @returns {Promise<Object>} Association result
 */
export const associateDeviceToVehicle = async (deviceImei, vehicleImmat) => {
  await waitForAmplifyConfig();
  
  console.log('=== ASSOCIATING DEVICE TO VEHICLE ===');
  console.log('Device IMEI:', deviceImei);
  console.log('Vehicle immat:', vehicleImmat);
  
  try {
    // First, update the device to associate it with the vehicle
    console.log('Updating device...');
    const deviceUpdate = await client.graphql({
      query: mutations.updateDevice,
      variables: {
        input: {
          imei: deviceImei,
          deviceVehicleImmat: vehicleImmat
        }
      }
    });
    console.log('Device update result:', deviceUpdate);

    // Then, update the vehicle to reference the device
    console.log('Updating vehicle...');
    const vehicleUpdate = await client.graphql({
      query: mutations.updateVehicle,
      variables: {
        input: {
          immat: vehicleImmat,
          vehicleDeviceImei: deviceImei
        }
      }
    });
    console.log('Vehicle update result:', vehicleUpdate);

    console.log('Device associated successfully:', { deviceImei, vehicleImmat });
    return { success: true, deviceUpdate, vehicleUpdate };
  } catch (error) {
    console.error('Error associating device to vehicle:', error);
    console.error('Error details:', error.message);
    if (error.errors) {
      console.error('GraphQL errors:', error.errors);
    }
    throw error;
  }
};
