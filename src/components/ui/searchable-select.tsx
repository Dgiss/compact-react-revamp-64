
"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getUnassignedDevices } from "@/services/CompanyDeviceService"

export interface SearchableSelectOption {
  value: string
  label: string
}

interface SearchableSelectProps {
  options?: SearchableSelectOption[]
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  emptyMessage?: string
  disabled?: boolean
  className?: string
  loadUnassignedDevices?: boolean
}

export function SearchableSelect({
  options = [],
  value,
  onValueChange,
  placeholder = "Sélectionner une option",
  emptyMessage = "Aucun résultat trouvé",
  disabled = false,
  className,
  loadUnassignedDevices = false,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [dynamicOptions, setDynamicOptions] = React.useState<SearchableSelectOption[]>(options)
  const [loading, setLoading] = React.useState(false)
  
  // Load unassigned devices when the prop is true
  React.useEffect(() => {
    if (loadUnassignedDevices && open && dynamicOptions.length === 0) {
      loadFreeDevices()
    }
  }, [loadUnassignedDevices, open])

  const loadFreeDevices = async () => {
    setLoading(true)
    try {
      console.log('SearchableSelect: Loading unassigned devices...')
      const unassignedDevices = await getUnassignedDevices()
      
      const deviceOptions = unassignedDevices.map(device => ({
        value: device.imei,
        label: `${device.imei} ${device.protocolId ? `(Protocol: ${device.protocolId})` : ''}`
      }))
      
      console.log('SearchableSelect: Loaded device options:', deviceOptions.length)
      setDynamicOptions(deviceOptions)
    } catch (error) {
      console.error('SearchableSelect: Error loading unassigned devices:', error)
      setDynamicOptions([])
    } finally {
      setLoading(false)
    }
  }

  // Use dynamic options if loading unassigned devices, otherwise use provided options
  const finalOptions = loadUnassignedDevices ? dynamicOptions : options
  const selectedOption = finalOptions.find(option => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled || loading}
          className={cn("w-full justify-between", className)}
        >
          {selectedOption ? selectedOption.label : loading ? "Chargement..." : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder={`Rechercher...`} />
          <CommandList>
            {loading ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Chargement des boîtiers libres...
              </div>
            ) : (
              <>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-y-auto">
                  {finalOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => {
                        onValueChange(option.value)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
