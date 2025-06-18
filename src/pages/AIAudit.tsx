
import { AIAuditDashboard } from '@/components/ai/audit/AIAuditDashboard';
import { usePermissions } from '@/hooks/usePermissions';
import { Navigate } from 'react-router-dom';

const AIAudit = () => {
  const { isAdmin } = usePermissions();

  // Solo los administradores pueden acceder a la auditoría completa
  if (!isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <AIAuditDashboard />;
};

export default AIAudit;
