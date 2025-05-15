
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";

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
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center cursor-pointer hover:underline text-blue-600">
        {companyName} <ChevronDown className="h-4 w-4 ml-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto p-0 min-w-[400px]">
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
                  <TableHead>Nom</TableHead>
                  <TableHead>Mot de passe</TableHead>
                  <TableHead>Rôle</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.nom}</TableCell>
                    <TableCell>{user.motDePasse}</TableCell>
                    <TableCell>{
                      user.role === "Admin" ? "Manager" : 
                      user.role === "Opérateur" ? "Rapport" : 
                      user.role || "Rapport"
                    }</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
