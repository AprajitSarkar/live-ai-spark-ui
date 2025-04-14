
import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Mic, MicOff, Camera, CameraOff, SwitchCamera } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioVisualizer from "./AudioVisualizer";

interface VideoCallProps {
  apiKey: string;
}

const VideoCall = ({ apiKey }: VideoCallProps) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  return (
    <div className="fixed inset-0 bg-gray-900">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-gray-900/80 to-transparent z-10">
        <Button variant="ghost" size="icon" className="text-white">
          <Settings className="h-6 w-6" />
        </Button>
        <div className="flex-1 flex justify-center">
          <AudioVisualizer />
        </div>
        <div className="w-10" /> {/* Placeholder for symmetry */}
      </div>

      {/* Main content area */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isCameraOn ? (
          <div className="rounded-full w-32 h-32 bg-gray-800 flex items-center justify-center">
            <span className="text-gray-400">Camera Preview</span>
          </div>
        ) : (
          <div className="rounded-full w-32 h-32 bg-gray-800 flex items-center justify-center">
            <CameraOff className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="absolute bottom-0 left-0 right-0 p-6 flex justify-center items-center space-x-4 bg-gradient-to-t from-gray-900/80 to-transparent"
      >
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full p-3 ${
            isMicOn ? "bg-gray-800 text-white" : "bg-red-600 text-white"
          }`}
          onClick={() => setIsMicOn(!isMicOn)}
        >
          {isMicOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full p-3 ${
            isCameraOn ? "bg-gray-800 text-white" : "bg-red-600 text-white"
          }`}
          onClick={() => setIsCameraOn(!isCameraOn)}
        >
          {isCameraOn ? <Camera className="h-6 w-6" /> : <CameraOff className="h-6 w-6" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full p-3 bg-gray-800 text-white"
        >
          <SwitchCamera className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
};

export default VideoCall;
