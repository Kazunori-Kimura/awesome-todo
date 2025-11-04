import { TodoList } from '@/components/todo';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <TodoList />
      </main>
    </div>
  );
}
