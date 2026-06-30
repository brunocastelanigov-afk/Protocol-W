import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/ui/Header";
import type { WorkoutPlan } from "@/services/api";

export default function FinalTraining() {
  const location = useLocation();
  const navigate = useNavigate();
  const workoutPlan: WorkoutPlan | null = location.state?.workoutPlan || null;

  // Redirect to quiz if no plan data
  useEffect(() => {
    if (!workoutPlan) {
      navigate('/');
    }
  }, [workoutPlan, navigate]);

  if (!workoutPlan) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-screen overflow-y-auto scrollbar-hide bg-[var(--background)]"
    >
      {/* Header Area */}
      <Header />
      
      {/* Hero Section */}
      <section className="px-6 py-8 flex flex-col items-center text-center gap-4">
        <div className="flex flex-col gap-2 items-center">
          <span className="font-bold text-sm text-muted-foreground">[W] Protocol-W</span>
          <h1 className="text-3xl font-bold tracking-tight">{workoutPlan.title}</h1>
          <p className="text-sm text-muted-foreground max-w-md">{workoutPlan.description}</p>
        </div>
        
        {/* Meta badges */}
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary)] text-[var(--primary-foreground)]">
            {workoutPlan.frequency}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--secondary)] text-[var(--secondary-foreground)]">
            {workoutPlan.duration}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent)] text-[var(--accent-foreground)]">
            {workoutPlan.level}
          </span>
        </div>

        <div className="flex gap-3 w-full max-w-xs mt-2">
          <Button variant="outline" className="flex-1">Save Asset</Button>
          <Button variant="default" className="flex-1">Download</Button>
        </div>
      </section>

      {/* Training Plan Content */}
      <main className="flex-1 flex flex-col px-4 sm:px-6 pb-6 gap-6">
        
        {/* ABC Day Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workoutPlan.days.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIndex * 0.15, duration: 0.4 }}
            >
              <Card className="flex flex-col p-5 shadow-md bg-white text-black min-h-[300px] border border-gray-200 h-full">
                {/* Day Header */}
                <div className="text-center border-b border-gray-300 pb-3 mb-4">
                  <h2 className="font-bold text-lg">{day.day}</h2>
                  <p className="text-xs text-gray-500 font-semibold mt-1">{day.focus}</p>
                </div>
                
                {/* Exercises */}
                <div className="flex flex-col gap-3 flex-1">
                  {day.exercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="flex flex-col gap-0.5 pb-2 border-b border-gray-100 last:border-0">
                      <span className="font-medium text-sm">{exercise.name}</span>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{exercise.sets} × {exercise.reps}</span>
                        <span className="text-gray-300">|</span>
                        <span>Rest: {exercise.rest}</span>
                      </div>
                      {exercise.notes && (
                        <span className="text-xs text-gray-400 italic mt-0.5">{exercise.notes}</span>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tips Section */}
        {workoutPlan.tips && workoutPlan.tips.length > 0 && (
          <Card className="p-5 shadow-md bg-white text-black border border-gray-200">
            <h3 className="font-bold text-sm mb-3 text-center">💡 PRO TIPS</h3>
            <ul className="flex flex-col gap-2">
              {workoutPlan.tips.map((tip, i) => (
                <li key={i} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-[var(--primary)] font-bold">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </Card>
        )}
      </main>

      {/* Footer Action */}
      <footer className="px-6 py-6 border-t border-[var(--border)] flex flex-col gap-4 bg-[var(--background)] mt-auto sticky bottom-0">
        <Button size="lg" className="w-full">Download Protocol</Button>
        <p className="text-xs text-center text-muted-foreground">
          * Future Roadmap: Edit Training Parameters | Track Workout Progress
        </p>
      </footer>
    </motion.div>
  );
}
