
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bot, Stethoscope, FileText, TrendingUp } from 'lucide-react';
import { getUserConfiguration, saveUserConfiguration, AIToolsSettings as AIToolsSettingsType } from '@/services/configurationService';
import { useToast } from '@/components/ui/use-toast';

export const AIToolsSettings = () => {
  const [settings, setSettings] = useState<AIToolsSettingsType>({
    diagnosticAssistant: true,
    prescriptionSuggestions: true,
    clinicalNotes: false,
    patientRiskAnalysis: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    const config = getUserConfiguration();
    setSettings(config.aiTools);
  }, []);

  const handleSettingChange = (key: keyof AIToolsSettingsType, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
  };

  const handleSave = () => {
    saveUserConfiguration({ aiTools: settings });
    toast({
      title: "Configuración guardada",
      description: "Tus preferencias de herramientas IA han sido actualizadas.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-brand-dark mb-2">Herramientas de Inteligencia Artificial</h3>
        <p className="text-gray-600">Activa o desactiva las herramientas IA que quieres usar en tu práctica médica.</p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-brand-blue" />
              Asistente de Diagnóstico
            </CardTitle>
            <CardDescription>
              IA que sugiere posibles diagnósticos basados en síntomas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="diagnostic-assistant"
                checked={settings.diagnosticAssistant}
                onCheckedChange={(checked) => handleSettingChange('diagnosticAssistant', checked)}
              />
              <Label htmlFor="diagnostic-assistant">Activar asistente de diagnóstico</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Bot className="w-4 h-4 text-brand-blue" />
              Sugerencias de Prescripción
            </CardTitle>
            <CardDescription>
              Recomendaciones automáticas de medicamentos y dosificaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="prescription-suggestions"
                checked={settings.prescriptionSuggestions}
                onCheckedChange={(checked) => handleSettingChange('prescriptionSuggestions', checked)}
              />
              <Label htmlFor="prescription-suggestions">Activar sugerencias de prescripción</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-blue" />
              Notas Clínicas Automatizadas
            </CardTitle>
            <CardDescription>
              Generación automática de resúmenes y notas clínicas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="clinical-notes"
                checked={settings.clinicalNotes}
                onCheckedChange={(checked) => handleSettingChange('clinicalNotes', checked)}
              />
              <Label htmlFor="clinical-notes">Activar notas clínicas automatizadas</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-blue" />
              Análisis de Riesgo de Pacientes
            </CardTitle>
            <CardDescription>
              Evaluación automática de factores de riesgo y alertas tempranas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="patient-risk-analysis"
                checked={settings.patientRiskAnalysis}
                onCheckedChange={(checked) => handleSettingChange('patientRiskAnalysis', checked)}
              />
              <Label htmlFor="patient-risk-analysis">Activar análisis de riesgo</Label>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Bot className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Importante sobre IA Médica</h4>
            <p className="text-sm text-blue-800">
              Las herramientas de IA son asistentes que complementan tu criterio médico. 
              Siempre revisa y valida las sugerencias antes de aplicarlas en el tratamiento de pacientes.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} className="bg-brand-blue hover:bg-brand-blue/90">
          Guardar Configuración
        </Button>
      </div>
    </div>
  );
};
