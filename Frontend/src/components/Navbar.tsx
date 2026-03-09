import React from "react";
import { Menu, X } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

interface NavbarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, toggleSidebar }) => {

    const user = useSelector((state : RootState) => state.auth.user);

    return (
        <nav className="h-16 border-b border-white/5 bg-surface-900 px-6 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <button 
                    className="p-2 hover:bg-surface-800 rounded-xl md:hidden text-surface-400 transition-colors" 
                    onClick={toggleSidebar}
                >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                <h2 className="font-bold text-2xl bg-linear-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent tracking-tighter">
                    VoteSphere
                </h2>
            </div>

            <div className="flex items-center gap-4">
                <UserDropdown username={user?.username} />
            </div>
        </nav>
    );
};

export default Navbar;