
import { memo } from 'react';
import { PatientStatsWidget } from '@/components/statistics/PatientStatsWidget';
import { PersonnelStatsWidget } from '@/components/statistics/PersonnelStatsWidget';
import { AppointmentStatsWidget } from '@/components/statistics/AppointmentStatsWidget';
import { FinancialStatsWidget } from '@/components/statistics/FinancialStatsWidget';
import { OperationalStatsWidget } from '@/components/statistics/OperationalStatsWidget';

// Componentes memoizados para estadísticas pesadas
export const MemoizedPatientStatsWidget = memo(PatientStatsWidget);
export const MemoizedPersonnelStatsWidget = memo(PersonnelStatsWidget);
export const MemoizedAppointmentStatsWidget = memo(AppointmentStatsWidget);
export const MemoizedFinancialStatsWidget = memo(FinancialStatsWidget);
export const MemoizedOperationalStatsWidget = memo(OperationalStatsWidget);

// Verificar que las props no han cambiado para componentes de estadísticas
MemoizedPatientStatsWidget.displayName = 'MemoizedPatientStatsWidget';
MemoizedPersonnelStatsWidget.displayName = 'MemoizedPersonnelStatsWidget';
MemoizedAppointmentStatsWidget.displayName = 'MemoizedAppointmentStatsWidget';
MemoizedFinancialStatsWidget.displayName = 'MemoizedFinancialStatsWidget';
MemoizedOperationalStatsWidget.displayName = 'MemoizedOperationalStatsWidget';
