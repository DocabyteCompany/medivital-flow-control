
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/MainLayout";
import Patients from "./pages/Patients";
import Messages from "./pages/Messages";
import Agenda from "./pages/Agenda";
import Records from "./pages/Records";
import IaActivities from "./pages/IaActivities";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/pacientes" replace />} />
            <Route path="/pacientes" element={<Patients />} />
            <Route path="/mensajes" element={<Messages />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/expedientes" element={<Records />} />
            <Route path="/ia-activities" element={<IaActivities />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
