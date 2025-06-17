
import { useRole } from '@/contexts/RoleContext';
import { DashboardDoctor } from '@/components/dashboard/DashboardDoctor';
import { DashboardAdmin } from '@/components/dashboard/DashboardAdmin';

const Dashboard = () => {
  const { selectedRole } = useRole();

  if (selectedRole === 'Admin') {
    return <DashboardAdmin />;
  }

  return <DashboardDoctor />;
};

export default Dashboard;
