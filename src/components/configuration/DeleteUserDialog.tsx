
import { useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle } from 'lucide-react';
import { Personnel } from '@/data/personnel';
import { useToast } from '@/hooks/use-toast';

interface DeleteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: Personnel | null;
  onDeleteUser: (id: string) => void;
}

export const DeleteUserDialog = ({ open, onOpenChange, user, onDeleteUser }: DeleteUserDialogProps) => {
  const [confirmationText, setConfirmationText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const requiredText = "borrar usuario";
  const canDelete = confirmationText.toLowerCase() === requiredText;

  const handleDelete = async () => {
    if (!user || !canDelete) return;

    setIsLoading(true);
    
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onDeleteUser(user.id);

      toast({
        title: "Usuario eliminado",
        description: `${user.name} ha sido eliminado del sistema.`,
      });

      setConfirmationText('');
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el usuario. Intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setConfirmationText('');
    onOpenChange(false);
  };

  if (!user) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Eliminar Usuario - Acción Irreversible
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-4">
              <p>
                Estás a punto de eliminar a <strong>{user.name}</strong> del sistema.
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-800 mb-2">⚠️ Advertencia: Esta acción es irreversible</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Se perderán todos los datos asociados al usuario</li>
                  <li>• Las citas asignadas quedarán sin doctor responsable</li>
                  <li>• El historial médico asociado se mantendrá pero sin autor</li>
                  <li>• Los mensajes y comunicaciones se conservarán pero aparecerán como "Usuario eliminado"</li>
                </ul>
              </div>
              
              <div>
                <Label htmlFor="confirmation" className="text-sm font-medium">
                  Para confirmar, escribe exactamente: <span className="font-mono bg-gray-100 px-1 rounded">{requiredText}</span>
                </Label>
                <Input
                  id="confirmation"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                  placeholder="Escribe aquí..."
                  className="mt-2"
                />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <Button 
            variant="outline" 
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={!canDelete || isLoading}
          >
            {isLoading ? 'Eliminando...' : 'Eliminar Usuario'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
