
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-4 mb-4"
      >
        <Sparkles className="w-12 h-12 text-white" />
      </motion.div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-2xl font-bold text-white mb-2"
      >
        Live AI Spark
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-300"
      >
        Experience AI-powered conversations
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;
