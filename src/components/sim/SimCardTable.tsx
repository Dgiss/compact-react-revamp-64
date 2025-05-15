
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { SimCard, getThresholds, getSimTypeDisplayName, formatDate } from "./sim-data-utils";
import { Button } from "@/components/ui/button";

interface SimCardTableProps {
  data: SimCard[];
  period: string;
  onStatusChange: (simId: string, newStatus: string) => void;
}

export function SimCardTable({ data, period, onStatusChange }: SimCardTableProps) {
  // Helper function to determine consumption color
  const getConsumptionColor = (percentage: number): string => {
    if (percentage < 50) return "bg-green-500";
    if (percentage < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Helper function to determine status badge color
  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "suspended": return "bg-yellow-100 text-yellow-800";
      case "blocked": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Helper function to get status display name
  const getStatusDisplayName = (status: string): string => {
    switch (status) {
      case "active": return "Actif";
      case "suspended": return "Suspendu";
      case "blocked": return "Bloqué";
      default: return status;
    }
  };

  // Helper function to get action button based on status
  const getActionButton = (sim: SimCard) => {
    if (sim.status === "active") {
      return (
        <Button 
          variant="outline" 
          size="sm"
          className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
          onClick={() => onStatusChange(sim.id, "suspended")}
        >
          Suspendre
        </Button>
      );
    } else {
      return (
        <Button 
          variant="outline" 
          size="sm"
          className="text-green-600 border-green-600 hover:bg-green-50"
          onClick={() => onStatusChange(sim.id, "active")}
        >
          Réactiver
        </Button>
      );
    }
  };

  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-40">ID Carte SIM</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Forfait</TableHead>
            <TableHead className="min-w-[140px]">Données</TableHead>
            <TableHead className="min-w-[140px]">SMS</TableHead>
            <TableHead className="min-w-[140px]">Appels</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Dernière activité</TableHead>
            <TableHead className="w-32">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((sim) => {
              const thresholds = getThresholds(sim.type);
              const dataPercentage = (sim.dataUsage / sim.dataPlan) * 100;
              const smsPercentage = (sim.smsCount / sim.smsPlan) * 100;
              const callPercentage = (sim.callDuration / sim.callPlan) * 100;
              
              return (
                <TableRow key={sim.id}>
                  <TableCell className="font-medium">{sim.id}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${sim.type === "Truphone" ? "bg-blue-100 text-blue-800" : 
                        sim.type === "Things Mobile" ? "bg-purple-100 text-purple-800" : 
                        "bg-indigo-100 text-indigo-800"}`
                    }>
                      {getSimTypeDisplayName(sim.type)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs">
                      {sim.dataPlan} MB / {sim.smsPlan} SMS / {sim.callPlan} min
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm mb-1">
                      {sim.dataUsage} / {sim.dataPlan} MB
                    </div>
                    <Progress 
                      value={dataPercentage} 
                      className="h-2 bg-gray-100"
                    />
                    <div className={`h-2 w-full rounded-full mt-[-8px] overflow-hidden`}>
                      <div 
                        className={`h-full ${getConsumptionColor(dataPercentage)}`}
                        style={{ width: `${dataPercentage}%` }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm mb-1">
                      {sim.smsCount} / {sim.smsPlan}
                    </div>
                    <Progress 
                      value={smsPercentage} 
                      className="h-2 bg-gray-100"
                    />
                    <div className={`h-2 w-full rounded-full mt-[-8px] overflow-hidden`}>
                      <div 
                        className={`h-full ${getConsumptionColor(smsPercentage)}`}
                        style={{ width: `${smsPercentage}%` }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm mb-1">
                      {sim.callDuration} / {sim.callPlan} min
                    </div>
                    <Progress 
                      value={callPercentage} 
                      className="h-2 bg-gray-100"
                    />
                    <div className={`h-2 w-full rounded-full mt-[-8px] overflow-hidden`}>
                      <div 
                        className={`h-full ${getConsumptionColor(callPercentage)}`}
                        style={{ width: `${callPercentage}%` }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(sim.status)}`}>
                      {getStatusDisplayName(sim.status)}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(sim.lastActivity)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {getActionButton(sim)}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4 text-muted-foreground">
                Aucune donnée disponible
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
