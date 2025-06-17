
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PatientStatsWidget } from '@/components/statistics/PatientStatsWidget';
import { PersonnelStatsWidget } from '@/components/statistics/PersonnelStatsWidget';
import { AppointmentStatsWidget } from '@/components/statistics/AppointmentStatsWidget';
import { FinancialStatsWidget } from '@/components/statistics/FinancialStatsWidget';
import { BarChart3, Users, Stethoscope, Calendar, DollarSign } from 'lucide-react';

const Estadisticas = () => {
  return (
    <div className="flex flex-col gap-6 mt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-brand-blue" />
            Estadísticas y Reportes
          </h1>
          <p className="text-gray-600 mt-1">
            Análisis completo de la actividad de la clínica
          </p>
        </div>
      </div>

      {/* Tabs para diferentes categorías de estadísticas */}
      <Tabs defaultValue="pacientes" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pacientes" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Pacientes
          </TabsTrigger>
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="citas" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Citas
          </TabsTrigger>
          <TabsTrigger value="financiero" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Financiero
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pacientes" className="mt-6">
          <PatientStatsWidget />
        </TabsContent>

        <TabsContent value="personal" className="mt-6">
          <PersonnelStatsWidget />
        </TabsContent>

        <TabsContent value="citas" className="mt-6">
          <AppointmentStatsWidget />
        </TabsContent>

        <TabsContent value="financiero" className="mt-6">
          <FinancialStatsWidget />
        </TabsContent>
      </Tabs>

      {/* Información adicional */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Información del Reporte</CardTitle>
          <CardDescription>
            Datos actualizados en tiempo real basados en la información de la clínica
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <strong>Última actualización:</strong><br />
              {new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <div>
              <strong>Período de datos:</strong><br />
              Enero 2025 - Presente
            </div>
            <div>
              <strong>Fuente de datos:</strong><br />
              Sistema MediApp en tiempo real
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Estadisticas;
