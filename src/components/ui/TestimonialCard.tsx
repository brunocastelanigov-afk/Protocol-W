import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  name: string;
  text: string;
  imageSrc: string;
  rating?: number;
  className?: string;
}

export function TestimonialCard({ name, text, imageSrc, rating = 5, className }: TestimonialCardProps) {
  return (
    <Card className={cn("shadow-[var(--shadow-md)] bg-[var(--card)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-300 border border-[var(--border)]", className)}>
      <CardContent className="p-5 flex flex-row items-center gap-5">
        
        {/* Avatar Container */}
        <div className="shrink-0 relative w-20 h-20">
          <img 
            src={imageSrc} 
            alt={name} 
            className="w-full h-full object-cover rounded-full shadow-sm" 
          />
          {/* Inner border overlay (Premium subtle detail) */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_0_2px_rgba(255,255,255,0.15)] pointer-events-none" />
          
          {/* Outer Ring */}
          <div className="absolute -inset-1 rounded-full border-2 border-[var(--primary)]/20 pointer-events-none" />
        </div>
        
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center space-y-2">
          <div className="flex text-[var(--primary)] gap-0.5">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current drop-shadow-sm" />
            ))}
          </div>
          <p className="text-sm text-[var(--muted-foreground)] line-clamp-3 italic leading-relaxed">"{text}"</p>
          <p className="text-sm font-bold text-[var(--foreground)] tracking-wide mt-1">- {name}</p>
        </div>

      </CardContent>
    </Card>
  );
}