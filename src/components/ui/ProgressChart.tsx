import { motion } from "framer-motion";

export function ProgressChart() {
  return (
    <div className="p-6 rounded-[var(--radius)] bg-[var(--card)] shadow-[var(--shadow-md)] border border-[var(--border)] w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[var(--foreground)]">Your Transformation Journey</h3>
        <p className="text-sm text-[var(--muted-foreground)]">Estimated progress over 12 weeks</p>
      </div>

      <div className="relative w-full pl-8 pr-4">
        {/* SVG Container */}
        <div className="relative w-full aspect-[2/1] bg-gradient-to-b from-transparent to-[var(--muted)]/10 rounded-lg border-b-2 border-l-2 border-[var(--border)]">
          <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full overflow-visible">
            {/* Y Axis Labels */}
            <text x="-10" y="5" textAnchor="end" className="text-[10px] fill-[var(--muted-foreground)] font-semibold">800</text>
            <text x="-10" y="55" textAnchor="end" className="text-[10px] fill-[var(--muted-foreground)] font-semibold">600</text>
            <text x="-10" y="105" textAnchor="end" className="text-[10px] fill-[var(--muted-foreground)] font-semibold">400</text>
            <text x="-10" y="155" textAnchor="end" className="text-[10px] fill-[var(--muted-foreground)] font-semibold">200</text>

            {/* Grid lines */}
            <line x1="0" y1="50" x2="400" y2="50" stroke="currentColor" className="text-[var(--border)] opacity-50" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="100" x2="400" y2="100" stroke="currentColor" className="text-[var(--border)] opacity-50" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="150" x2="400" y2="150" stroke="currentColor" className="text-[var(--border)] opacity-50" strokeWidth="1" strokeDasharray="4 4" />

            {/* Gradient fill under the curve */}
            <motion.path
              d="M 0 190 Q 200 180, 400 20 L 400 200 L 0 200 Z"
              fill="currentColor"
              className="text-[var(--primary)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />

            {/* The main drawn line */}
            <motion.path
              d="M 0 190 Q 200 180, 400 20"
              fill="none"
              stroke="currentColor"
              className="text-[var(--primary)]"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
            />

            {/* Final Target Dot */}
            <motion.circle
              cx="400"
              cy="20"
              r="6"
              fill="currentColor"
              className="text-[var(--primary)]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2, type: "spring", stiffness: 300 }}
            />
            
            {/* Starting Dot */}
            <motion.circle
              cx="0"
              cy="190"
              r="4"
              fill="currentColor"
              className="text-[var(--primary)]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            />
          </svg>
        </div>

        {/* X Axis Labels */}
        <div className="flex justify-between text-xs font-semibold text-[var(--muted-foreground)] mt-2 px-1">
          <span>START</span>
          <span>WEEK 6</span>
          <span>WEEK 12</span>
        </div>
      </div>
    </div>
  );
}