'use client';

import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoInput, UpdateTodoInput } from '@/types/todo';

const STORAGE_KEY = 'awesome-todos';

// UUIDv4を生成する関数
const generateId = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // localStorageからTODOを読み込み
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // 日付文字列をDateオブジェクトに変換
        const todosWithDates = parsed.map((todo: Todo & { createdAt: string; updatedAt: string }) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
        }));
        setTodos(todosWithDates);
      }
    } catch (error) {
      console.error('TODOの読み込みに失敗しました:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // TODOをlocalStorageに保存
  const saveTodos = useCallback((updatedTodos: Todo[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
    } catch (error) {
      console.error('TODOの保存に失敗しました:', error);
    }
  }, []);

  // 新しいTODOを追加
  const addTodo = useCallback((input: CreateTodoInput) => {
    const newTodo: Todo = {
      id: generateId(),
      title: input.title.trim(),
      description: input.description?.trim() || '',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      priority: input.priority || 'medium',
    };

    const updatedTodos = [...todos, newTodo];
    saveTodos(updatedTodos);
  }, [todos, saveTodos]);

  // TODOを更新
  const updateTodo = useCallback((id: string, input: UpdateTodoInput) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id
        ? {
            ...todo,
            ...input,
            updatedAt: new Date(),
            // titleが更新される場合はtrimする
            ...(input.title !== undefined && { title: input.title.trim() }),
            // descriptionが更新される場合はtrimする
            ...(input.description !== undefined && { description: input.description.trim() }),
          }
        : todo
    );
    saveTodos(updatedTodos);
  }, [todos, saveTodos]);

  // TODOを削除
  const deleteTodo = useCallback((id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    saveTodos(updatedTodos);
  }, [todos, saveTodos]);

  // TODOの完了状態を切り替え
  const toggleTodo = useCallback((id: string) => {
    updateTodo(id, { 
      completed: !todos.find(todo => todo.id === id)?.completed 
    });
  }, [todos, updateTodo]);

  // 完了済みのTODOをすべて削除
  const clearCompleted = useCallback(() => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    saveTodos(updatedTodos);
  }, [todos, saveTodos]);

  // 統計情報
  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length,
  };

  return {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    stats,
  };
};