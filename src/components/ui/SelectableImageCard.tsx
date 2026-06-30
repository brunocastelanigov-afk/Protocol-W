import { useState } from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SelectableImageCardProps {
  imageSrc: string;
  label: string;
  selected?: boolean;
  aspectRatio?: string;
  onClick?: () => void;
}

export function SelectableImageCard({ imageSrc, label, selected = false, aspectRatio = "aspect-[4/5]", onClick }: SelectableImageCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-[var(--radius)] cursor-pointer transition-all duration-300 border-2",
        selected 
          ? "border-[var(--primary)] shadow-[var(--shadow-md)] bg-[var(--primary)]/5" 
          : "border-[var(--border)] shadow-[var(--shadow-sm)] bg-[var(--card)] hover:border-[var(--primary)]/50"
      )}
    >
      <div className={cn("w-full overflow-hidden", aspectRatio)}>
        <img 
          src={imageSrc} 
          alt={label} 
          className={cn(
            "w-full h-full object-cover object-top transition-transform duration-500",
            selected ? "scale-105" : "scale-100"
          )}
        />
      </div>
      <div className="p-4 text-center bg-gradient-to-t from-[var(--background)] to-transparent absolute bottom-0 w-full">
        <p className={cn(
          "font-semibold text-lg drop-shadow-md",
          selected ? "text-[var(--primary)]" : "text-[var(--foreground)]"
        )}>
          {label}
        </p>
      </div>
    </motion.div>
  );
}