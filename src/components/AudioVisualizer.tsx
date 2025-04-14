
import { useEffect, useRef } from "react";

const AudioVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bars = 20;
    const barWidth = 2;
    const barSpacing = 2;
    const totalWidth = bars * (barWidth + barSpacing);

    canvas.width = totalWidth;
    canvas.height = 30;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < bars; i++) {
        const height = Math.random() * canvas.height;
        const x = i * (barWidth + barSpacing);
        const gradient = ctx.createLinearGradient(0, canvas.height - height, 0, canvas.height);
        gradient.addColorStop(0, "#9333ea");
        gradient.addColorStop(1, "#db2777");
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - height, barWidth, height);
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="opacity-60"
    />
  );
};

export default AudioVisualizer;
