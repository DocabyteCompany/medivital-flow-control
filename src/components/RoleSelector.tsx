
import { useState } from 'react';
import { ChevronDown, User } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type UserRole = 'Admin' | 'Doctor';

export const RoleSelector = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('Doctor');

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    console.log('Role changed to:', role);
  };

  return (
    <div className="flex items-center space-x-2">
      <User className="w-4 h-4 text-gray-400" />
      <Select value={selectedRole} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-32 h-8 bg-card border-0 shadow-soft rounded-lg text-sm">
          <SelectValue />
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </SelectTrigger>
        <SelectContent className="bg-white border shadow-lg rounded-lg">
          <SelectItem value="Admin" className="text-sm">Admin</SelectItem>
          <SelectItem value="Doctor" className="text-sm">Doctor</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
