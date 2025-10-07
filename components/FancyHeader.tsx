import { motion } from "framer-motion";

export default function FancyHeader() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative text-6xl sm:text-8xl font-bold text-transparent bg-clip-text 
                 bg-gradient-to-r from-purple-400 via-fuchsia-500 to-amber-300 
                 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] select-none"
    >
      MasseurMatch
      <motion.span
        animate={{
          textShadow: [
            "0 0 10px rgba(243,171,255,0.5)",
            "0 0 20px rgba(255,200,100,0.6)",
            "0 0 10px rgba(243,171,255,0.5)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute inset-0 text-transparent bg-clip-text 
                   bg-gradient-to-r from-amber-300 via-purple-400 to-fuchsia-500"
      >
        MasseurMatch
      </motion.span>
    </motion.h1>
  );
}
