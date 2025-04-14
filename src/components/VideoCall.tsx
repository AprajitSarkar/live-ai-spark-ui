
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Settings, Mic, MicOff, Camera, CameraOff, SwitchCamera, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVideoCall } from "@/hooks/useVideoCall";
import AudioVisualizer from "./AudioVisualizer";

interface VideoCallProps {
  apiKey: string;
}

const VideoCall = ({ apiKey }: VideoCallProps) => {
  const navigate = useNavigate();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const { videoRef, duration, startCall, isActive } = useVideoCall();

  useEffect(() => {
    startCall();
  }, []);

  const handleEndCall = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900/90 to-black">
      {/* Status bar with only time duration in the top right */}
      <div className="absolute top-0 right-0 p-4 flex justify-end items-center text-white/80 text-sm z-10">
        <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full">
          <span>{duration}</span>
        </div>
      </div>

      {/* Camera switch button in top left */}
      <div className="absolute top-4 left-4 z-10">
        <Button variant="ghost" size="icon" className="rounded-full bg-gray-900/50 text-white hover:bg-gray-800/50">
          <SwitchCamera className="h-5 w-5" />
        </Button>
      </div>

      {/* Title bar */}
      <div className="absolute top-14 left-0 right-0 flex justify-center items-center px-4 z-10">
        <div className="text-center text-white">
          <h1 className="text-xl font-medium">AI Assistant</h1>
          <p className="text-sm opacity-80">{isActive ? 'Connected' : 'Connecting...'}</p>
        </div>
      </div>

      {/* Camera preview */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {isCameraOn ? (
          <div className="rounded-3xl overflow-hidden w-full h-[70vh] bg-gray-800/30 backdrop-blur-sm">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="rounded-3xl w-full h-[70vh] bg-gray-800/30 backdrop-blur-sm flex items-center justify-center">
            <CameraOff className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>

      {/* Audio visualizer */}
      <div className="absolute top-1/4 left-0 right-0 flex justify-center z-10">
        <AudioVisualizer />
      </div>

      {/* Bottom controls */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="absolute bottom-8 left-4 right-4 z-10"
      >
        <div className="bg-gray-900/90 backdrop-blur-lg rounded-full p-2 flex justify-around items-center">
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
            onClick={handleEndCall}
          >
            <PhoneOff className="h-6 w-6" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoCall;
