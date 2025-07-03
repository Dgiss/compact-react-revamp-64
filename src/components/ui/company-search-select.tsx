import React, { useState, useEffect, useMemo } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { searchMockCompanies } from "@/services/MockDataService";

interface CompanySearchSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function CompanySearchSelect({
  value,
  onValueChange,
  placeholder = "Sélectionner une entreprise",
  className,
  disabled = false
}: CompanySearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search companies when search term changes
  useEffect(() => {
    const searchCompanies = async () => {
      setLoading(true);
      try {
        const results = await searchMockCompanies(searchTerm);
        setCompanies(results);
      } catch (error) {
        console.error("Error searching companies:", error);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    searchCompanies();
  }, [searchTerm]);

  // Load initial companies
  useEffect(() => {
    if (open && companies.length === 0) {
      setSearchTerm("");
    }
  }, [open]);

  const selectedCompany = useMemo(() => 
    companies.find(company => company.id === value || company.name === value),
    [companies, value]
  );

  const handleSelect = (company) => {
    onValueChange(company.id || company.name);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-full justify-between", className)}
        >
          {selectedCompany ? selectedCompany.name : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              placeholder="Rechercher une entreprise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-10 w-full border-0 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandList>
            {loading ? (
              <div className="py-6 text-center text-sm">
                Recherche en cours...
              </div>
            ) : (
              <>
                <CommandEmpty>
                  {searchTerm ? 
                    `Aucune entreprise trouvée pour "${searchTerm}"` : 
                    "Aucune entreprise trouvée"
                  }
                </CommandEmpty>
                <CommandGroup className="max-h-64 overflow-y-auto">
                  {companies.map((company) => (
                    <CommandItem
                      key={company.id}
                      value={company.name}
                      onSelect={() => handleSelect(company)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === company.id || value === company.name 
                            ? "opacity-100" 
                            : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{company.name}</span>
                        {company.siret && (
                          <span className="text-xs text-muted-foreground">
                            SIRET: {company.siret}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}