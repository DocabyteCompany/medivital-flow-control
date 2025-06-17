
import { ReactNode } from 'react';
import { useRole, UserRole } from '@/contexts/RoleContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldX, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallbackPath?: string;
}

export const ProtectedRoute = ({ children, allowedRoles, fallbackPath = '/dashboard' }: ProtectedRouteProps) => {
  const { selectedRole } = useRole();

  if (!allowedRoles.includes(selectedRole)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md shadow-soft border-0 rounded-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <ShieldX className="w-6 h-6 text-red-600" />
            </div>
            <CardTitle className="text-xl text-brand-dark">Acceso Restringido</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              No tienes permisos para acceder a esta sección. Esta funcionalidad está disponible solo para: {allowedRoles.join(', ')}.
            </p>
            <p className="text-sm text-gray-500">
              Tu rol actual es: <span className="font-semibold text-brand-blue">{selectedRole}</span>
            </p>
            <Button asChild className="w-full bg-brand-blue hover:bg-brand-blue/90">
              <Link to={fallbackPath}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
