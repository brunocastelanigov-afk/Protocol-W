import { useState, useRef, useEffect } from "react";

interface BeforeAfterProps {
  beforeImg: string;
  afterImg: string;
}

export function BeforeAfterSliderCard({ beforeImg, afterImg }: BeforeAfterProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-animate slider to indicate interactivity
  useEffect(() => {
    if (hasInteracted) return;

    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 2500; // 2.5 seconds

    const animate = (timestamp: number) => {
      if (hasInteracted) return;
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress < duration) {
        // Sine wave: moves right, then left, then back to center
        const cycle = progress / duration; 
        const offset = Math.sin(cycle * Math.PI * 2) * 15; // 15% amplitude
        setSliderPos(50 + offset);
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setSliderPos(50);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [hasInteracted]);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPos(percentage);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setHasInteracted(true);
    handleMove(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      ref={containerRef}
      className="relative aspect-[3/4] w-full max-w-sm mx-auto shadow-[var(--shadow-xl)] overflow-hidden rounded-[var(--radius)] select-none touch-none cursor-ew-resize"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Underneath Image (After) */}
      <img 
        src={afterImg} 
        className="absolute inset-0 object-cover w-full h-full pointer-events-none" 
        alt="After" 
        draggable="false"
      />
      <div className="absolute top-4 right-4 bg-[var(--primary)] text-[var(--primary-foreground)] px-3 py-1 rounded-full text-xs font-bold shadow-md z-0 pointer-events-none">
        AFTER
      </div>

      {/* Top Image (Before) with Clip Path */}
      <div 
        className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
      >
        <img 
          src={beforeImg} 
          className="absolute inset-0 object-cover w-full h-full" 
          alt="Before" 
          draggable="false"
        />
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
          BEFORE
        </div>
      </div>

      {/* Vertical Divider Line */}
      <div 
        className="absolute top-0 bottom-0 z-20 w-[3px] bg-white pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `calc(${sliderPos}% - 1.5px)` }}
      >
        {/* Circle Knob */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg transition-transform duration-200 ${isHovered || isDragging ? 'scale-110' : 'scale-100'}`}>
          <div className="flex gap-1">
            {/* Left Arrow */}
            <div className="w-1.5 h-3 border-y-4 border-r-4 border-l-0 border-solid border-transparent border-r-[var(--foreground)]" />
            {/* Right Arrow */}
            <div className="w-1.5 h-3 border-y-4 border-l-4 border-r-0 border-solid border-transparent border-l-[var(--foreground)]" />
          </div>
        </div>
      </div>
    </div>
  );
}