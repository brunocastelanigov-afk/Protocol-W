import { useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

function RollingDigit({ value }: { value: number }) {
  return (
    <div className="relative h-[1em] w-[0.6em] overflow-hidden inline-flex justify-center">
      <motion.div
        animate={{ y: `-${value * 10}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute inset-x-0 flex flex-col items-center"
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="h-[1em] flex items-center justify-center">
            {i}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function RollingNumber({ value }: { value: number }) {
  const paddedValue = value.toString().padStart(3, "0");
  return (
    <div className="flex text-6xl font-bold text-[var(--primary)] leading-none font-mono">
      {paddedValue.split("").map((digit, index) => (
        <RollingDigit key={index} value={parseInt(digit, 10)} />
      ))}
    </div>
  );
}

interface DraggableSliderProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  unit?: string;
  label?: string;
  value?: number;
  onChange?: (val: number) => void;
}

export function DraggableSlider({
  min = 100,
  max = 220,
  defaultValue = 170,
  unit = "cm",
  label = "Slide to select",
  value: externalValue,
  onChange,
}: DraggableSliderProps) {
  const tickWidth = 30; // Lowered sensitivity

  // Lock the physical layout to the initial value so it doesn't shift wildly during controlled re-renders
  const [initialValue] = useState(defaultValue);
  const [internalValue, setInternalValue] = useState(initialValue);
  const value = externalValue !== undefined ? externalValue : internalValue;
  const x = useMotionValue(0);

  useEffect(() => {
    return x.on("change", (latestX) => {
      const stepsMoved = Math.round(latestX / tickWidth);
      let nextValue = initialValue - stepsMoved; 
      
      if (nextValue < min) nextValue = min;
      if (nextValue > max) nextValue = max;
      
      if (externalValue === undefined) {
        setInternalValue(nextValue);
      }
      if (onChange) {
        onChange(nextValue);
      }
    });
  }, [x, initialValue, min, max, onChange, externalValue]);

  const totalTicks = max - min + 1;
  const defaultIndex = initialValue - min;
  const defaultOffsetPx = defaultIndex * tickWidth;

  return (
    <div className="space-y-6 p-6 rounded-[var(--radius)] bg-[var(--card)] shadow-[var(--shadow-lg)] border border-[var(--border)] overflow-hidden w-full max-w-md mx-auto">
      <div className="text-center flex flex-col items-center">
        <div className="flex items-end gap-1 mb-2">
          <RollingNumber value={value} />
          <span className="text-2xl text-[var(--muted-foreground)] font-medium mb-1">{unit}</span>
        </div>
        <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-widest font-semibold">{label}</p>
      </div>
      
      <div className="relative w-full h-28 mt-4 rounded-[var(--radius)] overflow-hidden cursor-grab active:cursor-grabbing border-y border-[var(--border)] bg-gradient-to-b from-[var(--background)] to-[var(--muted)]/20">
        {/* Center Pointer */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[3px] bg-[var(--primary)] -translate-x-1/2 z-10 rounded-full shadow-[0_0_10px_var(--primary)]" />
        
        {/* Shadow overlays for edges to create depth */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--card)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--card)] to-transparent z-10 pointer-events-none" />

        <motion.div
          drag="x"
          dragElastic={0.1}
          dragConstraints={{
            left: -((max - initialValue) * tickWidth),
            right: ((initialValue - min) * tickWidth)
          }}
          style={{ x, left: '50%' }}
          className="absolute top-0 bottom-0 flex items-end h-full will-change-transform"
        >
          <div 
            className="flex h-full items-end pb-2"
            style={{ 
              transform: `translateX(calc(-${defaultOffsetPx}px - ${tickWidth / 2}px))`
            }}
          >
            {[...Array(totalTicks)].map((_, i) => {
              const val = min + i;
              const isMajor = val % 10 === 0;
              const isMedium = val % 5 === 0 && !isMajor;
              
              return (
                <div 
                  key={val} 
                  className="flex flex-col items-center justify-end shrink-0"
                  style={{ width: tickWidth }}
                >
                  {isMajor && (
                    <span className="text-[10px] font-bold text-[var(--muted-foreground)] mb-2">
                      {val}
                    </span>
                  )}
                  <div 
                    className={`w-[2px] rounded-t-sm transition-colors ${
                      val === value 
                        ? 'h-10 bg-[var(--primary)]' 
                        : isMajor 
                          ? 'h-8 bg-[var(--foreground)]' 
                          : isMedium 
                            ? 'h-5 bg-[var(--muted-foreground)]' 
                            : 'h-3 bg-[var(--border)]'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}