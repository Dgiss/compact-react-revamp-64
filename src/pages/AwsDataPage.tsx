
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { userService, companyService, User, Company } from "@/services/awsService";
import { Edit, Trash, Plus, Loader2 } from "lucide-react";

export default function AwsDataPage() {
  // État pour les utilisateurs et les entreprises
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);

  // État pour les formulaires
  const [newUser, setNewUser] = useState<User>({ username: "", password: "" });
  const [editUser, setEditUser] = useState<User | null>(null);
  const [newCompany, setNewCompany] = useState<Company>({ name: "" });
  const [editCompany, setEditCompany] = useState<Company | null>(null);

  // Charger les données initiales
  useEffect(() => {
    fetchData();
  }, []);

  // Fonction pour récupérer les données
  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchedUsers = await userService.listUsers();
      const fetchedCompanies = await companyService.listCompanies();
      setUsers(fetchedUsers);
      setCompanies(fetchedCompanies);
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fonctions pour gérer les utilisateurs
  const handleAddUser = async () => {
    try {
      if (!newUser.username || !newUser.password) {
        toast({
          title: "Erreur",
          description: "Veuillez remplir tous les champs obligatoires",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);
      const createdUser = await userService.createUser(newUser);
      setUsers([...users, createdUser]);
      setNewUser({ username: "", password: "" });
      toast({
        title: "Succès",
        description: "Utilisateur créé avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer l'utilisateur",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    try {
      if (!editUser || !editUser.id || !editUser.username || !editUser.password) {
        toast({
          title: "Erreur",
          description: "Données utilisateur invalides",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);
      const updatedUser = await userService.updateUser(editUser);
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
      setEditUser(null);
      toast({
        title: "Succès",
        description: "Utilisateur mis à jour avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'utilisateur",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      setLoading(true);
      await userService.deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
      toast({
        title: "Succès",
        description: "Utilisateur supprimé avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'utilisateur",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fonctions pour gérer les entreprises
  const handleAddCompany = async () => {
    try {
      if (!newCompany.name) {
        toast({
          title: "Erreur",
          description: "Veuillez saisir un nom d'entreprise",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);
      const createdCompany = await companyService.createCompany(newCompany);
      setCompanies([...companies, createdCompany]);
      setNewCompany({ name: "" });
      toast({
        title: "Succès",
        description: "Entreprise créée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer l'entreprise",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCompany = async () => {
    try {
      if (!editCompany || !editCompany.id || !editCompany.name) {
        toast({
          title: "Erreur",
          description: "Données d'entreprise invalides",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);
      const updatedCompany = await companyService.updateCompany(editCompany);
      setCompanies(companies.map(company => company.id === updatedCompany.id ? updatedCompany : company));
      setEditCompany(null);
      toast({
        title: "Succès",
        description: "Entreprise mise à jour avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'entreprise",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCompany = async (id: string) => {
    try {
      setLoading(true);
      await companyService.deleteCompany(id);
      setCompanies(companies.filter(company => company.id !== id));
      toast({
        title: "Succès",
        description: "Entreprise supprimée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'entreprise",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">AWS AppSync Data</h1>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="companies">Entreprises</TabsTrigger>
        </TabsList>
        
        {/* Onglet Utilisateurs */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ajouter un utilisateur</CardTitle>
              <CardDescription>Créer un nouvel utilisateur dans la base de données</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input 
                  placeholder="Nom d'utilisateur"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                />
                <Input 
                  placeholder="Mot de passe"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                />
                <Input 
                  placeholder="ID Entreprise (optionnel)"
                  value={newUser.companyId || ""}
                  onChange={(e) => setNewUser({...newUser, companyId: e.target.value})}
                />
                <Button 
                  onClick={handleAddUser} 
                  disabled={loading || !newUser.username || !newUser.password}
                  className="whitespace-nowrap"
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                  Ajouter
                </Button>
              </div>
            </CardContent>
          </Card>

          {editUser && (
            <Card>
              <CardHeader>
                <CardTitle>Modifier l'utilisateur</CardTitle>
                <CardDescription>Modifier les détails de l'utilisateur</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input 
                    placeholder="Nom d'utilisateur"
                    value={editUser.username}
                    onChange={(e) => setEditUser({...editUser, username: e.target.value})}
                  />
                  <Input 
                    placeholder="Mot de passe"
                    value={editUser.password}
                    onChange={(e) => setEditUser({...editUser, password: e.target.value})}
                  />
                  <Input 
                    placeholder="ID Entreprise"
                    value={editUser.companyId || ""}
                    onChange={(e) => setEditUser({...editUser, companyId: e.target.value})}
                  />
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleUpdateUser} 
                      disabled={loading || !editUser.username || !editUser.password}
                    >
                      Enregistrer
                    </Button>
                    <Button variant="outline" onClick={() => setEditUser(null)}>
                      Annuler
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Liste des utilisateurs</CardTitle>
              <CardDescription>{users.length} utilisateur(s) trouvé(s)</CardDescription>
            </CardHeader>
            <CardContent>
              {loading && <div className="flex justify-center p-4"><Loader2 className="h-8 w-8 animate-spin" /></div>}
              
              {!loading && users.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  Aucun utilisateur trouvé
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nom d'utilisateur</TableHead>
                        <TableHead>Mot de passe</TableHead>
                        <TableHead>Entreprise ID</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.password}</TableCell>
                          <TableCell>{user.companyId || "-"}</TableCell>
                          <TableCell>{user.role || "-"}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => setEditUser(user)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => user.id && handleDeleteUser(user.id)}>
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Onglet Entreprises */}
        <TabsContent value="companies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ajouter une entreprise</CardTitle>
              <CardDescription>Créer une nouvelle entreprise dans la base de données</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input 
                  placeholder="Nom de l'entreprise"
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                />
                <Button 
                  onClick={handleAddCompany} 
                  disabled={loading || !newCompany.name}
                  className="whitespace-nowrap"
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                  Ajouter
                </Button>
              </div>
            </CardContent>
          </Card>

          {editCompany && (
            <Card>
              <CardHeader>
                <CardTitle>Modifier l'entreprise</CardTitle>
                <CardDescription>Modifier les détails de l'entreprise</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input 
                    placeholder="Nom de l'entreprise"
                    value={editCompany.name}
                    onChange={(e) => setEditCompany({...editCompany, name: e.target.value})}
                  />
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleUpdateCompany} 
                      disabled={loading || !editCompany.name}
                    >
                      Enregistrer
                    </Button>
                    <Button variant="outline" onClick={() => setEditCompany(null)}>
                      Annuler
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Liste des entreprises</CardTitle>
              <CardDescription>{companies.length} entreprise(s) trouvée(s)</CardDescription>
            </CardHeader>
            <CardContent>
              {loading && <div className="flex justify-center p-4"><Loader2 className="h-8 w-8 animate-spin" /></div>}
              
              {!loading && companies.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  Aucune entreprise trouvée
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {companies.map((company) => (
                        <TableRow key={company.id}>
                          <TableCell className="font-medium">{company.id}</TableCell>
                          <TableCell>{company.name}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => setEditCompany(company)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => company.id && handleDeleteCompany(company.id)}>
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
