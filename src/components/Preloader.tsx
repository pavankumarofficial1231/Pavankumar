import React, { useEffect, useState } from 'react';

const BOOT_SEQUENCE = [
  "Initialize core framework.................. [OK]",
  "Loading neural pathways.................... [OK]",
  "Decrypting achievement logs................ [OK]",
  "Compiling technical skills................. [OK]",
  "Establishing secure connection............. [OK]"
];

const Preloader: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [glitchTitle, setGlitchTitle] = useState("01010000 01001011");

  useEffect(() => {
    // Terminal typing effect
    let currentLine = 0;
    
    // Add lines progressively
    const lineInterval = setInterval(() => {
      if (currentLine < BOOT_SEQUENCE.length) {
        setLines(prev => [...prev, BOOT_SEQUENCE[currentLine]]);
        currentLine++;
      } else {
        clearInterval(lineInterval);
      }
    }, 400);

    // Progress bar and loading speed
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 15 + 5;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
        
        // Glitch sequence for title reveal
        let glitchCount = 0;
        const finalTitle = "PAVAN KUMAR S";
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
        
        const glitchInterval = setInterval(() => {
          if (glitchCount > 15) {
            clearInterval(glitchInterval);
            setGlitchTitle(finalTitle);
            
            // Finish animation
            setTimeout(() => setIsFadingOut(true), 600);
            setTimeout(() => setIsVisible(false), 1400);
          } else {
            // Randomly generate hacking string
            const randomString = finalTitle.split('').map(c => 
              c === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]
            ).join('');
            setGlitchTitle(randomString);
            glitchCount++;
          }
        }, 50);
      }
      setProgress(Math.min(currentProgress, 100));
    }, 150);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
    };
  }, []);

  if (!isVisible) return null;

  // Create ASCII-style progress bar
  const totalBlocks = 20;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);
  const progressBar = "█".repeat(filledBlocks) + "▒".repeat(totalBlocks - filledBlocks);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#10b981', // Main terminal green
        fontFamily: "'Courier New', Courier, monospace",
        overflow: 'hidden',
        transition: 'opacity 0.8s ease, filter 0.8s ease',
        opacity: isFadingOut ? 0 : 1,
        filter: isFadingOut ? 'brightness(2) blur(10px)' : 'none',
        pointerEvents: isFadingOut ? 'none' : 'all',
      }}
    >
      {/* VCR / Scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.25) 50%)',
        backgroundSize: '100% 4px',
        zIndex: 10,
        opacity: 0.5
      }} />

      <div style={{ position: 'relative', zIndex: 20, width: '100%', maxWidth: '600px', padding: '0 20px' }}>
        
        {/* Header / Glitch text */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: 'clamp(32px, 6vw, 64px)', 
            fontWeight: 'bold', 
            letterSpacing: '4px',
            textShadow: '0 0 10px #10b981, 0 0 20px #10b981',
            margin: 0,
            color: '#10b981'
          }}>
            {glitchTitle}
          </h1>
          {progress === 100 && (
            <div style={{
              marginTop: '10px',
              color: '#3b82f6',
              fontSize: '14px',
              letterSpacing: '2px',
              animation: 'blink 1s step-end infinite',
              textShadow: '0 0 8px #3b82f6'
            }}>
              {'> SYSTEM.ACCESS_GRANTED_'}
            </div>
          )}
        </div>

        {/* Terminal Window */}
        <div style={{
          border: '1px solid #10b98140',
          backgroundColor: '#0a0a0a',
          padding: '20px',
          boxShadow: 'inset 0 0 20px rgba(16, 185, 129, 0.05)',
          borderRadius: '4px'
        }}>
          {/* Boot sequence logs */}
          <div style={{ minHeight: '120px', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px', color: '#10b981' }}>
            <div style={{ color: '#3b82f6', marginBottom: '10px' }}>root@pk-network:~# ./init_sequence.sh</div>
            {lines.map((line, i) => (
              <div key={i} style={{ animation: 'scan 0.5s ease-out' }}>
                <span style={{ color: '#64748b' }}>[{new Date().toISOString().split('T')[1].slice(0, 8)}]</span>{' '}
                {line}
              </div>
            ))}
            {lines.length < BOOT_SEQUENCE.length && (
              <div style={{ animation: 'blink 1s step-end infinite' }}>_</div>
            )}
          </div>

          {/* Progress Section */}
          <div style={{ borderTop: '1px dashed #10b98140', paddingTop: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
              <span>LOADING_DATA</span>
              <span>{Math.floor(progress)}%</span>
            </div>
            <div style={{ 
              fontSize: '16px', 
              letterSpacing: '2px', 
              color: progress === 100 ? '#3b82f6' : '#10b981',
              textShadow: progress === 100 ? '0 0 10px #3b82f6' : 'none'
            }}>
              [{progressBar}]
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes scan { 0% { opacity: 0; transform: translateY(-5px); } 100% { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Preloader;
