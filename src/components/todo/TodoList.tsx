'use client';

import { useState, useMemo } from 'react';
import { Todo, FilterType, CreateTodoInput } from '@/types/todo';
import { useTodos } from '@/hooks/useTodos';
import { Button } from '@/components/ui';
import { TodoItem } from './TodoItem';
import { TodoFilter } from './TodoFilter';
import { TodoForm } from './TodoForm';

export const TodoList = () => {
  const { 
    todos, 
    loading, 
    addTodo, 
    updateTodo, 
    deleteTodo, 
    toggleTodo, 
    clearCompleted, 
    stats 
  } = useTodos();

  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // フィルタリングされたTODOリスト
  const filteredTodos = useMemo(() => {
    let filtered = todos;

    // 検索フィルター
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(todo => 
        todo.title.toLowerCase().includes(term) || 
        (todo.description && todo.description.toLowerCase().includes(term))
      );
    }

    // ステータスフィルター
    switch (activeFilter) {
      case 'completed':
        filtered = filtered.filter(todo => todo.completed);
        break;
      case 'active':
        filtered = filtered.filter(todo => !todo.completed);
        break;
      default:
        // 'all' の場合はそのまま
        break;
    }

    // 作成日時で降順ソート（新しいものが上）
    return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [todos, activeFilter, searchTerm]);

  const handleAddTodo = (input: CreateTodoInput) => {
    addTodo(input);
    setIsAddFormOpen(false);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsEditFormOpen(true);
  };

  const handleUpdateTodo = (input: CreateTodoInput) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, input);
      setEditingTodo(null);
      setIsEditFormOpen(false);
    }
  };

  const handleDeleteTodo = (id: string) => {
    if (window.confirm('このTODOを削除しますか？')) {
      deleteTodo(id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-zinc-600 dark:text-zinc-400">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Awesome Todo
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            タスクを整理して生産性を向上させましょう
          </p>
        </div>
        <Button onClick={() => setIsAddFormOpen(true)}>
          + 新しいTODO
        </Button>
      </div>

      {/* 検索バー */}
      <div className="relative">
        <input
          type="text"
          placeholder="TODOを検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-12 pl-4 pr-12 rounded-lg border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-400"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
          🔍
        </div>
      </div>

      {/* フィルター */}
      <TodoFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        todoStats={stats}
        onClearCompleted={clearCompleted}
      />

      {/* TODOリスト */}
      <div className="space-y-4">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50 mb-2">
              {searchTerm.trim() ? '検索結果が見つかりません' : 'TODOがありません'}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              {searchTerm.trim() 
                ? '別のキーワードで検索してみてください'
                : '新しいTODOを追加して始めましょう'
              }
            </p>
            {!searchTerm.trim() && (
              <Button onClick={() => setIsAddFormOpen(true)}>
                最初のTODOを追加
              </Button>
            )}
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onEdit={handleEditTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        )}
      </div>

      {/* 追加フォーム */}
      <TodoForm
        key="add-form"
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSubmit={handleAddTodo}
        title="新しいTODOを追加"
      />

      {/* 編集フォーム */}
      <TodoForm
        key={`edit-form-${editingTodo?.id || 'none'}`}
        isOpen={isEditFormOpen}
        onClose={() => {
          setIsEditFormOpen(false);
          setEditingTodo(null);
        }}
        onSubmit={handleUpdateTodo}
        editingTodo={editingTodo}
        title="TODOを編集"
      />
    </div>
  );
};