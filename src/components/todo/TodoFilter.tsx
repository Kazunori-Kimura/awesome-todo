'use client';

import { FilterType } from '@/types/todo';
import { Button } from '@/components/ui';

interface TodoFilterProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  todoStats: {
    total: number;
    completed: number;
    active: number;
  };
  onClearCompleted: () => void;
}

export const TodoFilter = ({ 
  activeFilter, 
  onFilterChange, 
  todoStats,
  onClearCompleted 
}: TodoFilterProps) => {
  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'すべて', count: todoStats.total },
    { key: 'active', label: '未完了', count: todoStats.active },
    { key: 'completed', label: '完了済み', count: todoStats.completed },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-300 dark:border-zinc-600 p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* フィルターボタン */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onFilterChange(filter.key)}
              className="flex items-center gap-2"
            >
              {filter.label}
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                activeFilter === filter.key 
                  ? 'bg-background text-foreground' 
                  : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400'
              }`}>
                {filter.count}
              </span>
            </Button>
          ))}
        </div>

        {/* アクション */}
        <div className="flex items-center gap-2">
          {todoStats.completed > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearCompleted}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              完了済みを削除 ({todoStats.completed})
            </Button>
          )}
        </div>
      </div>

      {/* 統計情報 */}
      <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {todoStats.active > 0 
            ? `${todoStats.active}件の未完了タスクがあります`
            : todoStats.total > 0 
              ? 'すべてのタスクが完了しました！ 🎉'
              : 'タスクを追加してください'
          }
        </p>
      </div>
    </div>
  );
};