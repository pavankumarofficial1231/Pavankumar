import React, { useEffect, useRef } from 'react';

interface InstagramEmbedProps {
  url: string;
}

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

const InstagramEmbed: React.FC<InstagramEmbedProps> = ({ url }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize URL - strip query params and ensure no trailing slash
  const cleanUrl = url.split('?')[0].replace(/\/$/, '');

  useEffect(() => {
    const loadAndProcess = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      } else {
        const script = document.createElement('script');
        script.src = 'https://www.instagram.com/embed.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          if (window.instgrm) {
            window.instgrm.Embeds.process();
          }
        };
        document.body.appendChild(script);
      }
    };

    const timer = setTimeout(loadAndProcess, 100);
    return () => clearTimeout(timer);
  }, [url]);

  return (
    <div ref={containerRef} className="w-full flex justify-center overflow-auto">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={`${cleanUrl}/?utm_source=ig_embed&utm_campaign=loading`}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: '0',
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '1px',
          maxWidth: '540px',
          minWidth: '326px',
          padding: '0',
          width: 'calc(100% - 2px)',
        }}
      >
        <div style={{ padding: '16px' }}>
          <a
            href={`${cleanUrl}/?utm_source=ig_embed&utm_campaign=loading`}
            style={{ background: '#FFFFFF', lineHeight: 0, padding: '0', textAlign: 'center', textDecoration: 'none', width: '100%' }}
            target="_blank"
            rel="noreferrer"
          >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '40px', width: '40px', marginRight: '14px' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', height: '14px', marginBottom: '6px', width: '100px' }}></div>
                <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', height: '14px', width: '60px' }}></div>
              </div>
            </div>
            <div style={{ padding: '19% 0' }}></div>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '14px', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7z" fill="#C7C7C7"/>
                </svg>
              </div>
              <div style={{ color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 550, lineHeight: '18px' }}>View this post on Instagram</div>
            </div>
          </a>
        </div>
      </blockquote>
    </div>
  );
};

export default InstagramEmbed;
