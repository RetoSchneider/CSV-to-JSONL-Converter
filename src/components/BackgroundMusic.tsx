import { useState, useRef, useEffect } from 'react';
import './BackgroundMusic.css';

interface BackgroundMusicProps {
  audioSrc: string;
  initialMuted?: boolean;
}

const BackgroundMusic = ({ audioSrc, initialMuted = true }: BackgroundMusicProps) => {
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;

      const playAttempt = audioRef.current.play();
      if (playAttempt !== undefined) {
        playAttempt
          .then(() => {
            setIsPlaying(true);
            if (initialMuted) {
              audioRef.current!.muted = true;
            }
          })
          .catch(error => {
            console.log('Autoplay prevented:', error);
            setIsPlaying(false);
          });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [initialMuted, audioSrc]);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);

      if (!newMutedState && !isPlaying) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(error => console.log('Play prevented:', error));
      }
    }
  };

  return (
    <div className="retro-music-controls">
      <audio ref={audioRef} src={audioSrc} preload="auto" />
      <div
        className={`retro-visualizer ${!isMuted && isPlaying ? 'active' : ''}`}
        aria-hidden="true"
      >
        <div className="visualizer-bar"></div>
        <div className="visualizer-bar"></div>
        <div className="visualizer-bar"></div>
        <div className="visualizer-bar"></div>
        <div className="visualizer-bar"></div>
        <div className="visualizer-bar"></div>
        <div className="visualizer-bar"></div>
      </div>
      <button
        onClick={toggleMute}
        className="retro-music-button"
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
        title={isMuted ? 'Unmute background music' : 'Mute background music'}
      >
        <span role="img" aria-hidden="true">
          {isMuted ? '🔇' : '🔊'}
        </span>
        <span className="retro-music-label">{isMuted ? 'Music Off' : 'Music On'}</span>
      </button>
    </div>
  );
};

export default BackgroundMusic;
