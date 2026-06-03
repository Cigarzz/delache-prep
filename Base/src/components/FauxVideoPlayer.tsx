import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Eye, Calendar, Sparkles } from 'lucide-react';

interface FauxVideoPlayerProps {
  businessName: string;
  prospectName: string;
}

export default function FauxVideoPlayer({ businessName, prospectName }: FauxVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const [showFinishedOverlay, setShowFinishedOverlay] = useState(false);

  // Simulated video player updates
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            setShowFinishedOverlay(true);
            return 100;
          }
          return prev + 1;
        });
      }, 1500); // ~2.5 mins total simulation
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
    if (showFinishedOverlay) {
      setProgress(0);
      setShowFinishedOverlay(false);
    }
  };

  const formattedTime = (percentage: number) => {
    const totalSeconds = 180; // 3 minutes
    const currentSeconds = Math.round((percentage / 100) * totalSeconds);
    const mins = Math.floor(currentSeconds / 60);
    const secs = currentSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Intro Framing Copy - Asymmetric 5 Columns */}
      <div className="lg:col-span-5 flex flex-col justify-between">
        <div>
          <span className="font-mono text-xs text-[#BC4A24] font-bold block mb-3 uppercase tracking-widest">// Section 01 // The Explanation</span>
          
          <h2 className="text-3xl font-serif font-black italic tracking-tight text-[#1C1C1C] leading-[1.1] mb-5">
            Why I built a site for {businessName} before we even had a chat.
          </h2>
          
          <div className="space-y-4 font-sans text-sm text-[#444] leading-relaxed">
            <p>
              I know you get a hundred generic cold calls from overseas agencies promising you page-one of Google. None of them have looked at your business or know a sparky from a tiler. They're mass-emailing everyone.
            </p>
            <p>
              I don't do that. I spent around four hours researching your trade area here in Brisbane, looking at your competitors, and sketching out a website that actually rings.
            </p>
            <p className="font-semibold text-[#1C1C1C]">
              In this short 3-minute run-through, I show you:
            </p>
            <ul className="space-y-2 pl-4 border-l-2 border-[#BC4A24] text-xs">
              <li>
                <span className="font-bold text-[#1C1C1C]">The Local Leak:</span> Where most Brisbane trade builders lose up to 50% of call-outs on mobile.
              </li>
              <li>
                <span className="font-bold text-[#1C1C1C]">The Mockup Walkthrough:</span> A real click-around layout made to fix it for <span className="underline decoration-[#BC4A24] font-semibold">{businessName}</span>.
              </li>
              <li>
                <span className="font-bold text-[#1C1C1C]">The Simple Launch:</span> How we go live in 7 days without you touching a line of code.
              </li>
            </ul>
          </div>
        </div>
        
        {/* Quote segment */}
        <div className="mt-6 p-4 bg-[#EFEAE0] rounded border border-[#E0D9CD] text-xs font-serif italic text-[#555] relative">
          "No sales pitch over the phone. Just watch the video, scroll down to see the work, and decide if it makes sense." 
          <span className="block font-sans not-italic font-bold text-[#1C1C1C] text-[10px] uppercase mt-2">— Ben, Builder & Developer</span>
        </div>
      </div>

      {/* Beautiful Simulated Video Player - Asymmetric 7 Columns */}
      <div className="lg:col-span-7">
        <div className="relative bg-[#1C1C1C] rounded-lg overflow-hidden border border-[#1C1C1C] shadow-lg aspect-video flex flex-col justify-between group">
          {/* Main Display Backdrop / Poster */}
          {!isPlaying && !showFinishedOverlay && progress === 0 ? (
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url("https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop")' }}
            >
              {/* Top watermark tags */}
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] text-white/80 bg-white/10 px-2 py-0.5 rounded tracking-widest uppercase">
                  Brisbane // Ipswich
                </span>
                <span className="font-mono text-[10px] text-[#FF4C29] flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4C29] animate-pulse"></span>
                   3:00 MIN RUNTIME
                </span>
              </div>

              {/* Centered big play button */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
                <button 
                  onClick={handlePlayToggle}
                  className="w-16 h-16 rounded-full bg-[#BC4A24] text-white flex items-center justify-center hover:scale-105 transition-all shadow-lg hover:bg-[#A33B18]"
                  aria-label="Play video"
                >
                  <Play size={24} className="ml-1" />
                </button>
              </div>

              {/* Title label */}
              <div>
                <p className="text-white/60 font-mono text-[10px] tracking-wide mb-1 uppercase">PERSONALIZED OVERVIEW FOR {prospectName.toUpperCase()}</p>
                <h3 className="text-white text-xl font-serif italic tracking-wide">
                  "{businessName} Mockup Review. Where the leaks are."
                </h3>
              </div>
            </div>
          ) : null}

          {/* Simulated Active Video Playing Presentation */}
          {isPlaying && (
            <div className="absolute inset-0 bg-[#2C2E2A] z-0 flex flex-col justify-center items-center p-6 text-center select-none overflow-hidden">
              {/* Australian Bush/Worker Minimal Grain Backdrop */}
              <div className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-overlay"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop")' }}
              />
              
              <div className="relative z-10 space-y-4 max-w-sm">
                <div className="flex justify-center gap-1">
                  <span className="w-1 h-3 bg-[#BC4A24] rounded-xs animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-1 h-5 bg-[#BC4A24] rounded-xs animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1 h-4 bg-[#BC4A24] rounded-xs animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                </div>
                
                {progress < 25 ? (
                  <p className="font-serif italic text-white/90 text-sm md:text-base animate-pulse">
                    "Alright {prospectName}, let's talk about fast-loading mobile. No fluff."
                  </p>
                ) : progress < 55 ? (
                  <p className="font-serif italic text-white/90 text-sm md:text-base animate-pulse">
                    "Look at your markup below in section 02. Notice how clean it reads."
                  </p>
                ) : progress < 85 ? (
                  <p className="font-serif italic text-white/90 text-sm md:text-base animate-pulse">
                    "We swap your licenses, credentials and launch in 7 days."
                  </p>
                ) : (
                  <p className="font-serif italic text-white/90 text-sm md:text-base animate-pulse">
                    "Grab a spot in the calendar below when you're ready."
                  </p>
                )}

                <div className="text-[10px] font-mono text-white/40 tracking-wider">
                  MOCK VIDEO STREAM ACTIVE ({progress}% PLAYED)
                </div>
              </div>
            </div>
          )}

          {/* Finished Overlay */}
          {showFinishedOverlay && (
            <div className="absolute inset-0 z-10 bg-black/90 flex flex-col justify-center items-center p-6 text-center">
              <h4 className="text-white text-lg font-serif italic mb-2">Video Finished. Cheers for watching.</h4>
              <p className="text-white/60 text-xs max-w-xs mb-5 font-sans">
                Next step: Check out the actual browser mockup just below, then lock in your 15-minute slot.
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={handlePlayToggle}
                  className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw size={12} />
                  <span>Replay</span>
                </button>
                <a 
                  href="#calendar" 
                  className="px-4 py-2 rounded bg-[#BC4A24] hover:bg-[#A33B18] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Book Time Now</span>
                </a>
              </div>
            </div>
          )}

          {/* Standard Video Player Controls Overlay */}
          <div className="relative z-10 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col gap-2 mt-auto">
            {/* Timeline Progress Bar */}
            <div className="w-full bg-white/20 h-1 rounded-full cursor-pointer relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const pct = Math.round((clickX / rect.width) * 100);
                setProgress(pct);
                setShowFinishedOverlay(false);
              }}
            >
              <div className="bg-[#BC4A24] h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>

            {/* Bottom Controls Row */}
            <div className="flex items-center justify-between text-white/90">
              <div className="flex items-center gap-3">
                <button onClick={handlePlayToggle} className="hover:text-[#BC4A24] transition-colors" aria-label={isPlaying ? 'Pause' : 'Play'}>
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <div className="text-xs font-mono">
                  {formattedTime(progress)} <span className="text-white/40">/ 3:00</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => setMuted(!muted)} className="hover:text-[#BC4A24] transition-colors" aria-label={muted ? 'Unmute' : 'Mute'}>
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <span className="font-mono text-[9px] tracking-wider text-white/60 uppercase">1080p HD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
