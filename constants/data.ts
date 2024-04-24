import { SidebarNavItem } from "@/types/SidebarNavItem";

export const SidebarNavItems: SidebarNavItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: "dashboard",
        label: "Dashboard",
    },
    {
        title: "Users",
        href: "/dashboard/users",
        icon: "user",
        label: "user",
    },
    {
        title: "OAuth Clients",
        href: "/dashboard/oauth-clients",
        icon: "employee",
        label: "employee",
    },
    {
        title: "Locations",
        href: "/dashboard/locations",
        icon: "profile",
        label: "profile",
    }
];