import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export function useUserContext() {
    // Ensure to handle undefined context value
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('SidebarNav must be used within a SidebarProvider');
    }

    return context;
}