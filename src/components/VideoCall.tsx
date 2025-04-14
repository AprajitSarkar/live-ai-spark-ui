
import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Mic, MicOff, Camera, CameraOff, SwitchCamera, UserPlus, MoreHorizontal, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioVisualizer from "./AudioVisualizer";

interface VideoCallProps {
  apiKey: string;
}

const VideoCall = ({ apiKey }: VideoCallProps) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  
  // Get current time in HH:mm format
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-teal-900/80 to-gray-900">
      {/* Status bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center text-white/80 text-sm">
        <span>{currentTime}</span>
        <div className="flex items-center gap-2">
          <span>82.3 KB/s</span>
          <div className="flex gap-1">
            {[1,2,3,4].map((i) => (
              <div key={i} className="w-1 h-3 bg-white/80 rounded-full" />
            ))}
          </div>
          <span>55%</span>
        </div>
      </div>

      {/* Title bar */}
      <div className="absolute top-14 left-0 right-0 flex justify-between items-center px-4">
        <Button variant="ghost" size="icon" className="rounded-full bg-gray-900/50 text-white">
          <span className="transform rotate-45">
            <SwitchCamera className="h-5 w-5" />
          </span>
        </Button>
        <div className="text-center text-white">
          <h1 className="text-xl font-medium">Spider</h1>
          <p className="text-sm opacity-80">3:58</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-gray-900/50 text-white">
          <UserPlus className="h-5 w-5" />
        </Button>
      </div>

      {/* Camera preview area */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {isCameraOn ? (
          <div className="rounded-3xl overflow-hidden w-full h-[70vh] bg-gray-800/30 backdrop-blur-sm">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400">Camera Preview</span>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl w-full h-[70vh] bg-gray-800/30 backdrop-blur-sm flex items-center justify-center">
            <CameraOff className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="absolute bottom-8 left-4 right-4"
      >
        <div className="bg-gray-900/90 backdrop-blur-lg rounded-full p-2 flex justify-around items-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-700/50"
          >
            <MoreHorizontal className="h-6 w-6 text-white" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white text-black"
            onClick={() => setIsCameraOn(!isCameraOn)}
          >
            {isCameraOn ? <Camera className="h-6 w-6" /> : <CameraOff className="h-6 w-6" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white text-black"
            onClick={() => setIsMicOn(!isMicOn)}
          >
            {isMicOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-red-500 text-white hover:bg-red-600"
          >
            <PhoneOff className="h-6 w-6" />
          </Button>
        </div>
      </motion.div>

      {/* Audio visualizer */}
      <div className="absolute top-1/4 left-0 right-0 flex justify-center">
        <AudioVisualizer />
      </div>
    </div>
  );
};

export default VideoCall;
