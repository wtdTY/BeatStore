import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BeatPlayerProps {
  audioUrl: string;
  onEnd?: () => void;
  small?: boolean;
}

export default function BeatPlayer({ audioUrl, onEnd, small = false }: BeatPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>([]);

  // Generate random waveform data (in a real app this would come from actual audio analysis)
  useEffect(() => {
    const generateWaveform = () => {
      const numBars = small ? 20 : 50;
      const data = Array.from({ length: numBars }, () => 
        Math.random() * 0.8 + 0.2
      );
      setWaveformData(data);
      setIsLoaded(true);
    };
    
    generateWaveform();
  }, [small]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
      if (onEnd) onEnd();
    });

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', () => {
        if (onEnd) onEnd();
      });
    };
  }, [onEnd]);

  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!waveformRef.current || !audioRef.current) return;

    const rect = waveformRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickPositionRatio = x / rect.width;
    
    // Set audio position based on click
    if (audioRef.current.duration) {
      audioRef.current.currentTime = audioRef.current.duration * clickPositionRatio;
      setProgress(clickPositionRatio);
    }
  };

  return (
    <div className={cn(
      "relative w-full",
      small ? "h-8" : "h-12",
      !isLoaded && "animate-pulse bg-muted rounded"
    )}>
      <audio ref={audioRef} src={audioUrl} hidden />
      
      {isLoaded && (
        <div 
          ref={waveformRef}
          className="waveform h-full w-full cursor-pointer"
          onClick={handleWaveformClick}
        >
          <div className="flex items-end h-full w-full gap-[2px]">
            {waveformData.map((height, index) => (
              <div
                key={index}
                className={cn(
                  "flex-1 rounded-sm transition-all duration-150",
                  progress * waveformData.length > index 
                    ? "bg-red-500" 
                    : "bg-gray-300 dark:bg-gray-700"
                )}
                style={{ height: `${height * 100}%` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}