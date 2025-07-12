
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Stethoscope, 
  Heart, 
  Users, 
  Calendar, 
  Activity, 
  Bell,
  Plus,
  Settings
} from 'lucide-react';

export const StyleGuideDemo = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-brand-dark">Style Guide Demo</h1>
        <p className="text-muted-foreground">
          Demostración de todos los elementos de diseño del sistema
        </p>
      </div>

      {/* Colores */}
      <Card>
        <CardHeader>
          <CardTitle>Paleta de Colores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Brand Colors */}
          <div>
            <h3 className="text-lg font-medium mb-3">Brand Colors</h3>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-blue rounded-lg mb-2"></div>
                <p className="text-xs">Brand Blue</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-light rounded-lg mb-2"></div>
                <p className="text-xs">Brand Light</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-dark rounded-lg mb-2"></div>
                <p className="text-xs">Brand Dark</p>
              </div>
            </div>
          </div>

          {/* Vital Colors */}
          <div>
            <h3 className="text-lg font-medium mb-3">Vital Colors</h3>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-vital-pink rounded-lg mb-2"></div>
                <p className="text-xs">Vital Pink</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-vital-blue rounded-lg mb-2"></div>
                <p className="text-xs">Vital Blue</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-vital-purple rounded-lg mb-2"></div>
                <p className="text-xs">Vital Purple</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-vital-orange rounded-lg mb-2"></div>
                <p className="text-xs">Vital Orange</p>
              </div>
            </div>
          </div>

          {/* Status Colors */}
          <div>
            <h3 className="text-lg font-medium mb-3">Status Colors</h3>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-status-green rounded-lg mb-2"></div>
                <p className="text-xs">Status Green</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tipografía */}
      <Card>
        <CardHeader>
          <CardTitle>Tipografía</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-brand-dark">Título H1 - Poppins Bold</h1>
            <p className="text-xs text-muted-foreground">text-3xl font-bold</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Título H2 - Poppins Semibold</h2>
            <p className="text-xs text-muted-foreground">text-2xl font-semibold</p>
          </div>
          <div>
            <h3 className="text-xl font-medium">Título H3 - Poppins Medium</h3>
            <p className="text-xs text-muted-foreground">text-xl font-medium</p>
          </div>
          <div>
            <p className="text-base">Texto base - Poppins Regular</p>
            <p className="text-xs text-muted-foreground">text-base</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Texto descriptivo - Poppins Regular</p>
            <p className="text-xs text-muted-foreground">text-sm text-muted-foreground</p>
          </div>
        </CardContent>
      </Card>

      {/* Botones */}
      <Card>
        <CardHeader>
          <CardTitle>Botones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-brand-blue hover:bg-brand-blue/90">
              Primario
            </Button>
            <Button variant="outline" className="border-brand-blue text-brand-blue">
              Secundario
            </Button>
            <Button className="bg-status-green hover:bg-status-green/90">
              Éxito
            </Button>
            <Button variant="destructive">
              Destructivo
            </Button>
            <Button variant="ghost">
              Ghost
            </Button>
            <Button disabled>
              Deshabilitado
            </Button>
            <Button size="sm">
              Pequeño
            </Button>
            <Button size="lg">
              Grande
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Iconos */}
      <Card>
        <CardHeader>
          <CardTitle>Iconografía</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            <div className="text-center">
              <Stethoscope className="w-6 h-6 text-brand-blue mx-auto mb-2" />
              <p className="text-xs">Stethoscope</p>
            </div>
            <div className="text-center">
              <Heart className="w-6 h-6 text-vital-pink mx-auto mb-2" />
              <p className="text-xs">Heart</p>
            </div>
            <div className="text-center">
              <Users className="w-6 h-6 text-brand-blue mx-auto mb-2" />
              <p className="text-xs">Users</p>
            </div>
            <div className="text-center">
              <Calendar className="w-6 h-6 text-brand-blue mx-auto mb-2" />
              <p className="text-xs">Calendar</p>
            </div>
            <div className="text-center">
              <Activity className="w-6 h-6 text-vital-blue mx-auto mb-2" />
              <p className="text-xs">Activity</p>
            </div>
            <div className="text-center">
              <Bell className="w-6 h-6 text-vital-orange mx-auto mb-2" />
              <p className="text-xs">Bell</p>
            </div>
            <div className="text-center">
              <Plus className="w-6 h-6 text-status-green mx-auto mb-2" />
              <p className="text-xs">Plus</p>
            </div>
            <div className="text-center">
              <Settings className="w-6 h-6 text-brand-blue mx-auto mb-2" />
              <p className="text-xs">Settings</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Badges y Estados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Badge className="bg-status-green text-white">Activo</Badge>
            <Badge variant="secondary">Inactivo</Badge>
            <Badge className="bg-vital-orange text-white">Pendiente</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge className="bg-vital-pink text-white">Crítico</Badge>
            <Badge className="bg-brand-blue text-white">Información</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Métricas */}
      <Card>
        <CardHeader>
          <CardTitle>Tarjetas de Métricas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-blue-50 text-blue-700 transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold">24</div>
              <div className="text-sm">Pacientes Hoy</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-50 text-green-700 transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm">Consultas</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-50 text-purple-700 transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm">Satisfacción</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-50 text-orange-700 transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm">Emergencias</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formularios */}
      <Card>
        <CardHeader>
          <CardTitle>Elementos de Formulario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="demo-input">Campo de Texto</Label>
            <Input 
              id="demo-input" 
              placeholder="Ingresa tu texto aquí" 
              className="focus:ring-brand-blue focus:border-brand-blue"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="demo-input-error">Campo con Error</Label>
            <Input 
              id="demo-input-error" 
              placeholder="Campo requerido" 
              className="border-red-500 focus:ring-red-500"
            />
            <p className="text-red-500 text-sm">Este campo es requerido</p>
          </div>
        </CardContent>
      </Card>

      {/* Estados de Loading */}
      <Card>
        <CardHeader>
          <CardTitle>Estados de Carga</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
              <span>Cargando...</span>
            </div>
            <Button disabled className="opacity-50">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
              Procesando
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
