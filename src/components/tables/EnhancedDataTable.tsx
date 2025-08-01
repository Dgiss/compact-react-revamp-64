import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Eye, EyeOff, Filter, Link, Search, Trash } from "lucide-react";
import { CopyableCell } from "./CopyableCell";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EnhancedPagination } from "@/components/ui/enhanced-pagination";
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
  selectedVehicles?: string[];
  selectedDevices?: string[];
  isSelectMode?: boolean;
  isDeviceSelectMode?: boolean;
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
  defaultItemsPerPage = 50,
  selectedVehicles = [],
  selectedDevices = [],
  isSelectMode = false,
  isDeviceSelectMode = false
}: EnhancedDataTableProps) {
  const [columns, setColumns] = useState<Column[]>(initialColumns.map(col => ({
    ...col,
    visible: col.visible !== undefined ? col.visible : true
  })));
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);
  const [searchColumn, setSearchColumn] = useState<string>(columns[0]?.id || "");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const visibleColumns = useMemo(() => {
    return columns.filter(column => column.visible);
  }, [columns]);
  const toggleColumnVisibility = (columnId: string) => {
    setColumns(columns.map(column => column.id === columnId ? {
      ...column,
      visible: !column.visible
    } : column));
  };
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({
      key,
      direction
    });
  };
  const getSortDirection = (key: string) => {
    if (!sortConfig) return undefined;
    return sortConfig.key === key ? sortConfig.direction : undefined;
  };

  // Filter data globally
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(item => {
      const value = item[searchColumn];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm, searchColumn]);

  // Sort data globally (before pagination)
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

  // Paginate data (after sorting)
  const paginatedData = useMemo(() => {
    if (!enablePagination) return sortedData;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, itemsPerPage, enablePagination]);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };
  const hasVisibleColumns = visibleColumns.length > 0;
  const displayData = enablePagination ? paginatedData : sortedData;

  // Determine if the item is a device (for association button)
  const isDevice = (item: any) => item.type === 'device';

  // Determine if a row is selected
  const isRowSelected = (row: any) => {
    if (row.type === 'vehicle' && isSelectMode) {
      return selectedVehicles.includes(row.immatriculation || row.immat);
    }
    if (row.type === 'device' && isDeviceSelectMode) {
      return selectedDevices.includes(row.imei);
    }
    return false;
  };

  // Fonction pour rendre le contenu d'une cellule
  const renderCellContent = (column: Column, row: any) => {
    const value = row[column.id];

    // Utiliser le renderCell personnalisé s'il existe
    if (column.renderCell) {
      return column.renderCell(value, row);
    }

    // Sinon, utiliser le rendu par défaut (CopyableCell)
    return <CopyableCell key={column.id} value={value} />;
  };
  if (loading) {
    return <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>;
  }
  return;
}