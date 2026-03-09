import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NewRequest from "./pages/NewRequest";
import NotFound from "./pages/NotFound";
import Review from "./pages/Review";
import Decision from "./pages/Decision";
import Committee from "./pages/Committee";
import TrackRequest from "./pages/TrackRequest";
import Policy from "./pages/Policy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/new-request" element={<NewRequest />} />
          <Route path="/review" element={<Review />} />
          <Route path="/decision" element={<Decision />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/track" element={<TrackRequest />} />
          <Route path="/policy" element={<Policy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
