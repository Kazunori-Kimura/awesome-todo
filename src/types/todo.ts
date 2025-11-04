// TODO データ構造の型定義
export interface Todo {
  id: string;          // ユニークID (UUID推奨)
  title: string;       // TODO のタイトル (必須)
  description?: string; // 詳細説明 (任意)
  completed: boolean;   // 完了状態
  createdAt: Date;     // 作成日時
  updatedAt: Date;     // 更新日時
  priority?: 'low' | 'medium' | 'high'; // 優先度 (任意)
}

// TODO作成時に使用する型（IDと日時は自動生成）
export interface CreateTodoInput {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
}

// TODO更新時に使用する型（部分更新）
export interface UpdateTodoInput {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
}

// フィルタータイプ
export type FilterType = 'all' | 'completed' | 'active';

// 優先度の表示用ラベル
export const PRIORITY_LABELS = {
  low: '低',
  medium: '中',
  high: '高',
} as const;

// 優先度の色分け用クラス
export const PRIORITY_COLORS = {
  low: 'text-green-600 bg-green-50 border-green-200',
  medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  high: 'text-red-600 bg-red-50 border-red-200',
} as const;