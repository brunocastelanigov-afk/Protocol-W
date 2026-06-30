import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/ui/Header';
import { SelectableImageCard } from '@/components/ui/SelectableImageCard';
import { FunnelProgressBar } from '@/components/ui/FunnelProgressBar';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { ResultCard } from '@/components/ui/ResultCard';
import { BeforeAfterSliderCard } from '@/components/ui/BeforeAfterSliderCard';
import { DraggableSlider } from '@/components/ui/DraggableSlider';
import { ProgressChart } from '@/components/ui/ProgressChart';
import { Button } from '@/components/ui/button';

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Catalog() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-20">
      <Header />
      
      <main className="container mx-auto px-4 mt-8 space-y-24 max-w-4xl">
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-sans tracking-tight bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent pb-2"
          >
            Design System Catalog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[var(--muted-foreground)] max-w-2xl mx-auto"
          >
            A complete UI component reference for Protocol-W, built with Shadcn, Tailwind v4, and Framer Motion. 
            All components adapt seamlessly to our global.css tokens.
          </motion.p>
        </div>

        {/* 1. Header & Progress */}
        <FadeUp>
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-[var(--border)] pb-2">1. Funnel Elements</h2>
            <div className="p-8 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--border)] shadow-[var(--shadow-md)]">
              <h3 className="text-sm font-semibold text-[var(--muted-foreground)] mb-4 uppercase tracking-wider">Top Progress Bar</h3>
              <FunnelProgressBar currentStep={3} totalSteps={10} />
            </div>
          </section>
        </FadeUp>

        {/* 2. Selectable Cards */}
        <FadeUp>
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-[var(--border)] pb-2">2. Image Selection Cards</h2>
            <p className="text-[var(--muted-foreground)]">Used for demographic or goal selection steps.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <SelectableImageCard 
                label="Lose Weight" 
                imageSrc="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=500&q=80" 
                selected={selectedGoal === 'lose'}
                onClick={() => setSelectedGoal('lose')}
              />
              <SelectableImageCard 
                label="Build Muscle" 
                imageSrc="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=500&q=80" 
                selected={selectedGoal === 'build'}
                onClick={() => setSelectedGoal('build')}
              />
              <SelectableImageCard 
                label="Stay Fit" 
                imageSrc="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=500&q=80" 
                selected={selectedGoal === 'fit'}
                onClick={() => setSelectedGoal('fit')}
              />
            </div>
          </section>
        </FadeUp>

        {/* 3. Sliders */}
        <FadeUp>
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-[var(--border)] pb-2">3. Interactive Sliders</h2>
            <div className="max-w-md mx-auto">
              <DraggableSlider label="Slide to select height" unit="cm" min={100} max={220} defaultValue={170} />
            </div>
          </section>
        </FadeUp>

        {/* 4. Results & Charts */}
        <FadeUp>
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-[var(--border)] pb-2">4. Result Presentation</h2>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <ResultCard />
              <ProgressChart />
            </div>
          </section>
        </FadeUp>

        {/* 5. Before/After */}
        <FadeUp>
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-[var(--border)] pb-2">5. Visual Proof</h2>
            <BeforeAfterSliderCard 
              beforeImg="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=500&q=80"
              afterImg="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80"
            />
          </section>
        </FadeUp>

        {/* 6. Testimonials */}
        <FadeUp>
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-[var(--border)] pb-2">6. Testimonial Cards</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <TestimonialCard 
                name="John D."
                text="The protocol completely changed my daily routine. Highly recommended!"
                imageSrc="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
              />
              <TestimonialCard 
                name="Sarah M."
                text="Incredible results in just 3 weeks. The custom plan was perfectly tailored to my needs."
                imageSrc="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80"
              />
            </div>
          </section>
        </FadeUp>

        {/* 7. Buttons */}
        <FadeUp>
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-[var(--border)] pb-2">7. Buttons</h2>
            <div className="flex flex-wrap gap-4 items-center p-8 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--border)] shadow-[var(--shadow-sm)]">
              <Button size="lg" className="w-full md:w-auto shadow-[var(--shadow-md)]">
                Confirm Selection
              </Button>
              <Button variant="secondary" size="lg">
                Secondary Action
              </Button>
              <Button variant="outline" size="lg">
                Outline Button
              </Button>
            </div>
          </section>
        </FadeUp>

      </main>
    </div>
  );
}
