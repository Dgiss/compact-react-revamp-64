
import React from "react";
import { SimConsumptionTable } from "@/components/sim/SimConsumptionTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SimCardsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des Cartes SIM</h1>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Analyse de la Consommation</CardTitle>
        </CardHeader>
        <CardContent>
          <SimConsumptionTable />
        </CardContent>
      </Card>
    </div>
  );
}
