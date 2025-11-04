'use client';

import { useState, FormEvent } from 'react';
import { CreateTodoInput, Todo } from '@/types/todo';
import { Button, Input, Modal } from '@/components/ui';

interface TodoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: CreateTodoInput) => void;
  editingTodo?: Todo | null;
  title: string;
}

export const TodoForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editingTodo,
  title 
}: TodoFormProps) => {
  // 初期値を editingTodo の存在に基づいて設定
  const initialFormData = {
    title: editingTodo?.title || '',
    description: editingTodo?.description || '',
    priority: editingTodo?.priority || 'medium',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<{ title?: string }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // バリデーション
    const newErrors: { title?: string } = {};
    if (!formData.title.trim()) {
      newErrors.title = 'タイトルは必須です';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // フォームデータを送信
    onSubmit({
      title: formData.title,
      description: formData.description || undefined,
      priority: formData.priority,
    });

    // フォームをリセット
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="タイトル"
          value={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
            if (errors.title) setErrors({ ...errors, title: undefined });
          }}
          placeholder="TODOのタイトルを入力"
          error={errors.title}
          required
        />

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            説明（任意）
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="詳細な説明を入力"
            rows={3}
            className="flex w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            優先度
          </label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
            className="flex h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          >
            <option value="low">低</option>
            <option value="medium">中</option>
            <option value="high">高</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="secondary" onClick={handleClose}>
            キャンセル
          </Button>
          <Button type="submit">
            {editingTodo ? '更新' : '追加'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};