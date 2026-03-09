const ReplyPreview = ({ message, isMe }: { message: any; isMe: boolean }) => (
    <div className={`mb-1.5 flex flex-col border-l-2 rounded-md px-2 py-1 text-xs 
    ${isMe ? 'bg-black/20 border-white/40' : 'bg-black/30 border-primary-500/80'}`}>
        <span className={`font-bold text-[10px] ${isMe ? 'text-primary-100' : 'text-primary-400'}`}>
            {message.username}
        </span>
        <p className="truncate opacity-70 italic text-[11px]">{message.content}</p>
    </div>
);

export default ReplyPreview;