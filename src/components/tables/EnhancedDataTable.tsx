import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Eye, EyeOff, Filter, Link, Search, Trash } from "lucide-react";
import { CopyableCell } from "./CopyableCell";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Column {
  id: string;
  label: string;
  sortable?: boolean;
  visible?: boolean;
  renderCell?: (value: any, row: any) => React.ReactNode;
}

interface EnhancedDataTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onAssociate?: (item: any) => void;
  renderActions?: (item: any) => React.ReactNode;
}

export function EnhancedDataTable({ 
  columns: initialColumns, 
  data, 
  onEdit, 
  onDelete, 
  onAssociate,
  renderActions
}: EnhancedDataTableProps) {
  const [columns, setColumns] = useState<Column[]>(
    initialColumns.map(col => ({ ...col, visible: col.visible !== undefined ? col.visible : true }))
  );
  
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [searchColumn, setSearchColumn] = useState<string>(columns[0]?.id || "");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const visibleColumns = useMemo(() => {
    return columns.filter(column => column.visible);
  }, [columns]);

  const toggleColumnVisibility = (columnId: string) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId ? { ...column, visible: !column.visible } : column
      )
    );
  };

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };

  const getSortDirection = (key: string) => {
    if (!sortConfig) return undefined;
    return sortConfig.key === key ? sortConfig.direction : undefined;
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(item => {
      const value = item[searchColumn];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm, searchColumn]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Handle null/undefined values for sorting
      if (aValue === null || aValue === undefined) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (bValue === null || bValue === undefined) return sortConfig.direction === 'ascending' ? 1 : -1;

      // Compare values
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const hasVisibleColumns = visibleColumns.length > 0;

  // Determine if the item is a device (for association button)
  const isDevice = (item: any) => item.type === 'device';

  // Fonction pour rendre le contenu d'une cellule
  const renderCellContent = (column: Column, row: any) => {
    const value = row[column.id];
    
    // Utiliser le renderCell personnalisé s'il existe
    if (column.renderCell) {
      return column.renderCell(value, row);
    }
    
    // Sinon, utiliser le rendu par défaut (CopyableCell)
    return (
      <CopyableCell key={column.id} value={value} />
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex-1 min-w-[200px] max-w-md">
          <div className="flex gap-2">
            <Select 
              value={searchColumn} 
              onValueChange={setSearchColumn}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sélectionner une colonne" />
              </SelectTrigger>
              <SelectContent>
                {columns.map((column) => (
                  <SelectItem key={column.id} value={column.id}>
                    {column.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Colonnes
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Colonnes visibles</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {columns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.visible}
                onCheckedChange={() => toggleColumnVisibility(column.id)}
              >
                {column.label}
                {column.visible ? 
                  <Eye className="h-3.5 w-3.5 ml-2 text-muted-foreground" /> : 
                  <EyeOff className="h-3.5 w-3.5 ml-2 text-muted-foreground" />
                }
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {hasVisibleColumns ? (
                visibleColumns.map((column) => (
                  <TableHead 
                    key={column.id}
                    className={column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                    onClick={() => column.sortable && requestSort(column.id)}
                  >
                    <div className="flex items-center whitespace-nowrap">
                      {column.label}
                      {column.sortable && (
                        <span className="ml-1">
                          {getSortDirection(column.id) === 'ascending' && '↑'}
                          {getSortDirection(column.id) === 'descending' && '↓'}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))
              ) : (
                <TableHead>Aucune colonne sélectionnée</TableHead>
              )}
              {(renderActions || onEdit || onDelete || onAssociate) && hasVisibleColumns && 
                <TableHead className="w-24">Actions</TableHead>
              }
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={hasVisibleColumns ? visibleColumns.length + ((renderActions || onEdit || onDelete || onAssociate) ? 1 : 0) : 1} className="text-center py-4">
                  Aucune donnée disponible
                </TableCell>
              </TableRow>
            ) : hasVisibleColumns ? (
              sortedData.map((row, index) => (
                <TableRow key={index}>
                  {visibleColumns.map((column) => (
                    <TableCell key={column.id}>
                      {renderCellContent(column, row)}
                    </TableCell>
                  ))}
                  {(renderActions || onEdit || onDelete || onAssociate) && (
                    <TableCell>
                      {renderActions ? (
                        renderActions(row)
                      ) : (
                        <div className="flex gap-1">
                          {onEdit && (
                            <Button variant="ghost" size="icon" onClick={() => onEdit(row)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          {onDelete && (
                            <Button variant="ghost" size="icon" onClick={() => onDelete(row)}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          )}
                          {onAssociate && isDevice(row) && (
                            <Button variant="ghost" size="icon" onClick={() => onAssociate(row)}>
                              <Link className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
