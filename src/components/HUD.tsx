import { motion, AnimatePresence } from 'framer-motion';
import { useCampusStore } from '../store/campusStore';

interface HUDProps {
  onBack: () => void;
}

export default function HUD({ onBack }: HUDProps) {
  const { selectedBuilding, buildings } = useCampusStore();
  const totalMemories = buildings.reduce((acc, b) => acc + b.memories.length, 0);

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 pt-4 pb-2 pointer-events-none">
        {/* Logo / Title */}
        <motion.div
          className="pointer-events-auto flex items-center gap-2.5 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2.5 shadow-xl"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', damping: 20 }}
        >
          <span className="text-2xl">🏫</span>
          <div>
            <h1 className="text-white font-bold text-sm leading-tight">Campus Heritage Map</h1>
            <p className="text-slate-400 text-xs">{totalMemories} memories · {buildings.length} locations</p>
          </div>
        </motion.div>

        {/* Back button (when building selected) */}
        <AnimatePresence>
          {selectedBuilding && (
            <motion.button
              onClick={onBack}
              className="pointer-events-auto flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white rounded-2xl px-4 py-2.5 text-sm font-medium transition-all shadow-xl"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              ← Back to Map
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom hint */}
      <AnimatePresence>
        {!selectedBuilding && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ delay: 1, type: 'spring', damping: 20 }}
          >
            <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 text-xs text-slate-300 flex items-center gap-2 shadow-xl">
              <span className="animate-bounce">👇</span>
              Click a building to explore memories · Drag to rotate · Scroll to zoom
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Building legend (when no building selected) */}
      <AnimatePresence>
        {!selectedBuilding && (
          <motion.div
            className="fixed bottom-20 right-4 z-30 pointer-events-none"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ delay: 0.5, type: 'spring', damping: 20 }}
          >
            <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-xl space-y-1.5">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Buildings</p>
              {buildings.map(b => (
                <div key={b.id} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: b.color }} />
                  <span className="text-xs text-slate-300">{b.emoji} {b.name}</span>
                  <span className="text-xs text-slate-500 ml-auto pl-2">💬{b.memories.length}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
