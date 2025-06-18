import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePatientPermissions } from '@/hooks/usePatientPermissions';
import { DollarSign, CreditCard, AlertCircle, CheckCircle, Download, Mail } from 'lucide-react';
import { Patient } from '@/data/patients';
import { EmailProviderDialog } from './EmailProviderDialog';

interface PatientBillingProps {
  patient: Patient;
}

// Mock data específico por paciente - actualizado a pesos mexicanos
const getPatientBilling = (patientId: string) => {
  const billingData = {
    '1': [ // Jorge Villareal
      {
        id: 1,
        service: 'Consulta Cardiología',
        amount: 2400,
        date: '2025-06-15',
        status: 'paid',
        insurance: 'IMSS',
        invoice: 'FAC-2025-001'
      },
      {
        id: 2,
        service: 'Análisis Completo',
        amount: 1900,
        date: '2025-05-20',
        status: 'paid',
        insurance: 'IMSS',
        invoice: 'FAC-2025-005'
      },
      {
        id: 3,
        service: 'Electrocardiograma',
        amount: 1300,
        date: '2025-04-15',
        status: 'paid',
        insurance: 'IMSS',
        invoice: 'FAC-2025-012'
      }
    ],
    '2': [ // Sofía Ramirez
      {
        id: 1,
        service: 'Consulta Pediatría',
        amount: 1700,
        date: '2025-06-14',
        status: 'pending',
        insurance: 'ISSSTE',
        invoice: 'FAC-2025-002'
      },
      {
        id: 2,
        service: 'Vacunación',
        amount: 900,
        date: '2025-05-28',
        status: 'paid',
        insurance: 'ISSSTE',
        invoice: 'FAC-2025-008'
      }
    ]
  };

  return billingData[patientId as keyof typeof billingData] || billingData['1'];
};

const getStatusInfo = (status: string) => {
  switch (status) {
    case 'paid':
      return { 
        text: 'Pagado', 
        className: 'bg-green-100 text-green-800',
        icon: CheckCircle
      };
    case 'pending':
      return { 
        text: 'Pendiente', 
        className: 'bg-yellow-100 text-yellow-800',
        icon: CreditCard
      };
    case 'overdue':
      return { 
        text: 'Vencido', 
        className: 'bg-red-100 text-red-800',
        icon: AlertCircle
      };
    default:
      return { 
        text: '', 
        className: '',
        icon: CreditCard
      };
  }
};

const handleEmailShare = (patient: Patient, invoice?: string) => {
  const subject = invoice 
    ? `Factura ${invoice} - ${patient.name}`
    : `Historial de Facturación - ${patient.name}`;
  
  const body = invoice 
    ? `Estimado/a ${patient.name},\n\nAdjunto encontrará la factura ${invoice} correspondiente a los servicios médicos prestados.\n\nSaludos cordiales,\nEquipo Médico`
    : `Estimado/a ${patient.name},\n\nAdjunto encontrará el historial completo de facturación de sus servicios médicos.\n\nSaludos cordiales,\nEquipo Médico`;

  const mailtoUrl = `mailto:${patient.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoUrl, '_blank');
};

export const PatientBilling = ({ patient }: PatientBillingProps) => {
  const { t } = useTranslation();
  const { isAdmin } = usePatientPermissions();

  // Solo los administradores pueden ver facturación
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Acceso Restringido</h3>
          <p className="text-gray-600">No tienes permisos para ver la información de facturación.</p>
        </div>
      </div>
    );
  }

  const billingData = getPatientBilling(patient.id);
  const totalPendiente = billingData
    .filter(item => item.status === 'pending' || item.status === 'overdue')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalPagado = billingData
    .filter(item => item.status === 'paid')
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pagado</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalPagado.toLocaleString()} MXN</div>
            <p className="text-xs text-muted-foreground">Historial completo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendiente</CardTitle>
            <CreditCard className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">${totalPendiente.toLocaleString()} MXN</div>
            <p className="text-xs text-muted-foreground">Por cobrar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Facturas</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{billingData.length}</div>
            <p className="text-xs text-muted-foreground">Registros</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Historial de Facturación - {patient.name}</CardTitle>
          <EmailProviderDialog patient={patient}>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Enviar Historial por Email
            </Button>
          </EmailProviderDialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billingData.map((item) => {
              const statusInfo = getStatusInfo(item.status);
              const StatusIcon = statusInfo.icon;
              
              return (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-gray-900">{item.service}</p>
                      <p className="text-xs text-gray-400">{item.insurance}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">${item.amount.toLocaleString()} MXN</p>
                      <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-400">{item.invoice}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge className={statusInfo.className}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.text}
                      </Badge>
                      
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </Button>
                      
                      <EmailProviderDialog patient={patient} invoice={item.invoice}>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </Button>
                      </EmailProviderDialog>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
