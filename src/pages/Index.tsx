
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import ApiKeyForm from "@/components/ApiKeyForm";
import VideoCall from "@/components/VideoCall";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem("apiKey"));

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AnimatePresence>
        {showSplash ? (
          <SplashScreen />
        ) : !apiKey ? (
          <ApiKeyForm setApiKey={setApiKey} />
        ) : (
          <VideoCall apiKey={apiKey} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
