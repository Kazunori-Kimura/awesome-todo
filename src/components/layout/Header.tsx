export const Header = () => {
  return (
    <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">✅</div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                Awesome Todo
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                生産性を向上させるTODOアプリ
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              v1.0.0
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};