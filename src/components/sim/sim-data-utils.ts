
import { format, subDays, subWeeks } from "date-fns";

// Define the SIM Card interface
export interface SimCard {
  id: string;
  type: "Truphone" | "Things Mobile" | "Phenix";
  dataPlan: number; // in MB
  dataUsage: number; // in MB
  smsPlan: number;
  smsCount: number;
  callPlan: number; // in minutes
  callDuration: number; // in minutes
  status: "active" | "suspended" | "blocked" | "recharging";
  lastActivity: Date;
  rechargePending?: boolean;
  lastRechargeDate?: Date;
  nextRenewalDate?: Date;
}

// Define thresholds for each type of SIM
export const getThresholds = (type: string) => {
  switch (type) {
    case "Truphone":
      return {
        data: 5000, // 5GB
        sms: 500,
        calls: 300,
      };
    case "Things Mobile":
      return {
        data: 2000, // 2GB
        sms: 200,
        calls: 120,
      };
    case "Phenix":
      return {
        data: 3000, // 3GB
        sms: 300,
        calls: 200,
      };
    default:
      return {
        data: 1000,
        sms: 100,
        calls: 60,
      };
  }
};

// Generate random SIM ID based on type
export const generateSimId = (type: "Truphone" | "Things Mobile" | "Phenix", index: number): string => {
  switch (type) {
    case "Truphone":
      return `8944${String(index).padStart(2, '0')}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    case "Things Mobile":
      return `3933${String(index).padStart(2, '0')}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    case "Phenix":
      return `3367${String(index).padStart(2, '0')}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  }
};

// Generate random data usage percentage (between 5% and 95% of the plan)
export const generateUsagePercentage = (): number => {
  return 0.05 + Math.random() * 0.9; // Between 5% and 95%
};

// Generate random status
export const generateStatus = (): "active" | "suspended" | "blocked" | "recharging" => {
  const statuses: ("active" | "suspended" | "blocked" | "recharging")[] = ["active", "suspended", "blocked", "recharging"];
  const weights = [0.75, 0.15, 0.05, 0.05]; // 75% active, 15% suspended, 5% blocked, 5% recharging
  
  const random = Math.random();
  let sum = 0;
  for (let i = 0; i < statuses.length; i++) {
    sum += weights[i];
    if (random <= sum) {
      return statuses[i];
    }
  }
  return "active"; // Default
};

// Generate random last activity date (between today and 30 days ago)
export const generateLastActivity = (): Date => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  return subDays(now, daysAgo);
};

// Generate next renewal date (between 7 and 30 days from now)
export const generateNextRenewalDate = (): Date => {
  const now = new Date();
  const daysToAdd = 7 + Math.floor(Math.random() * 23); // Between 7 and 30 days
  return new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
};

// Format date for display
export const formatDate = (date: Date): string => {
  return format(date, "dd/MM/yyyy HH:mm");
};

// Get display name for SIM type
export const getSimTypeDisplayName = (type: string): string => {
  return type;
};

// Get display name for status
export const getStatusDisplayName = (status: string): string => {
  switch (status) {
    case "active": return "Actif";
    case "suspended": return "Suspendu";
    case "blocked": return "Bloqué";
    case "recharging": return "En recharge";
    default: return status;
  }
};

// Check if a SIM card needs recharge (usage > 80%)
export const needsRecharge = (sim: SimCard): boolean => {
  const dataPercentage = (sim.dataUsage / sim.dataPlan) * 100;
  const smsPercentage = (sim.smsCount / sim.smsPlan) * 100;
  const callPercentage = (sim.callDuration / sim.callPlan) * 100;
  
  return dataPercentage > 80 || smsPercentage > 80 || callPercentage > 80;
};

// Generate complete SIM card data
export const generateSimCardData = (): SimCard[] => {
  const simCards: SimCard[] = [];
  const simTypes: ("Truphone" | "Things Mobile" | "Phenix")[] = ["Truphone", "Things Mobile", "Phenix"];
  
  // Generate 5 SIM cards for each type
  simTypes.forEach(type => {
    for (let i = 1; i <= 5; i++) {
      const thresholds = getThresholds(type);
      const dataPlan = thresholds.data;
      const smsPlan = thresholds.sms;
      const callPlan = thresholds.calls;
      
      const dataUsagePercentage = generateUsagePercentage();
      const smsUsagePercentage = generateUsagePercentage();
      const callUsagePercentage = generateUsagePercentage();
      
      const status = generateStatus();
      const lastActivity = generateLastActivity();
      
      simCards.push({
        id: generateSimId(type, i),
        type,
        dataPlan,
        dataUsage: Math.round(dataPlan * dataUsagePercentage),
        smsPlan,
        smsCount: Math.round(smsPlan * smsUsagePercentage),
        callPlan,
        callDuration: Math.round(callPlan * callUsagePercentage),
        status,
        lastActivity,
        nextRenewalDate: generateNextRenewalDate(),
        rechargePending: status === "recharging",
        lastRechargeDate: status === "recharging" ? subDays(new Date(), Math.floor(Math.random() * 7)) : undefined
      });
    }
  });
  
  return simCards;
};
