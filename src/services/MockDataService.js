/**
 * Mock data service to provide test data when GraphQL is unavailable
 */

// Mock companies data
const mockCompanies = [
  { id: "1", name: "Transport Dupont", siret: "12345678901234" },
  { id: "2", name: "Logistique Martin", siret: "23456789012345" },
  { id: "3", name: "aaaa", siret: "34567890123456" },
  { id: "4", name: "Express Delivery", siret: "45678901234567" },
  { id: "5", name: "Route 66 Transport", siret: "56789012345678" }
];

// Mock vehicles data
const mockVehicles = [
  {
    id: "v1",
    immatriculation: "AB-123-CD",
    nomVehicule: "Camion 1",
    entreprise: "Transport Dupont",
    marque: "Renault",
    modele: "Master",
    imei: "123456789012345",
    typeBoitier: "GPS Tracker",
    telephone: "0612345678",
    emplacement: "Paris",
    type: "vehicle",
    isAssociated: true
  },
  {
    id: "v2", 
    immatriculation: "EF-456-GH",
    nomVehicule: "Utilitaire 2",
    entreprise: "aaaa",
    marque: "Peugeot",
    modele: "Partner",
    imei: "234567890123456",
    typeBoitier: "GPS Simple",
    telephone: "0623456789",
    emplacement: "Lyon",
    type: "vehicle",
    isAssociated: true
  },
  {
    id: "d1",
    immatriculation: "",
    nomVehicule: "",
    entreprise: "Boîtier libre",
    marque: "",
    modele: "",
    imei: "345678901234567",
    typeBoitier: "GPS Avancé",
    telephone: "0634567890",
    emplacement: "",
    type: "device",
    isAssociated: false
  }
];

/**
 * Mock function to simulate fetchCompaniesWithVehicles
 */
export const fetchMockCompaniesWithVehicles = async () => {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    companies: mockCompanies,
    vehicles: mockVehicles
  };
};

/**
 * Mock function to simulate company search with filtering
 */
export const searchMockCompanies = async (searchTerm) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  if (!searchTerm) return mockCompanies;
  
  return mockCompanies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Get all unique company names from mock data
 */
export const getMockCompanyNames = () => {
  return [...new Set(mockVehicles.map(v => v.entreprise).filter(Boolean))];
};