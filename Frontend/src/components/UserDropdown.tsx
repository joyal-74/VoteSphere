import { useState, useRef, useEffect } from "react";
import { LogOut, ChevronDown, UserIcon } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

interface UserDropdownProps {
    username?: string;
}

const UserDropdown = ({username} : UserDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { handleLogout } = useAuth();

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const onLogoutClick = async () => {
        setIsOpen(false);
        await handleLogout();
    };

    return (
        <div className="relative" ref={containerRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 p-1 pr-3 rounded-full bg-surface-800 border transition-all hover:bg-surface-700 ${
                    isOpen ? 'border-primary-500/50 ring-4 ring-primary-500/10' : 'border-white/10'
                }`}
            >
                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-primary-500/20 to-accent-500/20 flex items-center justify-center border border-white/10 text-primary-400">
                    <UserIcon size={18} />
                </div>
                <ChevronDown size={14} className={`text-surface-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-surface-900 border border-white/10 rounded-2xl shadow-2xl py-2 z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/5 bg-white/2">
                        <p className="text-sm text-white truncate font-medium mt-1">{username}</p>
                    </div>

                    <div className="p-1">

                        <button 
                            onClick={onLogoutClick}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;