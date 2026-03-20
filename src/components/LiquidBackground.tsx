import React from 'react';
import { useTheme } from './ThemeProvider';

const LiquidBackground = () => {
    const { theme } = useTheme();
    const isLightMode = theme === 'light';

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Primary Blob */}
            <div className={`
        absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob
        ${isLightMode ? 'bg-blue-300' : 'bg-blue-900'}
      `}></div>

            {/* Secondary Blob */}
            <div className={`
        absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob animation-delay-2000
        ${isLightMode ? 'bg-cyan-300' : 'bg-indigo-900'}
      `}></div>

            {/* Tertiary Blob */}
            <div className={`
        absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob animation-delay-4000
        ${isLightMode ? 'bg-purple-300' : 'bg-violet-900'}
      `}></div>

            {/* Glass Overlay for granularity */}
            <div className="absolute inset-0 bg-transparent bg-opacity-20 backdrop-blur-[1px]"></div>
        </div>
    );
};

export default LiquidBackground;
