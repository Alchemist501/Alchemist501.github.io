import { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface ThemeRouteProps {
    children: React.ReactNode;
    theme: "dark" | "light";
}

export const ThemeRoute = ({ children, theme }: ThemeRouteProps) => {
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme(theme);
    }, [theme, setTheme]);

    return <>{children}</>;
};
