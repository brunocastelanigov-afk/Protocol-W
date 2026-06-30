import { Progress } from "@/components/ui/progress";

export function FunnelProgressBar({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) {
  const value = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));
  
  return (
    <div className="w-full flex items-center gap-4">
      <div className="flex-1 h-4 bg-[var(--muted)] rounded-full overflow-hidden shadow-inner flex items-center p-0.5 border border-[var(--border)]">
        <div 
          className="h-full bg-[var(--primary)] rounded-full transition-all duration-500 ease-in-out shadow-sm"
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="text-sm font-bold text-[var(--primary)] whitespace-nowrap">
        <span>{currentStep} / {totalSteps}</span>
      </div>
    </div>
  );
}