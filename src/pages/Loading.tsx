import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";
import { BeforeAfterSliderCard } from "@/components/ui/BeforeAfterSliderCard";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

// Importing Before/After assets
import beforeImg from "@/assets/protocolW/Men-Before-After/before.webp";
import afterImg from "@/assets/protocolW/Men-Before-After/after.webp";

// Importing Avatars
import avatar1 from "@/assets/protocolW/avatars/ChatGPT Image Jun 30, 2026, 12_27_06 PM.webp";
import avatar2 from "@/assets/protocolW/avatars/ChatGPT Image Jun 30, 2026, 12_27_13 PM.webp";
import avatar3 from "@/assets/protocolW/avatars/ChatGPT Image Jun 30, 2026, 12_27_46 PM.webp";

const testimonials = [
  { 
    name: "John D.", 
    text: "I never found a training tool that fits more to my specific needs.", 
    avatar: avatar1 
  },
  { 
    name: "Mike R.", 
    text: "This protocol completely changed my physique in just 12 weeks. Incredible.", 
    avatar: avatar2 
  },
  { 
    name: "Alex M.", 
    text: "The personalized approach is what makes this stand out from the rest. Highly recommend.", 
    avatar: avatar3 
  }
];

export default function LoadingPage() {
  const [dots, setDots] = useState("");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

  // Progress animation
  useEffect(() => {
    const duration = 6000; // 6 seconds mock loading
    const intervalTime = 100;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const nextValue = Math.min((currentStep / steps) * 100, 100);
      setProgressValue(nextValue);

      if (currentStep >= steps) {
        clearInterval(interval);
        setIsFinished(true);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  // Animated dots for the headline
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Update carousel active index and auto-scroll
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    
    const autoScroll = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => {
      api.off("select", onSelect);
      clearInterval(autoScroll);
    };
  }, [api]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[var(--background)] flex flex-col"
    >
      <Header>
        <span className="font-bold text-[var(--foreground)] tracking-wide">
          [W] Protocol-W
        </span>
      </Header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center gap-10 lg:gap-12 max-w-3xl">
        
        {/* Title */}
        <div className="min-h-[80px] flex items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-[var(--foreground)] max-w-md leading-snug">
            Creating Your Personalized Workout Protocol<span className="inline-block w-8 text-left">{dots}</span>
          </h1>
        </div>

        {/* Before / After Vertical Slider Card */}
        <div className="w-full">
          <BeforeAfterSliderCard 
            beforeImg={beforeImg} 
            afterImg={afterImg} 
          />
        </div>

        {/* Polling Progress Container */}
        <div className="w-full max-w-md mx-auto">
          {isFinished ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <Button 
                size="lg" 
                className="w-full text-lg h-14 md:h-16 rounded-2xl shadow-[var(--shadow-md)]"
                onClick={() => navigate('/final-training')}
              >
                View Personalized Training
              </Button>
            </motion.div>
          ) : (
            <Progress value={progressValue} className="w-full flex-col items-start gap-2">
              <div className="flex w-full justify-between">
                <ProgressLabel>Analyzing your goals...</ProgressLabel>
                <ProgressValue />
              </div>
            </Progress>
          )}
        </div>

        {/* Social Proof Carousel */}
        <div className="w-full max-w-md mx-auto flex flex-col">
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mb-3">
            {testimonials.map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  current === index ? "bg-[var(--primary)]" : "bg-[var(--primary)]/30"
                }`} 
              />
            ))}
          </div>

          <div className="-mx-8">
            <Carousel 
              setApi={setApi} 
              className="w-full relative py-12 -my-12 [mask-image:linear-gradient(to_right,transparent_0%,black_48px,black_calc(100%-48px),transparent_100%)]" 
              opts={{ loop: true }}
            >
              <CarouselContent>
                {testimonials.map((t, i) => (
                  <CarouselItem key={i} className="flex items-stretch justify-center">
                    <TestimonialCard 
                      className="w-full max-w-[320px] sm:max-w-[340px] h-full"
                      name={t.name}
                      text={t.text}
                      imageSrc={t.avatar}
                      rating={5}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>

      </main>
    </motion.div>
  );
}
