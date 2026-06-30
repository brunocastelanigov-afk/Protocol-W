const fs = require('fs');
const path = require('path');

const components = {
  "SelectableImageCard.tsx": `import { useState } from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SelectableImageCardProps {
  imageSrc: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function SelectableImageCard({ imageSrc, label, selected = false, onClick }: SelectableImageCardProps) {
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
      <div className="aspect-[4/5] w-full overflow-hidden">
        <img 
          src={imageSrc} 
          alt={label} 
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
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
}`,

  "Header.tsx": `import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--primary)] shadow-[var(--shadow-sm)]" />
          <span className="text-xl font-sans font-bold text-[var(--foreground)] tracking-tight">Protocol-W</span>
        </div>
      </div>
    </header>
  );
}`,

  "FunnelProgressBar.tsx": `import { Progress } from "@/components/ui/progress";

export function FunnelProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm font-medium text-[var(--muted-foreground)]">
        <span>Progress</span>
        <span>{Math.round(value)}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
}`,

  "TestimonialCard.tsx": `import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  text: string;
  imageSrc: string;
  rating?: number;
}

export function TestimonialCard({ name, text, imageSrc, rating = 5 }: TestimonialCardProps) {
  return (
    <Card className="overflow-hidden shadow-[var(--shadow-md)] bg-[var(--card)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-300">
      <CardContent className="p-0 flex flex-row items-center h-32">
        <div className="w-1/3 h-full overflow-hidden">
          <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="w-2/3 p-4 flex flex-col justify-center space-y-2">
          <div className="flex text-[var(--primary)] gap-0.5">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 italic">"{text}"</p>
          <p className="text-xs font-semibold text-[var(--foreground)]">- {name}</p>
        </div>
      </CardContent>
    </Card>
  );
}`,

  "ResultCard.tsx": `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function ResultCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="overflow-hidden border-2 border-[var(--primary)] shadow-[var(--shadow-xl)]">
        <CardHeader className="bg-[var(--primary)]/10 pb-4">
          <CardTitle className="text-center text-2xl font-bold text-[var(--foreground)]">Your Custom Plan is Ready</CardTitle>
          <p className="text-center text-sm text-[var(--muted-foreground)]">Based on your answers, we built a personalized protocol.</p>
        </CardHeader>
        <CardContent className="p-6 space-y-4 bg-[var(--card)]">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-[var(--radius)] bg-[var(--muted)]/50 text-center border border-[var(--border)]">
              <p className="text-3xl font-bold text-[var(--primary)]">12</p>
              <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">Weeks</p>
            </div>
            <div className="p-4 rounded-[var(--radius)] bg-[var(--muted)]/50 text-center border border-[var(--border)]">
              <p className="text-3xl font-bold text-[var(--primary)]">100%</p>
              <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">Personalized</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}`,

  "BeforeAfterSliderCard.tsx": `import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface BeforeAfterProps {
  beforeImg: string;
  afterImg: string;
}

export function BeforeAfterSliderCard({ beforeImg, afterImg }: BeforeAfterProps) {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-[var(--shadow-lg)]">
      <CardContent className="p-0">
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <div className="relative aspect-[3/4] w-full">
                <img src={beforeImg} className="object-cover w-full h-full rounded-t-[var(--radius)]" alt="Before" />
                <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">BEFORE</div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative aspect-[3/4] w-full">
                <img src={afterImg} className="object-cover w-full h-full rounded-t-[var(--radius)]" alt="After" />
                <div className="absolute top-4 right-4 bg-[var(--primary)] text-[var(--primary-foreground)] px-3 py-1 rounded-full text-xs font-bold shadow-[var(--shadow-md)]">AFTER</div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-white/80 hover:bg-white text-black border-none" />
          <CarouselNext className="right-2 bg-white/80 hover:bg-white text-black border-none" />
        </Carousel>
        <div className="p-4 text-center bg-[var(--card)] rounded-b-[var(--radius)]">
          <p className="font-semibold text-[var(--foreground)]">Slide to see the transformation</p>
        </div>
      </CardContent>
    </Card>
  );
}`,

  "WeightSlider.tsx": `import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";

export function WeightSlider() {
  const [weight, setWeight] = useState(70);

  return (
    <div className="space-y-8 p-6 rounded-[var(--radius)] bg-[var(--card)] shadow-[var(--shadow-md)] border border-[var(--border)]">
      <div className="text-center">
        <motion.div 
          key={weight}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-bold text-[var(--primary)]"
        >
          {weight} <span className="text-2xl text-[var(--muted-foreground)]">kg</span>
        </motion.div>
        <p className="text-sm text-[var(--muted-foreground)] mt-2">Select your current weight</p>
      </div>
      
      <Slider 
        defaultValue={[70]} 
        max={150} 
        min={40} 
        step={1}
        onValueChange={(vals) => setWeight(vals[0])}
        className="w-full"
      />
    </div>
  );
}`,

  "ProgressChart.tsx": `import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { week: "W1", progress: 10 },
  { week: "W2", progress: 45 },
  { week: "W3", progress: 100 },
]

const chartConfig = {
  progress: {
    label: "Progress",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ProgressChart() {
  return (
    <div className="p-6 bg-[var(--card)] rounded-[var(--radius)] shadow-[var(--shadow-md)] border border-[var(--border)] space-y-4">
      <div className="text-center space-y-1">
        <h3 className="font-semibold text-lg text-[var(--foreground)]">Transformation Journey</h3>
        <p className="text-sm text-[var(--muted-foreground)]">Expected progress over 3 weeks</p>
      </div>
      
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <LineChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line 
            type="monotone" 
            dataKey="progress" 
            stroke="var(--primary)" 
            strokeWidth={4} 
            dot={{ r: 6, fill: "var(--primary)", strokeWidth: 2, stroke: "var(--background)" }} 
            activeDot={{ r: 8 }}
            animationDuration={2000}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}`
};

for (const [filename, content] of Object.entries(components)) {
  const filePath = path.join(__dirname, 'src', 'components', 'ui', filename);
  fs.writeFileSync(filePath, content);
  console.log('Created:', filePath);
}
