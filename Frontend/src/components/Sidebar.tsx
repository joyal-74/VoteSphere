import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { X, ChevronLeft } from "lucide-react";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    rooms: any[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, rooms }) => {
    const navigate = useNavigate();

    return (
        <aside className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-surface-900 border-r border-white/5 transition-transform duration-300 ease-in-out md:relative md:translate-x-0
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}>
            <div className="flex flex-col h-full">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h2 className="font-bold text-2xl bg-linear-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent tracking-tighter">
                        VoteSphere
                    </h2>
                    <button className="p-2 hover:bg-surface-800 rounded-xl md:hidden text-surface-400" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
                    <p className="px-4 text-[10px] font-bold text-surface-500 uppercase tracking-widest mb-2">My Channels</p>
                    {rooms?.map((room) => (
                        <NavLink
                            key={room.id}
                            to={`/rooms/${room.id}`}
                            onClick={onClose}
                            className={({ isActive }) => `
                w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group
                ${isActive
                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/10 font-semibold'
                                    : 'text-surface-400 hover:bg-surface-800 hover:text-surface-100'}
              `}
                        >
                            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-xs shrink-0 font-bold group-hover:scale-110 transition-transform">
                                {room.title?.charAt(0) ?? '?'}
                            </div>
                            <span className="truncate text-sm">{room.title ?? 'Unnamed Room'}</span>
                        </NavLink>
                    ))}
                </div>

                <div className="p-4 bg-surface-900/50 border-t border-white/5">
                    <button
                        onClick={() => navigate("/rooms")}
                        className="w-full flex items-center justify-center gap-2 text-surface-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest py-2"
                    >
                        <ChevronLeft size={14} />
                        Exit to Lobby
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;