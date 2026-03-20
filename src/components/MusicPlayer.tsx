
import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showDialog, setShowDialog] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Check if user has already made a choice
    const musicPreference = localStorage.getItem('music-preference');
    if (musicPreference) {
      setShowDialog(false);
      setMusicEnabled(musicPreference === 'enabled');
    }
  }, []);

  useEffect(() => {
    // Set the volume programmatically
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  const handleMusicChoice = (choice: 'yes' | 'no') => {
    setMusicEnabled(choice === 'yes');
    localStorage.setItem('music-preference', choice === 'yes' ? 'enabled' : 'disabled');
    setShowDialog(false);
    
    if (choice === 'yes') {
      // Auto-play gentle background music
      setTimeout(() => {
        togglePlay();
      }, 500);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!musicEnabled) {
    return null;
  }

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Music className="h-5 w-5" />
              Background Music
            </DialogTitle>
            <DialogDescription>
              Would you like to enable gentle background music while browsing the portfolio?
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => handleMusicChoice('no')}>
              No, thanks
            </Button>
            <Button onClick={() => handleMusicChoice('yes')}>
              Yes, play music
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="fixed bottom-4 left-4 z-50 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlay}
          className="bg-background/80 backdrop-blur-sm border-2 hover:scale-110 transition-all duration-300"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMute}
          className="bg-background/80 backdrop-blur-sm border-2 hover:scale-110 transition-all duration-300"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
      </div>

      <audio
        ref={audioRef}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="https://www.soundjay.com/misc/sounds/soft-background-music.mp3" type="audio/mpeg" />
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUeByJ+zPDZjjwJGGS58OScShALTKXh8bllHQU5j9n0unEjBSF6yu/eizEIHWq+8+OZRA0PVqzn77BdGAg8ltryxnkpBSl+zfHajjkIGGe88OOdSxELTKLh8bllHQU5j9n0unEjBSF6yu/eizEIHWq+8+OZRA0PVqzn77BdGAg8ltryxnkpBSl+zfHajjkIGGe88OOdSxELTKLh8bllHQU5j9n0unEjBSF6yu/eizEIHWq+8+OZRA0PVqzn77BdGAg8ltryxnkpBSl+zfHajjkIGGe88OOdSxELTKLh8bllHQU5j9n0unEjBSF6yu/eizEIHWq+8+OZRA0PVqzn77BdGAg8ltryxnkpBSl+zfHajjkIGGe88OOdSxELTKLh8bllHQU5j9n0unEjBSF6yu/eizEIHWq+8+OZRA0PVqzn77BdGAg8ltryxnkpBSl+zfHajjkIGGe88OOdSxELTKLh8bllHQU5j9n0unEjBSF6yu/eizEIHWq+8+OZRA0PVqzn77BdGAg8ltryxnkpBSl+zfHajjkIGGe88OOdSxELTKLh8bllHQU5j9n0unEjBSF6yu/eizEIHWq+8+OZRA0PVqzn77BdGAg8ltryxnkpBSl+zfHajjkIGGe88OOdSxELTKLh8Q==" type="audio/wav" />
      </audio>
    </>
  );
};

export default MusicPlayer;
