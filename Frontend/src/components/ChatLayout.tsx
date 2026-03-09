import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useRoom } from "../hooks/useRoom";

const ChatLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { rooms } = useRoom();

    return (
        <div className="h-screen bg-surface-950 text-surface-50 flex overflow-hidden font-sans selection:bg-primary-500/30">
            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
                rooms={rooms} 
            />

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden animate-in fade-in duration-300 backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <main className="flex-1 flex flex-col min-w-0 bg-surface-950 relative">
                <Outlet context={{ setIsSidebarOpen }} />
            </main>
        </div>
    );
};

export default ChatLayout;