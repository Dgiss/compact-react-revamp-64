
import React from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface User {
  id: string;
  nom: string;
  motDePasse: string;
  role?: string;
}

interface CompanyUsersProps {
  companyName: string;
  users: User[];
}

export function CompanyUsersList({ companyName, users }: CompanyUsersProps) {
  return (
    <HoverCard openDelay={0} closeDelay={200}>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <Users className="h-4 w-4" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0">
        <div className="p-3 border-b">
          <h4 className="font-medium">Utilisateurs de {companyName}</h4>
        </div>
        <div className="p-2">
          {users.length === 0 ? (
            <p className="text-sm text-muted-foreground p-2">Aucun utilisateur trouvé</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">ID</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Rôle</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id.substring(0, 4)}</TableCell>
                    <TableCell>{user.nom}</TableCell>
                    <TableCell>{user.role || "Utilisateur"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
