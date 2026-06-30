import { cn } from "@/lib/utils";

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--primary)] shadow-[var(--shadow-sm)]" />
        </div>
        {children && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full max-w-[65%]">
            {children}
          </div>
        )}
      </div>
    </header>
  );
}