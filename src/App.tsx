import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Dialog from '@radix-ui/react-dialog'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-2xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-4">
          Protocol-W
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8 font-light">
          Your modern React application is ready. Built with React, Tailwind CSS v4, Radix UI Primitives, and Framer Motion.
        </p>

        <div className="flex gap-4 justify-center items-center">
          <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 font-semibold shadow-lg shadow-purple-500/20 transition-colors cursor-pointer"
              >
                Open Demo Modal
              </motion.button>
            </Dialog.Trigger>

            <AnimatePresence>
              {isOpen && (
                <Dialog.Portal forceMount>
                  <Dialog.Overlay asChild>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                      <Dialog.Content asChild>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 20 }}
                          transition={{ type: 'spring', duration: 0.5 }}
                          className="bg-[#0b0f19] border border-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl relative"
                        >
                          <Dialog.Title className="text-2xl font-bold text-white mb-2">
                            Radix + Framer Motion
                          </Dialog.Title>
                          <Dialog.Description className="text-gray-400 mb-6">
                            This modal dialog is powered by Radix UI's accessible primitive and animated smoothly using Framer Motion.
                          </Dialog.Description>

                          <div className="flex justify-end gap-3">
                            <Dialog.Close asChild>
                              <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-colors cursor-pointer">
                                Close
                              </button>
                            </Dialog.Close>
                          </div>
                        </motion.div>
                      </Dialog.Content>
                    </motion.div>
                  </Dialog.Overlay>
                </Dialog.Portal>
              )}
            </AnimatePresence>
          </Dialog.Root>

          <a
            href="https://github.com/brunocastelanigov-afk/Protocol-W"
            target="_blank"
            rel="noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl border border-gray-800 hover:border-gray-700 bg-gray-900/50 hover:bg-gray-950/50 font-semibold shadow-lg backdrop-blur-sm transition-colors cursor-pointer"
            >
              GitHub Repository
            </motion.button>
          </a>
        </div>
      </motion.div>

      {/* Tech Cards Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl w-full z-10"
      >
        {[
          { name: 'React', desc: 'Component Architecture', color: 'text-sky-400' },
          { name: 'Tailwind CSS v4', desc: 'Utility-first Styling', color: 'text-teal-400' },
          { name: 'Radix UI', desc: 'Accessible Primitives', color: 'text-purple-400' },
          { name: 'Framer Motion', desc: 'Fluid Animations', color: 'text-pink-400' },
        ].map((tech) => (
          <motion.div
            key={tech.name}
            whileHover={{ y: -5 }}
            className="p-5 rounded-2xl bg-gray-900/30 border border-gray-950 backdrop-blur-sm flex flex-col justify-between"
          >
            <div>
              <span className={`text-xs font-mono font-semibold ${tech.color} uppercase tracking-wider`}>
                {tech.name}
              </span>
              <h3 className="text-lg font-bold text-white mt-2">{tech.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{tech.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default App
