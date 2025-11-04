'use client';

import { Todo, PRIORITY_LABELS, PRIORITY_COLORS } from '@/types/todo';
import { Button, Checkbox } from '@/components/ui';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onEdit, onDelete }: TodoItemProps) => {
  const priorityColor = PRIORITY_COLORS[todo.priority || 'medium'];
  const priorityLabel = PRIORITY_LABELS[todo.priority || 'medium'];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className={`p-4 bg-white dark:bg-zinc-900 rounded-lg border ${todo.completed ? 'border-zinc-200 dark:border-zinc-700 opacity-60' : 'border-zinc-300 dark:border-zinc-600'} shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start gap-3">
        {/* チェックボックス */}
        <div className="pt-1">
          <Checkbox
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="cursor-pointer"
          />
        </div>

        {/* メインコンテンツ */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className={`font-medium text-zinc-900 dark:text-zinc-50 ${todo.completed ? 'line-through text-zinc-500 dark:text-zinc-400' : ''}`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={`mt-1 text-sm text-zinc-600 dark:text-zinc-400 ${todo.completed ? 'line-through' : ''}`}>
                  {todo.description}
                </p>
              )}
            </div>

            {/* 優先度バッジ */}
            {todo.priority && (
              <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${priorityColor}`}>
                {priorityLabel}
              </span>
            )}
          </div>

          {/* 日時とアクションボタン */}
          <div className="flex items-center justify-between mt-3">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              作成: {formatDate(todo.createdAt)}
              {todo.updatedAt.getTime() !== todo.createdAt.getTime() && (
                <span className="ml-2">
                  更新: {formatDate(todo.updatedAt)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(todo)}
                className="h-7 px-2 text-xs"
              >
                編集
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(todo.id)}
                className="h-7 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                削除
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};