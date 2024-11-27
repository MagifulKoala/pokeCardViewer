import { ThemeToggle } from './theme-toggle';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <ThemeToggle />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}