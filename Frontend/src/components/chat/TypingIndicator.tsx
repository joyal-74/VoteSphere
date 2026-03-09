const TypingIndicator = ({ username }: { username: string }) => (
    <div className="flex flex-col items-start mt-4 animate-in fade-in slide-in-from-left-2">
        <span className="text-[10px] font-bold text-primary-400/80 uppercase ml-3 mb-1">
            {username} is typing
        </span>
        <div className="bg-surface-900/50 border border-white/5 px-4 py-2 rounded-2xl rounded-tl-none flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce"></span>
        </div>
    </div>
);

export default TypingIndicator;