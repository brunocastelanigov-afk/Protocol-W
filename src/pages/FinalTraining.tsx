import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/ui/Header";

export default function FinalTraining() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-screen h-screen overflow-y-auto scrollbar-hide bg-[var(--background)]"
    >
      {/* Header Area (Status bar & Navigation) */}
      <Header />
      
      {/* Hero Section */}
      <section className="px-6 py-8 flex flex-col items-center text-center gap-6">
        <div className="flex flex-col gap-2 items-center">
          <span className="font-bold text-sm text-muted-foreground">[W] Protocol-W</span>
          <h1 className="text-3xl font-bold tracking-tight">Your AI Workout Protocol</h1>
        </div>
        
        <div className="flex gap-3 w-full max-w-xs">
          <Button variant="outline" className="flex-1">Save Asset</Button>
          <Button variant="default" className="flex-1">Download</Button>
        </div>
      </section>

      {/* Final Training Main Content */}
      <main className="flex-1 flex flex-col px-6 pb-6 gap-6">
        
        {/* Paper Sheet Component */}
        <Card className="flex flex-col flex-1 p-6 shadow-md bg-white text-black min-h-[400px] border border-gray-200">
          <div className="text-center font-bold border-b border-gray-300 pb-2 mb-4">
            PROTOCOL SUMMARY
          </div>
          
          <div className="text-sm font-semibold mb-4 text-center">
            [ DAILY ROUTINE BREAKDOWN ]
          </div>
          
          {/* Multi Column Routine Breakdown */}
          <div className="grid grid-cols-3 gap-2 flex-1">
            <div className="border border-dashed border-gray-300 p-2 flex items-center justify-center text-xs">
              Day 1 Column
            </div>
            <div className="border border-dashed border-gray-300 p-2 flex items-center justify-center text-xs">
              Day 2 Column
            </div>
            <div className="border border-dashed border-gray-300 p-2 flex items-center justify-center text-xs">
              Day 3 Column
            </div>
          </div>
        </Card>
      </main>

      {/* Final Training Footer Action */}
      <footer className="px-6 py-6 border-t border-[var(--border)] flex flex-col gap-4 bg-[var(--background)] mt-auto sticky bottom-0">
        <Button size="lg" className="w-full">Download Protocol</Button>
        <p className="text-xs text-center text-muted-foreground">
          * Future Roadmap: Edit Training Parameters | Track Workout P
        </p>
      </footer>
    </motion.div>
  );
}
