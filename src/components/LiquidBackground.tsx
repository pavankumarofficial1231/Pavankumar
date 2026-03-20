import React from 'react';
import { useTheme } from './ThemeProvider';

const LiquidBackground = () => {
    const { theme } = useTheme();
    const isLightMode = theme === 'light';

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Primary Blob */}
            <div className={`
        absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full filter blur-[60px] opacity-15 animate-blob will-change-transform
        ${isLightMode ? 'bg-blue-300' : 'bg-blue-900'}
      `}></div>

            {/* Secondary Blob */}
            <div className={`
        absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full filter blur-[60px] opacity-15 animate-blob animation-delay-2000 will-change-transform
        ${isLightMode ? 'bg-cyan-300' : 'bg-indigo-900'}
      `}></div>

            {/* Tertiary Blob */}
            <div className={`
        absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] rounded-full filter blur-[60px] opacity-15 animate-blob animation-delay-4000 will-change-transform
        ${isLightMode ? 'bg-purple-300' : 'bg-violet-900'}
      `}></div>
        </div>
    );
};

export default LiquidBackground;
