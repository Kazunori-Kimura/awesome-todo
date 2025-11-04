# Awesome Todo

モダンなNext.js 16とTailwind CSS v4で構築された、レスポンシブなTODOアプリケーション。

## 🚀 機能

- ✅ **CRUD操作**: TODOの追加、編集、削除、完了/未完了の切り替え
- 📱 **モバイルファースト**: 全デバイスで最適化されたレスポンシブデザイン
- 💾 **永続化**: ブラウザのローカルストレージでデータを保存
- 🎨 **ダークモード**: システム設定に応じた自動テーマ切り替え
- ⚡ **高速**: 静的サイト生成による高速読み込み
- 🔄 **リアルタイム更新**: 即座に反映されるUI変更

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript 5
- **スタイリング**: Tailwind CSS v4
- **フォント**: Geist Sans & Geist Mono
- **デプロイメント**: GitHub Pages (静的エクスポート)
- **データ保存**: localStorage / IndexedDB

## 📋 TODOの仕様

### データ構造
```typescript
interface Todo {
  id: string;          // ユニークID (UUID推奨)
  title: string;       // TODO のタイトル (必須)
  description?: string; // 詳細説明 (任意)
  completed: boolean;   // 完了状態
  createdAt: Date;     // 作成日時
  updatedAt: Date;     // 更新日時
  priority?: 'low' | 'medium' | 'high'; // 優先度 (任意)
}
```

### 主要操作
- **追加**: 新しいTODOを作成
- **編集**: 既存のTODOのタイトルや説明を変更
- **削除**: TODOを完全に削除
- **完了切り替え**: 完了/未完了状態を変更
- **フィルタリング**: 全て/完了済み/未完了でフィルター
- **検索**: タイトルや説明でTODOを検索

## 🎨 UI/UX 仕様

### レスポンシブデザイン
- **モバイル** (< 640px): 単一カラムレイアウト、フルワイドボタン
- **タブレット** (640px - 1024px): 2カラムレイアウト
- **デスクトップ** (> 1024px): 3カラムレイアウト、サイドバー

### カラーパレット
```css
/* ライトモード */
--background: #ffffff;
--foreground: #171717;

/* ダークモード */
--background: #0a0a0a;
--foreground: #ededed;
```

### コンポーネント構造
```
src/components/
├── todo/
│   ├── TodoList.tsx      # TODOリストのメインコンテナ
│   ├── TodoItem.tsx      # 個別のTODOアイテム
│   ├── TodoForm.tsx      # 追加/編集フォーム
│   └── TodoFilter.tsx    # フィルター・検索UI
├── ui/
│   ├── Button.tsx        # 再利用可能ボタン
│   ├── Input.tsx         # 入力フィールド
│   ├── Modal.tsx         # モーダルダイアログ
│   └── Checkbox.tsx      # カスタムチェックボックス
└── layout/
    ├── Header.tsx        # アプリヘッダー
    └── Footer.tsx        # アプリフッター
```

## 🚀 セットアップ & 開発

### 必要な環境
- Node.js 18以上
- npm または yarn

### インストール
```bash
# リポジトリをクローン
git clone https://github.com/your-username/awesome-todo.git
cd awesome-todo

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

### 開発コマンド
```bash
npm run dev          # 開発サーバー (localhost:3000)
npm run build        # 本番ビルド (/dist に出力)
npm run start        # 本番サーバーをローカルで実行
npm run lint         # ESLint でコードをチェック
```

## 📦 デプロイメント

### GitHub Pages 自動デプロイ
1. `main` ブランチにプッシュまたはマージ
2. GitHub Actions が自動実行
3. `/dist` フォルダを `gh-pages` ブランチにデプロイ
4. GitHub Pages で公開

### デプロイURL
- **本番**: `https://your-username.github.io/awesome-todo`
- **開発**: `http://localhost:3000`

## 🔧 設定ファイル

### 重要な設定
- `next.config.ts`: 静的エクスポート設定
- `tailwind.config.js`: Tailwind v4 設定
- `tsconfig.json`: TypeScript 設定
- `.github/workflows/deploy.yml`: CI/CD パイプライン

### 環境変数
```env
# 本番環境でのベースパス
NEXT_PUBLIC_BASE_PATH=/awesome-todo
```

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 🔗 リンク

- [Next.js ドキュメント](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/)

---

**開発者向け**: 詳細な開発ガイドラインは `.github/copilot-instructions.md` を参照してください。