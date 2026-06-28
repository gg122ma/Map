import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="text-7xl mb-6"
        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        🏫
      </motion.div>
      <motion.h1
        className="text-2xl font-bold text-white mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Campus Heritage Map
      </motion.h1>
      <motion.p
        className="text-slate-400 text-sm mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading campus memories…
      </motion.p>

      {/* Progress bar */}
      <motion.div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        className="flex gap-3 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {['🍜', '📚', '🎓', '🏠', '⚽', '🏛️'].map((emoji, i) => (
          <motion.span
            key={i}
            className="text-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15 }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
