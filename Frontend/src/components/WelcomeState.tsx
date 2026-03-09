import React from "react";
import { ShieldCheck, MessageSquare, Menu, Lock } from "lucide-react";

interface WelcomeStateProps {
    onToggleSidebar: () => void;
}

const WelcomeState: React.FC<WelcomeStateProps> = ({ onToggleSidebar }) => {
    return (
        <section className="flex-1 flex flex-col min-w-0 bg-surface-950 relative">
            {/* Header - Matching ChatArea height */}
            <header className="h-16 md:h-20 shrink-0 border-b border-white/5 flex items-center px-4 md:px-8 bg-surface-900/30 backdrop-blur-md">
                <button 
                    className="p-2 -ml-2 hover:bg-surface-800 rounded-xl md:hidden text-surface-400" 
                    onClick={onToggleSidebar}
                >
                    <Menu size={24} />
                </button>
                <div className="flex items-center gap-3 ml-2">
                    <div className="w-10 h-10 rounded-2xl bg-surface-800 flex items-center justify-center text-surface-500 border border-white/5">
                        <MessageSquare size={20} />
                    </div>
                    <h3 className="font-bold text-surface-400 text-base md:text-lg">Select a Conversation</h3>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="max-w-sm space-y-6 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary-500/20">
                        <ShieldCheck size={40} className="text-primary-400" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-white">Your messages are private</h2>
                        <p className="text-surface-500 text-sm leading-relaxed">
                            Select a room from the sidebar to start a secure discussion. All polls and messages are protected with session-based encryption.
                        </p>
                    </div>
                </div>
            </div>

            {/* Security Footer Component */}
            <footer className="p-8 flex justify-center">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-900/50 border border-white/5 text-[10px] font-bold text-surface-600 uppercase tracking-[0.2em]">
                    <Lock size={12} className="text-primary-500/50" />
                    End-to-End Encryption Active
                </div>
            </footer>
        </section>
    );
};

export default WelcomeState;