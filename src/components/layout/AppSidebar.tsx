import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Building2, Car, BarChart, Download } from "lucide-react";

export function AppSidebar() {
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Entreprises & Utilisateurs",
      icon: Building2,
      path: "/entreprises",
    },
    {
      title: "Véhicules & Boîtiers",
      icon: Car,
      path: "/vehicules-boitiers",
    },
    {
      title: "Cartes SIM",
      icon: BarChart,
      path: "/sim-cards",
    },
    {
      title: "FotaWeb",
      icon: Download,
      path: "/fota-web",
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-blue-500 font-bold text-2xl">G</span>
            <span className="text-gray-800 font-medium">eoloc</span>
            <span className="text-xs text-gray-500 mt-2">SYSTEMS</span>
          </Link>
        </div>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === item.path}
                >
                  <Link to={item.path}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-xs text-gray-500">
          © 2025 Geoloc Systems
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
