import { motion } from "framer-motion";

export function ResultCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="overflow-hidden rounded-2xl bg-white shadow-2xl shadow-cyan-900/20 border-4 border-white ring-1 ring-black/5">
        
        {/* Header Section */}
        <div className="bg-cyan-50/80 pt-8 pb-6 px-6 text-center border-b border-cyan-100/50">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2 font-serif">
            Your Custom Plan is Ready
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-serif">
            Based on your answers, we built a personalized protocol.
          </p>
        </div>

        {/* Content Section */}
        <div className="p-6 bg-white">
          <div className="grid grid-cols-2 gap-4">
            
            {/* Metric Card 1 */}
            <div className="flex flex-col items-center justify-center py-6 px-4 rounded-xl border border-slate-300 bg-[#fbfbf9] shadow-sm">
              <span className="text-4xl font-bold text-cyan-600 mb-1">12</span>
              <span className="text-xs font-semibold text-slate-600 tracking-[0.2em] uppercase">Weeks</span>
            </div>

            {/* Metric Card 2 */}
            <div className="flex flex-col items-center justify-center py-6 px-4 rounded-xl border border-slate-300 bg-[#fbfbf9] shadow-sm">
              <span className="text-4xl font-bold text-cyan-600 mb-1">100%</span>
              <span className="text-xs font-semibold text-slate-600 tracking-[0.2em] uppercase">Personalized</span>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}