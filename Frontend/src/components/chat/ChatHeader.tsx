const ChatHeader = ({ title, userCount }: { title: string; userCount: number }) => {
    const initial = title.charAt(0).toUpperCase();
    return (
        <header className="h-16 shrink-0 border-b border-white/5 flex items-center justify-between px-4 md:px-6 bg-surface-900/30 backdrop-blur-md z-10">
            <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary-500 to-primary-600 flex items-center justify-center font-bold text-white shadow-lg shrink-0">
                    {initial}
                </div>
                <div className="min-w-0">
                    <h3 className="font-bold text-white text-sm md:text-base truncate leading-tight">{title}</h3>
                    <p className="text-[10px] font-medium tracking-wide text-surface-400">{userCount} Members</p>
                </div>
            </div>
        </header>
    );
};

export default ChatHeader;