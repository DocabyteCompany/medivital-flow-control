
import { useMemo, useState, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';

interface VirtualScrollListProps<T> {
  items: T[];
  itemHeight: number;
  height: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  searchTerm?: string;
  filterFn?: (item: T, searchTerm: string) => boolean;
}

export const VirtualScrollList = <T,>({
  items,
  itemHeight,
  height,
  renderItem,
  searchTerm = '',
  filterFn
}: VirtualScrollListProps<T>) => {
  
  // Filtrar items con memoización
  const filteredItems = useMemo(() => {
    if (!searchTerm || !filterFn) return items;
    
    return items.filter(item => filterFn(item, searchTerm));
  }, [items, searchTerm, filterFn]);

  // Componente de item memoizado
  const ItemRenderer = useCallback(({ index, style }: { index: number; style: any }) => {
    const item = filteredItems[index];
    
    return (
      <div style={style}>
        {renderItem(item, index)}
      </div>
    );
  }, [filteredItems, renderItem]);

  if (filteredItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-500">
        {searchTerm ? 'No se encontraron resultados' : 'No hay elementos'}
      </div>
    );
  }

  return (
    <List
      height={height}
      itemCount={filteredItems.length}
      itemSize={itemHeight}
      itemData={filteredItems}
    >
      {ItemRenderer}
    </List>
  );
};
