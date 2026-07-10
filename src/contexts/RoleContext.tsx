import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type Role = "systems" | "cybersecurity" | "ai";

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRoleState] = useState<Role>("systems");

  // Helper to extract role from pathname, hash, and window location
  const getRoleFromPathname = (path: string): Role => {
    const lowerPath = path.toLowerCase();
    const windowPath = window.location.pathname.toLowerCase();
    const windowHash = window.location.hash.toLowerCase();

    const matchesAI = 
      lowerPath.includes("ai") || 
      windowPath.includes("ai") || 
      windowHash.includes("ai");

    const matchesInfra = 
      lowerPath.includes("infra") || 
      lowerPath.includes("systems") || 
      windowPath.includes("infra") || 
      windowPath.includes("systems") || 
      windowHash.includes("infra") || 
      windowHash.includes("systems");

    if (matchesAI) {
      return "ai";
    }
    if (matchesInfra) {
      return "systems";
    }
    return "cybersecurity"; // default
  };

  // Sync role and class names with location pathname
  useEffect(() => {
    const computedRole = getRoleFromPathname(location.pathname);
    setRoleState(computedRole);

    // Apply focus accent class name to document element for global theme CSS shifts
    document.documentElement.classList.remove("focus-systems", "focus-cybersecurity", "focus-ai");
    document.documentElement.classList.add(`focus-${computedRole}`);
  }, [location.pathname]);

  const setRole = (newRole: Role) => {
    const isProfessional = location.pathname.startsWith("/professional");
    let targetPath = "/";

    if (newRole === "cybersecurity") {
      targetPath = isProfessional ? "/professional" : "/";
    } else if (newRole === "ai") {
      targetPath = isProfessional ? "/professional/ai" : "/ai";
    } else {
      targetPath = isProfessional ? "/professional/infra" : "/infra";
    }

    navigate(targetPath);
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
