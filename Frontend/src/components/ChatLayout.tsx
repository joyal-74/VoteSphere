import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useRoom } from "../hooks/useRoom";
import Navbar from "./Navbar";


const ChatLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { rooms } = useRoom();

    return (
        <div className="h-screen bg-surface-950 text-surface-50 flex flex-col overflow-hidden">
            {/* Navbar stays at the top */}
            <Navbar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            {/* This container manages the Sidebar + Main relationship */}
            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    rooms={rooms}
                />

                {/* Main section: flex-1 tells it to take ALL available width */}
                <main className="flex-1 flex flex-col min-w-0 bg-surface-950 relative overflow-y-auto">
                    <Outlet context={{ setIsSidebarOpen }} />
                </main>

                {/* Mobile Backdrop */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default ChatLayout;