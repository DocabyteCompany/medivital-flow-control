
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, ExternalLink } from 'lucide-react';
import { Patient } from '@/data/patients';

interface EmailProviderDialogProps {
  patient: Patient;
  invoice?: string;
  children: React.ReactNode;
}

export const EmailProviderDialog = ({ patient, invoice, children }: EmailProviderDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getEmailData = () => {
    const subject = invoice 
      ? `Factura ${invoice} - ${patient.name}`
      : `Historial de Facturación - ${patient.name}`;
    
    const body = invoice 
      ? `Estimado/a ${patient.name},\n\nAdjunto encontrará la factura ${invoice} correspondiente a los servicios médicos prestados.\n\nSaludos cordiales,\nEquipo Médico`
      : `Estimado/a ${patient.name},\n\nAdjunto encontrará el historial completo de facturación de sus servicios médicos.\n\nSaludos cordiales,\nEquipo Médico`;

    return { subject, body };
  };

  const openGmail = () => {
    const { subject, body } = getEmailData();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(patient.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
    setIsOpen(false);
  };

  const openOutlook = () => {
    const { subject, body } = getEmailData();
    const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(patient.email)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(outlookUrl, '_blank');
    setIsOpen(false);
  };

  const openDefaultClient = () => {
    const { subject, body } = getEmailData();
    const mailtoUrl = `mailto:${patient.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Enviar Email
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <p><strong>Para:</strong> {patient.email}</p>
            <p><strong>Paciente:</strong> {patient.name}</p>
            {invoice && <p><strong>Factura:</strong> {invoice}</p>}
          </div>
          
          <div className="space-y-3">
            <p className="text-sm font-medium">Selecciona tu proveedor de email:</p>
            
            <Button 
              onClick={openGmail}
              variant="outline" 
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span>Gmail</span>
              </div>
              <ExternalLink className="w-4 h-4" />
            </Button>

            <Button 
              onClick={openOutlook}
              variant="outline" 
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span>Outlook</span>
              </div>
              <ExternalLink className="w-4 h-4" />
            </Button>

            <Button 
              onClick={openDefaultClient}
              variant="outline" 
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>Cliente de Email Predeterminado</span>
              </div>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
