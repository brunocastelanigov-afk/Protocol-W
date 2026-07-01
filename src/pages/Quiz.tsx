import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from '@/components/ui/Header';
import { FunnelProgressBar } from '@/components/ui/FunnelProgressBar';
import { Button } from '@/components/ui/button';
import { SelectableImageCard } from '@/components/ui/SelectableImageCard';
import { DraggableSlider } from '@/components/ui/DraggableSlider';

import menImg from '@/assets/protocolW/men.webp';
import womanImg from '@/assets/protocolW/woman.webp';

// Men Shapes
import menFit from '@/assets/protocolW/MenBody-types/fit.webp';
import menMuscular from '@/assets/protocolW/MenBody-types/muscular.webp';
import menSlim from '@/assets/protocolW/MenBody-types/slim.webp';
import menSuperMuscular from '@/assets/protocolW/MenBody-types/super-muscular.webp';

// Woman Shapes
import womanHealth from '@/assets/protocolW/Woman-Body-Types/health.webp';
import womanSlim from '@/assets/protocolW/Woman-Body-Types/Slim.webp';
import womanSuperMuscular from '@/assets/protocolW/Woman-Body-Types/Super-Muscular.webp';
import womanUltraMuscular from '@/assets/protocolW/Woman-Body-Types/Ultra-Muscular.webp';

export default function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isTestMode, setIsTestMode] = useState(false);
  const [answers, setAnswers] = useState({
    sex: '',
    age: '',
    height: 170,
    weight: 70,
    shape: ''
  });

  // Prefetching Logic (Phase D)
  useEffect(() => {
    const imagesToPrefetch: string[] = [];
    if (step === 4 && answers.sex) {
      if (answers.sex === 'Male') {
        imagesToPrefetch.push(menFit, menMuscular, menSlim, menSuperMuscular);
      } else {
        imagesToPrefetch.push(womanHealth, womanSlim, womanSuperMuscular, womanUltraMuscular);
      }
    }
    
    imagesToPrefetch.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [step, answers.sex]);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      console.log('Final Answers:', answers);
      navigate('/loading', { state: { quizAnswers: answers, isTestMode } });
    }
  };

  const updateAnswer = (key: string, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } }
  };

  const getHeadline = () => {
    if (step === 1) return "Use AI to Create Your Personalized Workout Protocol and Understand Deeply Why This is The Easyiest and Best Routine For You!";
    if (step === 2) return "What is your age?";
    if (step === 3) return "What is your height?";
    if (step === 4) return "What is your weight?";
    if (step === 5) return "What is your desired shape?";
    return "";
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-2 gap-6 w-full max-w-lg mx-auto">
            <SelectableImageCard
              imageSrc={menImg}
              label="Male"
              selected={answers.sex === 'Male'}
              onClick={() => updateAnswer('sex', 'Male')}
            />
            <SelectableImageCard
              imageSrc={womanImg}
              label="Female"
              selected={answers.sex === 'Female'}
              onClick={() => updateAnswer('sex', 'Female')}
            />
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mx-auto">
            {['18-29', '30-39', '40-49', '50+'].map(ageRange => (
              <Button
                key={ageRange}
                variant={answers.age === ageRange ? 'default' : 'outline'}
                className={`h-16 text-lg rounded-2xl ${answers.age === ageRange ? 'border-2 border-[var(--primary)]' : ''}`}
                onClick={() => updateAnswer('age', ageRange)}
              >
                {ageRange}
              </Button>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="w-full">
            <DraggableSlider
              min={100}
              max={220}
              defaultValue={answers.height}
              unit="cm"
              label="Slide to select height"
              onChange={(val) => updateAnswer('height', val)}
            />
          </div>
        );
      case 4:
        return (
          <div className="w-full">
            <DraggableSlider
              min={40}
              max={150}
              defaultValue={answers.weight}
              unit="kg"
              label="Slide to select weight"
              onChange={(val) => updateAnswer('weight', val)}
            />
          </div>
        );
      case 5: {
        const isMale = answers.sex === 'Male';
        const shapes = isMale 
          ? [
              { label: 'Super-Muscular', src: menSuperMuscular },
              { label: 'Muscular', src: menMuscular },
              { label: 'Fit', src: menFit },
              { label: 'Slim', src: menSlim }
            ]
          : [
              { label: 'Super-Muscular', src: womanUltraMuscular },
              { label: 'Muscular', src: womanSuperMuscular },
              { label: 'Fit', src: womanHealth },
              { label: 'Slim', src: womanSlim }
            ];

        return (
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm mx-auto">
            {shapes.map((shape) => (
              <SelectableImageCard
                key={shape.label}
                imageSrc={shape.src}
                label={shape.label}
                selected={answers.shape === shape.label}
                aspectRatio="aspect-square"
                onClick={() => updateAnswer('shape', shape.label)}
              />
            ))}
          </div>
        );
      }
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    if (step === 1 && !answers.sex) return true;
    if (step === 2 && !answers.age) return true;
    if (step === 5 && !answers.shape) return true;
    return false;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans antialiased flex flex-col overflow-hidden"
    >
      {/* N8N Target Webhook Toggle */}
      <div className="flex items-center justify-center gap-2 py-2 bg-slate-950/80 border-b border-white/5 text-xs z-50">
        <span className="font-semibold tracking-wider text-[var(--muted-foreground)] uppercase">N8N Target:</span>
        <button
          type="button"
          onClick={() => setIsTestMode(false)}
          className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${!isTestMode ? 'bg-[var(--primary)] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
        >
          Production (/webhook)
        </button>
        <button
          type="button"
          onClick={() => setIsTestMode(true)}
          className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${isTestMode ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'}`}
        >
          Test Mode (/webhook-test)
        </button>
      </div>

      <Header>
        <div className="w-[384px] sm:w-[576px]">
          <FunnelProgressBar currentStep={step} totalSteps={5} />
        </div>
      </Header>
      
      <main className="flex-1 flex flex-col items-center justify-start px-4 pt-10 pb-20 gap-6">
        <div className="text-center w-full max-w-4xl px-4 min-h-[100px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${step}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className={`font-extrabold tracking-tight ${step === 1 ? 'text-2xl md:text-4xl leading-tight' : 'text-4xl md:text-5xl'}`}
            >
              {getHeadline()}
            </motion.h1>
          </AnimatePresence>
        </div>
        
        <div className="w-full max-w-4xl min-h-[350px] flex flex-col items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${step}`}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex items-center justify-center"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="w-full max-w-xl flex flex-col items-center gap-6 mt-2">
          <Button 
            size="lg" 
            className="w-full text-lg h-14 md:h-16 rounded-2xl shadow-[var(--shadow-md)]"
            onClick={handleNext}
            disabled={isNextDisabled()}
          >
            {step === 5 ? 'FINISH QUIZ' : 'CONTINUE'}
          </Button>
          <p className="text-center text-sm text-[var(--muted-foreground)]">
            * We respect your privacy. Your data is used exclusively to generate your personalized protocol. *
          </p>
        </div>
      </main>
    </motion.div>
  );
}
