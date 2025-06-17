
import { User } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRole } from '@/contexts/RoleContext';

export const RoleSelector = () => {
  const { selectedRole, setRole } = useRole();

  return (
    <div className="flex items-center space-x-2">
      <User className="w-4 h-4 text-gray-400" />
      <Select value={selectedRole} onValueChange={setRole}>
        <SelectTrigger className="w-32 h-8 bg-card border-0 shadow-soft rounded-lg text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white border shadow-lg rounded-lg z-50">
          <SelectItem value="Admin" className="text-sm">Admin</SelectItem>
          <SelectItem value="Doctor" className="text-sm">Doctor</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
