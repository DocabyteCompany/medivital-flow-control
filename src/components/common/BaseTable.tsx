
import { ReactNode } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T, index: number) => ReactNode;
  className?: string;
  sortable?: boolean;
}

interface BaseTableProps<T> {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
  emptyIcon?: LucideIcon;
  loading?: boolean;
  onRowClick?: (item: T, index: number) => void;
  className?: string;
  showCard?: boolean;
}

export const BaseTable = <T extends Record<string, any>>({
  title,
  description,
  icon: Icon,
  iconColor = 'text-brand-blue',
  data,
  columns,
  emptyMessage = 'No hay datos disponibles',
  emptyIcon: EmptyIcon,
  loading = false,
  onRowClick,
  className = '',
  showCard = true
}: BaseTableProps<T>) => {
  const renderCell = (item: T, column: Column<T>, index: number) => {
    if (column.render) {
      return column.render(item, index);
    }
    
    const value = column.key.toString().includes('.') 
      ? column.key.toString().split('.').reduce((obj, key) => obj?.[key], item)
      : item[column.key];
    
    return value?.toString() || '-';
  };

  const tableContent = (
    <>
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-8 px-4">
          {EmptyIcon && <EmptyIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />}
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      ) : (
        <Table className={className}>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow 
                key={index}
                className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                onClick={() => onRowClick?.(item, index)}
              >
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} className={column.className}>
                    {renderCell(item, column, index)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );

  if (!showCard) {
    return <div className={className}>{tableContent}</div>;
  }

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${className}`}>
      {(title || description) && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {Icon && <Icon className={`w-5 h-5 ${iconColor}`} />}
            {title}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        {tableContent}
      </CardContent>
    </Card>
  );
};
