
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SimCardTable } from "./SimCardTable";
import { SimCardChart } from "./SimCardChart";
import { SimCardFilters } from "./SimCardFilters";
import { generateSimCardData, SimCard } from "./sim-data-utils";

export default function SimCardManagement() {
  // Generate initial data
  const [simCards, setSimCards] = useState<SimCard[]>(generateSimCardData());
  const [viewType, setViewType] = useState<"table" | "chart">("table");
  
  // Filter states
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [periodFilter, setPeriodFilter] = useState<string>("month");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // Apply filters to data
  const filteredData = simCards.filter((card) => {
    // Filter by type
    if (typeFilter !== "all" && card.type !== typeFilter) return false;
    
    // Filter by status
    if (statusFilter !== "all" && card.status !== statusFilter) return false;
    
    // Filter by search term
    if (searchTerm && !card.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  });

  // Handle status change (simulated)
  const handleStatusChange = (simId: string, newStatus: string) => {
    setSimCards(prev => 
      prev.map(card => 
        card.id === simId ? { ...card, status: newStatus } : card
      )
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des Cartes SIM</h1>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Analyse de la Consommation</CardTitle>
            <Tabs value={viewType} onValueChange={(v) => setViewType(v as "table" | "chart")} className="w-56">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="table">Tableau</TabsTrigger>
                <TabsTrigger value="chart">Graphique</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <SimCardFilters 
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            periodFilter={periodFilter}
            setPeriodFilter={setPeriodFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          
          {viewType === "table" ? (
            <SimCardTable 
              data={filteredData} 
              period={periodFilter}
              onStatusChange={handleStatusChange}
            />
          ) : (
            <SimCardChart 
              data={filteredData} 
              period={periodFilter}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
