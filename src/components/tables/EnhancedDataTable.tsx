
import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Eye, EyeOff, Filter, Link, Search, Trash } from "lucide-react";
import { CopyableCell } from "./CopyableCell";
import { EnhancedPagination } from "@/components/ui/enhanced-pagination";
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
  loading?: boolean;
  enablePagination?: boolean;
  defaultItemsPerPage?: number;
}

export function EnhancedDataTable({ 
  columns: initialColumns, 
  data, 
  onEdit, 
  onDelete, 
  onAssociate,
  renderActions,
  loading = false,
  enablePagination = false,
  defaultItemsPerPage = 50
}: EnhancedDataTableProps) {
  const [columns, setColumns] = useState<Column[]>(
    initialColumns.map(col => ({ ...col, visible: col.visible !== undefined ? col.visible : true }))
  );
  
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [searchColumn, setSearchColumn] = useState<string>(columns[0]?.id || "");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

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

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(item => {
      const value = item[searchColumn];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm, searchColumn]);

  // Sort ALL filtered data (global sort, not just current page)
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

  // Paginate the sorted data
  const paginatedData = useMemo(() => {
    if (!enablePagination) return sortedData;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, itemsPerPage, enablePagination]);

  // Pagination calculations
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

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
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={hasVisibleColumns ? visibleColumns.length + ((renderActions || onEdit || onDelete || onAssociate) ? 1 : 0) : 1} className="text-center py-4">
                  Aucune donnée disponible
                </TableCell>
              </TableRow>
            ) : hasVisibleColumns ? (
              paginatedData.map((row, index) => (
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

      {enablePagination && totalItems > 0 && (
        <EnhancedPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}
    </div>
  );
}
