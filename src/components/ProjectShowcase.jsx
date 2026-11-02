import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX, Play, Pause, ArrowRight, Film } from 'lucide-react';

export const ProjectShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Autoplay deferred:', err);
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.warn('Play error:', e));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !video.muted;
    video.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <section className="relative w-full bg-[#111111] overflow-hidden border-b border-[#2A2620]">
      
      {/* 21:9 Ultra-Wide Cinematic Video Frame */}
      <div className="relative min-h-[580px] sm:min-h-[680px] lg:min-h-[760px] flex items-end justify-center overflow-hidden">
        
        {/* Background Editorial Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.08] saturate-[0.95]"
        >
          <source src="/videos/gmm.mp4" type="video/mp4" />
          <source src="/videos/gm.mp4" type="video/mp4" />
        </video>

        {/* Vintage Film Texture & Antique Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/60 pointer-events-none" />

        {/* Top Floating Badge */}
        <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/75 backdrop-blur-md text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#E8DFD1] border border-white/20 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Couture Film Archive</span>
          </span>
        </div>

        {/* Floating Sound & Playback Controls */}
        <div className="absolute top-8 right-8 z-20 flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleMute}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-black/65 hover:bg-black/90 backdrop-blur-md text-[#FFFFFF] text-[10px] uppercase tracking-widest border border-white/25 rounded-full transition-all cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={13} className="text-[#B69A62]" /> : <Volume2 size={13} className="text-emerald-400" />}
            <span className="hidden sm:inline font-mono">{isMuted ? 'Sound Off' : 'Sound On'}</span>
          </button>
          
          <button
            type="button"
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-black/65 hover:bg-black/90 backdrop-blur-md text-[#FFFFFF] flex items-center justify-center border border-white/25 transition-all cursor-pointer"
            title={isPlaying ? 'Pause Video' : 'Play Video'}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
          </button>
        </div>

        {/* Centered-Style Overlay Typography */}
        <div className="relative z-10 text-center px-6 pb-14 sm:pb-20 max-w-4xl mx-auto">
          
          <div className="inline-flex items-center gap-2 mb-4 text-[#C5A059] text-[10px] sm:text-xs uppercase tracking-[0.4em] font-medium">
            <Film size={13} />
            <span>Sualkuchi Haute Couture Editorial</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FFFFFF] font-normal tracking-[0.16em] uppercase leading-tight mb-4 drop-shadow-md">
            The Curiosity, Art & Antiquity Project
          </h2>

          <p className="text-xs sm:text-sm text-[#E8DFD1]/85 font-light tracking-wide max-w-2xl mx-auto mb-8 leading-relaxed">
            Four hundred years of indigenous Brahmaputra handloom mastery, captured in slow, rhythmic 
            folds of pure wild Muga and ceremonial Paat silk.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/shop?category=Bridal%20Couture"
              className="px-8 py-3.5 bg-[#FFFFFF] text-[#111111] hover:bg-[#B69A62] hover:text-[#FFFFFF] text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 shadow-xl"
            >
              Explore The Project
            </Link>

            <Link
              to="/lookbook"
              className="px-8 py-3.5 bg-transparent text-[#FFFFFF] border border-white/40 hover:border-[#B69A62] hover:text-[#B69A62] text-xs uppercase tracking-[0.25em] font-medium backdrop-blur-sm transition-all duration-300"
            >
              Atelier Lookbook
            </Link>
          </div>

        </div>

      </div>

    </section>
  );
};
