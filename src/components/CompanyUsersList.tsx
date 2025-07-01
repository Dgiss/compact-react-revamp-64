
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
  sub?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  role?: string;
  nom?: string;
  motDePasse?: string;
}

interface CompanyUsersProps {
  companyName: string;
  users: User[];
}

export function CompanyUsersList({ companyName, users }: CompanyUsersProps) {
  const formatUserName = (user: User) => {
    if (user.firstname && user.lastname) {
      return `${user.firstname} ${user.lastname}`;
    }
    if (user.firstname) {
      return user.firstname;
    }
    if (user.nom) {
      return user.nom;
    }
    return user.sub || user.id || "Utilisateur";
  };

  const getUserId = (user: User) => {
    return user.sub || user.id || "N/A";
  };

  const getUserRole = (user: User) => {
    if (user.role === "Admin") return "Manager";
    if (user.role === "Opérateur") return "Rapport";
    return user.role || "Rapport";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center cursor-pointer hover:underline text-blue-600">
        {companyName} <ChevronDown className="h-4 w-4 ml-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto p-0 min-w-[500px]">
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
                  <TableHead>Nom complet</TableHead>
                  <TableHead>ID Utilisateur</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Mot de passe</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id || user.sub}>
                    <TableCell className="font-medium">{formatUserName(user)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{getUserId(user)}</TableCell>
                    <TableCell>{user.email || "N/A"}</TableCell>
                    <TableCell>{getUserRole(user)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        Géré par le système
                      </span>
                    </TableCell>
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
