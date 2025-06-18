
import { ActivityContext } from '@/components/ia/ActivityCard';

export interface AIAuditLog {
  id: string;
  userId: string;
  userRole: 'Doctor' | 'Admin';
  action: string;
  permission: string;
  context?: ActivityContext;
  timestamp: Date;
  success: boolean;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

class AIAuditService {
  private logs: AIAuditLog[] = [];

  async logAction(
    action: string,
    permission: string,
    userRole: 'Doctor' | 'Admin',
    context?: ActivityContext,
    success: boolean = true,
    details?: Record<string, any>
  ): Promise<void> {
    const logEntry: AIAuditLog = {
      id: this.generateId(),
      userId: this.getCurrentUserId(),
      userRole,
      action,
      permission,
      context,
      timestamp: new Date(),
      success,
      details,
      ipAddress: this.getClientIP(),
      userAgent: navigator.userAgent
    };

    this.logs.push(logEntry);
    
    // En una implementación real, esto se enviaría a un servidor
    console.log('AI Audit Log:', logEntry);
    
    // Mantener solo los últimos 1000 logs en memoria
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-1000);
    }
  }

  async getAuditLogs(
    filters?: {
      userId?: string;
      userRole?: 'Doctor' | 'Admin';
      action?: string;
      dateFrom?: Date;
      dateTo?: Date;
    }
  ): Promise<AIAuditLog[]> {
    let filteredLogs = [...this.logs];

    if (filters) {
      if (filters.userId) {
        filteredLogs = filteredLogs.filter(log => log.userId === filters.userId);
      }
      if (filters.userRole) {
        filteredLogs = filteredLogs.filter(log => log.userRole === filters.userRole);
      }
      if (filters.action) {
        filteredLogs = filteredLogs.filter(log => log.action.includes(filters.action));
      }
      if (filters.dateFrom) {
        filteredLogs = filteredLogs.filter(log => log.timestamp >= filters.dateFrom!);
      }
      if (filters.dateTo) {
        filteredLogs = filteredLogs.filter(log => log.timestamp <= filters.dateTo!);
      }
    }

    return filteredLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getUsageMetrics(userRole?: 'Doctor' | 'Admin') {
    const relevantLogs = userRole 
      ? this.logs.filter(log => log.userRole === userRole)
      : this.logs;

    const today = new Date();
    const todayLogs = relevantLogs.filter(log => 
      log.timestamp.toDateString() === today.toDateString()
    );

    const thisWeekLogs = relevantLogs.filter(log => {
      const logDate = new Date(log.timestamp);
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return logDate >= weekAgo;
    });

    return {
      totalActions: relevantLogs.length,
      todayActions: todayLogs.length,
      weekActions: thisWeekLogs.length,
      successRate: relevantLogs.length > 0 
        ? (relevantLogs.filter(log => log.success).length / relevantLogs.length) * 100 
        : 0,
      mostUsedActions: this.getMostUsedActions(relevantLogs),
      averageActionsPerDay: thisWeekLogs.length / 7
    };
  }

  private getMostUsedActions(logs: AIAuditLog[]) {
    const actionCounts = logs.reduce((acc, log) => {
      acc[log.action] = (acc[log.action] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(actionCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([action, count]) => ({ action, count }));
  }

  private generateId(): string {
    return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getCurrentUserId(): string {
    // En una implementación real, esto vendría del contexto de autenticación
    return 'user_' + Math.random().toString(36).substr(2, 9);
  }

  private getClientIP(): string {
    // En una implementación real, esto se obtendría del servidor
    return '127.0.0.1';
  }
}

export const aiAuditService = new AIAuditService();
