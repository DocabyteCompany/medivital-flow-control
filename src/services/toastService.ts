
import { toast } from 'sonner';
import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { createElement } from 'react';

export class ToastService {
  static success(message: string, description?: string) {
    toast.success(message, {
      description,
      icon: createElement(CheckCircle, { size: 20 }),
      duration: 4000,
      style: {
        background: '#F0FDF4',
        borderColor: '#10B981',
        color: '#065F46'
      }
    });
  }

  static error(message: string, description?: string) {
    toast.error(message, {
      description,
      icon: createElement(AlertCircle, { size: 20 }),
      duration: 6000,
      style: {
        background: '#FEF2F2',
        borderColor: '#EF4444',
        color: '#991B1B'
      }
    });
  }

  static warning(message: string, description?: string) {
    toast.warning(message, {
      description,
      icon: createElement(AlertTriangle, { size: 20 }),
      duration: 5000,
      style: {
        background: '#FFFBEB',
        borderColor: '#F59E0B',
        color: '#92400E'
      }
    });
  }

  static info(message: string, description?: string) {
    toast.info(message, {
      description,
      icon: createElement(Info, { size: 20 }),
      duration: 4000,
      style: {
        background: '#EFF6FF',
        borderColor: '#3B82F6',
        color: '#1E40AF'
      }
    });
  }

  static loading(message: string) {
    return toast.loading(message, {
      duration: Infinity
    });
  }

  static dismiss(toastId?: string | number) {
    toast.dismiss(toastId);
  }
}
