
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { UserPlus, Clock, CheckCircle, XCircle, ArrowRight, AlertTriangle, X } from 'lucide-react';
import { referrals, getDoctorForReferral, cancelReferral, type MedicalReferral } from '@/data/referrals';
import { addHistoryEntry } from '@/data/recordHistory';
import { type Patient } from '@/data/patients';
import { CreateReferralDialog } from './CreateReferralDialog';
import { useRecordsPermissions } from '@/hooks/useRecordsPermissions';
import { useToast } from '@/hooks/use-toast';

type ReferralsSectionProps = {
  patient: Patient;
  currentDoctorId?: string;
};

export const ReferralsSection = ({ patient, currentDoctorId = '1' }: ReferralsSectionProps) => {
  const { toast } = useToast();
  const { canCreateReferrals, canManageReferrals, canCancelReferrals } = useRecordsPermissions();
  const patientReferrals = referrals.filter(ref => ref.patientId === patient.id);

  const getStatusColor = (status: MedicalReferral['status']) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Accepted': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Transferred': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: MedicalReferral['status']) => {
    switch (status) {
      case 'Pending': return 'Pendiente';
      case 'Accepted': return 'Aceptado';
      case 'Completed': return 'Completado';
      case 'Transferred': return 'Transferido';
      case 'Cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getUrgencyIcon = (urgency: MedicalReferral['urgency']) => {
    if (urgency === 'Urgent' || urgency === 'High') {
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
    return <Clock className="w-4 h-4 text-gray-400" />;
  };

  const handleAcceptReferral = (referralId: string) => {
    const referral = referrals.find(ref => ref.id === referralId);
    if (referral) {
      referral.status = 'Accepted';
      referral.updatedAt = new Date().toISOString();
      
      addHistoryEntry({
        patientId: patient.id,
        action: 'referral_accepted',
        description: `Referido aceptado para ${referral.specialty}`,
        performedBy: currentDoctorId,
        performedByName: getDoctorForReferral(currentDoctorId)?.name || 'Doctor',
        timestamp: new Date().toISOString(),
        details: { referralId, specialty: referral.specialty }
      });

      toast({
        title: "Referido Aceptado",
        description: "Has aceptado este referido médico.",
      });
    }
  };

  const handleTransferReferral = (referralId: string) => {
    toast({
      title: "Referido Transferido",
      description: "El referido ha sido transferido a otro especialista.",
    });
  };

  const handleCancelReferral = (referralId: string) => {
    const success = cancelReferral(referralId, 'Cancelado por el doctor');
    if (success) {
      const referral = referrals.find(ref => ref.id === referralId);
      
      addHistoryEntry({
        patientId: patient.id,
        action: 'referral_cancelled',
        description: `Referido cancelado para ${referral?.specialty}`,
        performedBy: currentDoctorId,
        performedByName: getDoctorForReferral(currentDoctorId)?.name || 'Doctor',
        timestamp: new Date().toISOString(),
        details: { referralId, specialty: referral?.specialty }
      });

      toast({
        title: "Referido Cancelado",
        description: "El referido ha sido cancelado correctamente.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Referidos Médicos
            {patientReferrals.length > 0 && (
              <Badge variant="outline">{patientReferrals.length}</Badge>
            )}
          </CardTitle>
          {canCreateReferrals() && (
            <CreateReferralDialog patient={patient} fromDoctorId={currentDoctorId} />
          )}
        </div>
      </CardHeader>
      <CardContent>
        {patientReferrals.length > 0 ? (
          <div className="space-y-4">
            {patientReferrals.map((referral) => {
              const fromDoctor = getDoctorForReferral(referral.fromDoctorId);
              const toDoctor = getDoctorForReferral(referral.toDoctorId);
              const canManage = canManageReferrals() && currentDoctorId === referral.toDoctorId && referral.status === 'Pending';
              const canCancel = canCancelReferrals() && (referral.status === 'Pending' || referral.status === 'Accepted') && (currentDoctorId === referral.fromDoctorId || currentDoctorId === referral.toDoctorId);

              return (
                <div key={referral.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getUrgencyIcon(referral.urgency)}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm">{referral.specialty}</p>
                          <Badge className={getStatusColor(referral.status)}>
                            {getStatusLabel(referral.status)}
                          </Badge>
                          {referral.urgency === 'Urgent' && (
                            <Badge variant="destructive" className="text-xs">URGENTE</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{referral.reason}</p>
                      </div>
                    </div>
                    
                    {canCancel && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <X className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Cancelar Referido?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción cancelará el referido para {referral.specialty}. El especialista será notificado de la cancelación.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>No cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleCancelReferral(referral.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Sí, cancelar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${fromDoctor?.id}`} />
                        <AvatarFallback className="text-xs">
                          {fromDoctor?.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-600">{fromDoctor?.name}</span>
                    </div>
                    
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${toDoctor?.id}`} />
                        <AvatarFallback className="text-xs">
                          {toDoctor?.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-600">{toDoctor?.name}</span>
                    </div>
                  </div>

                  {referral.allowSummaryAccess && (
                    <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                      <CheckCircle className="w-3 h-3" />
                      Acceso pre-autorizado a resumen del expediente
                    </div>
                  )}

                  {referral.transferHistory && referral.transferHistory.length > 0 && (
                    <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                      <p className="font-medium">Historial de transferencias:</p>
                      {referral.transferHistory.map((transfer, index) => (
                        <p key={index}>
                          • {transfer.reason} ({new Date(transfer.date).toLocaleDateString()})
                        </p>
                      ))}
                    </div>
                  )}

                  {canManage && (
                    <div className="flex gap-2 pt-2 border-t">
                      <Button 
                        size="sm" 
                        onClick={() => handleAcceptReferral(referral.id)}
                        className="flex-1"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Aceptar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleTransferReferral(referral.id)}
                        className="flex-1"
                      >
                        <ArrowRight className="w-4 h-4 mr-1" />
                        Transferir
                      </Button>
                    </div>
                  )}

                  <div className="text-xs text-gray-400">
                    Creado: {new Date(referral.createdAt).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <UserPlus className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">No hay referidos médicos para este paciente</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
