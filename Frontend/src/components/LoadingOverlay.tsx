import React from 'react';
import { Sparkles } from 'lucide-react';

const LoadingOverlay: React.FC = () => {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-surface-950/40 backdrop-blur-md rounded-container transition-all duration-300">
            <div className="relative flex flex-col items-center gap-4">
                {/* Glowing Orb Animation */}
                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-linear-to-tr from-primary-500 to-accent-400 animate-pulse blur-sm opacity-50 absolute inset-0" />
                    <div className="w-12 h-12 rounded-full bg-linear-to-tr from-primary-500 to-accent-400 flex items-center justify-center relative border border-white/20 shadow-lg shadow-primary-500/40">
                        <Sparkles size={20} className="text-white animate-bounce" />
                    </div>
                </div>
                
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-400">
                        Syncing
                    </span>
                    <div className="flex gap-1 mt-1">
                        <div className="w-1 h-1 rounded-full bg-primary-400/40 animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-1 h-1 rounded-full bg-primary-400/40 animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-1 h-1 rounded-full bg-primary-400/40 animate-bounce" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;