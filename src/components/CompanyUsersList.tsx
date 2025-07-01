
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  sub?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  role?: string;
  nom?: string;
  username?: string;
  password?: string;
}

interface CompanyUsersProps {
  companyName: string;
  users: User[];
}

export function CompanyUsersList({ companyName, users }: CompanyUsersProps) {
  const [showPasswords, setShowPasswords] = useState(false);

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
    return user.username || user.sub || user.id || "Utilisateur";
  };

  const getUserId = (user: User) => {
    return user.sub || user.id || "N/A";
  };

  const getUserRole = (user: User) => {
    if (user.role === "Admin") return "Manager";
    if (user.role === "Opérateur") return "Rapport";
    return user.role || "Rapport";
  };

  const maskPassword = (password: string) => {
    return password ? "•".repeat(Math.min(password.length, 12)) : "N/A";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center cursor-pointer hover:underline text-blue-600">
        {companyName} <ChevronDown className="h-4 w-4 ml-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto p-0 min-w-[700px]">
        <div className="p-3 border-b flex justify-between items-center">
          <h4 className="font-medium">Utilisateurs de {companyName}</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPasswords(!showPasswords)}
            className="flex items-center gap-2"
          >
            {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showPasswords ? "Masquer" : "Afficher"} mots de passe
          </Button>
        </div>
        <div className="p-2">
          {users.length === 0 ? (
            <p className="text-sm text-muted-foreground p-2">Aucun utilisateur trouvé</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom complet</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Mot de passe</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id || user.sub}>
                    <TableCell className="font-medium">{formatUserName(user)}</TableCell>
                    <TableCell className="text-sm font-mono bg-gray-50 px-2 py-1 rounded">
                      {user.username || "N/A"}
                    </TableCell>
                    <TableCell>{user.email || "N/A"}</TableCell>
                    <TableCell>{getUserRole(user)}</TableCell>
                    <TableCell className="font-mono">
                      {user.password ? (
                        <span className={`text-sm px-2 py-1 rounded ${
                          showPasswords 
                            ? "bg-yellow-50 text-yellow-800 border border-yellow-200" 
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {showPasswords ? user.password : maskPassword(user.password)}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        {showPasswords && (
          <div className="p-2 border-t bg-yellow-50 text-xs text-yellow-800">
            ⚠️ Attention : Les mots de passe sont visibles. Assurez-vous que personne d'autre ne regarde votre écran.
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
