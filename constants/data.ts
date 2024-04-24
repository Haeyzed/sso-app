import { SidebarNavItem } from "@/types/SidebarNavItem";

export const SidebarNavItems: SidebarNavItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: "dashboard",
        label: "Dashboard",
    },
    {
        title: "User",
        href: "/dashboard/users",
        icon: "user",
        label: "user",
    },
    {
        title: "Employee",
        href: "/dashboard/employee",
        icon: "employee",
        label: "employee",
    },
    {
        title: "Profile",
        href: "/dashboard/profile",
        icon: "profile",
        label: "profile",
    },
    {
        title: "Kanban",
        href: "/dashboard/kanban",
        icon: "kanban",
        label: "kanban",
    },
    {
        title: "Login",
        href: "/",
        icon: "login",
        label: "login",
    },
];