import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { RoleProvider } from "@/contexts/RoleContext";
import { ThemeRoute } from "@/components/ThemeRoute";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogSeries from "./pages/BlogSeries";
import BlogPost from "./pages/BlogPost";
import Research from "./pages/Research";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <RoleProvider>
            <Routes>
              {/* Primary Entry Points & Pages */}
              <Route path="/" element={<Index />} />
              <Route path="/cyber" element={<Index />} />
              <Route path="/ai" element={<Index />} />
              
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/series/:series" element={<BlogSeries />} />
              <Route path="/blog/:slug" element={<BlogPost />} />

              {/* Professional / Dark Mode Entry Points & Pages */}
              <Route path="/professional" element={<ThemeRoute theme="dark"><Index /></ThemeRoute>} />
              <Route path="/professional/cyber" element={<ThemeRoute theme="dark"><Index /></ThemeRoute>} />
              <Route path="/professional/ai" element={<ThemeRoute theme="dark"><Index /></ThemeRoute>} />
              
              <Route path="/professional/blog" element={<ThemeRoute theme="dark"><Blog /></ThemeRoute>} />
              <Route path="/professional/blog/series/:series" element={<ThemeRoute theme="dark"><BlogSeries /></ThemeRoute>} />
              <Route path="/professional/blog/:slug" element={<ThemeRoute theme="dark"><BlogPost /></ThemeRoute>} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RoleProvider>
        </HashRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
