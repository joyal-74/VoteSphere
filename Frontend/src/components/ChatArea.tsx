import React, { useMemo, useState } from "react";
import { Send, BarChart3, Reply, X, Check, Pencil } from "lucide-react";
import MessageDropdown from "./MessageDropdown";

interface ChatAreaProps {
    room: any;
    currentUser: { id: string; username: string } | null;
    messages: any[];
    messageText: string;
    replyTo: any | null;
    setReplyTo: (msg: any | null) => void;
    editingMessage: any | null;
    onStartEditing: (msg: any) => void;
    onCancelAction: () => void;
    typingUser: string | null;
    scrollRef: React.RefObject<HTMLDivElement | null>;
    onTogglePollModal: () => void;
    onSendMessage: () => void;
    onInputChange: (val: string) => void;
    onVote?: (pollId: string, optionId: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
    room,
    currentUser,
    messages,
    messageText,
    replyTo,
    setReplyTo,
    editingMessage,
    onStartEditing,
    onCancelAction,
    typingUser,
    scrollRef,
    onTogglePollModal,
    onSendMessage,
    onInputChange,
    onVote
}) => {
    const [menuData, setMenuData] = useState<{ msg: any, x: number, y: number } | null>(null);

    const roomTitle = room.title;
    const roomInitial = room.title.charAt(0).toUpperCase();

    const combinedStream = useMemo(() => {
        const currentMessages = messages || [];
        const currentPolls = room?.polls || [];

        const allItems = [
            ...currentMessages.map(m => ({ ...m, streamType: 'message' })),
            ...currentPolls.map((p: any) => ({ ...p, streamType: 'poll' }))
        ];

        return allItems.sort((a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

    }, [messages, room.polls]);

    const handleMessageClick = (e: React.MouseEvent, item: any) => {
        if (item.streamType === 'poll') return;
        e.stopPropagation();
        e.preventDefault();
        setMenuData({ msg: item, x: e.clientX, y: e.clientY });
    };

    const canEditMessage = (createdAt: string | Date) => {
        const messageTime = new Date(createdAt).getTime();
        const currentTime = new Date().getTime();
        const FIVE_MINUTES = 5 * 60 * 1000;
        return (currentTime - messageTime) < FIVE_MINUTES;
    };

    const handleAction = (action: 'reply' | 'edit' | 'delete') => {
        if (!menuData) return;
        if (action === 'reply') setReplyTo(menuData.msg);
        if (action === 'edit') onStartEditing(menuData.msg);
        setMenuData(null);
    };

    return (
        <section className="flex-1 flex flex-col min-w-0 bg-surface-950 relative h-full overflow-hidden">
            {/* 1. Header */}
            <header className="h-16 shrink-0 border-b border-white/5 flex items-center justify-between px-4 md:px-6 bg-surface-900/30 backdrop-blur-md z-10">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary-500 to-primary-600 flex items-center justify-center font-bold text-white shadow-lg shrink-0">{roomInitial}</div>
                    <div className="min-w-0">
                        <h3 className="font-bold text-white text-sm md:text-base truncate leading-tight">{roomTitle}</h3>
                        <div className="flex items-center gap-1.5 text-surface-400">
                            <p className="text-[10px] font-medium tracking-wide">{room.users.length} Members</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. Chat Timeline Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-1 custom-scrollbar flex flex-col">
                {combinedStream.map((item, index) => {
                    const isMe = (item.userId || item.createdBy) === currentUser?.id;
                    const isPoll = item.streamType === 'poll';
                    const isSameUserAsPrev = index > 0 && (combinedStream[index - 1].userId || combinedStream[index - 1].createdBy) === (item.userId || item.createdBy);
                    const isSelected = !isPoll && menuData?.msg?.id === (item.id || item._id);

                    const repliedMessage = !isPoll && item.parentMessageId
                        ? messages.find(m => (m.id === item.parentMessageId || m._id === item.parentMessageId))
                        : null;

                    return (
                        <div key={item.id} className={`flex w-full animate-in fade-in duration-300 ${isMe ? 'justify-end' : 'justify-start'} ${isSameUserAsPrev ? 'mt-0.5' : 'mt-4'}`}>
                            <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                                {!isMe && !isSameUserAsPrev && !isPoll && (
                                    <span className="text-[10px] font-bold text-primary-400/80 uppercase ml-3 mb-1">
                                        {item.username}
                                    </span>
                                )}

                                <div className={`flex items-end gap-2 group ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                    {isPoll ? (
                                        <div className={`
                                            border p-4 shadow-xl w-70 md:w-[320px] text-white rounded-2xl animate-in fade-in zoom-in-95 duration-300
                                            ${isMe
                                                ? 'bg-primary-600/10 border-primary-500/30 rounded-tr-none'
                                                : 'bg-surface-900 border-white/10 rounded-tl-none'}
                                             `}>
                                            <div className="flex items-center gap-2 text-primary-400 mb-3">
                                                <BarChart3 size={16} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Poll</span>
                                            </div>

                                            <h4 className="text-[15px] font-bold leading-snug mb-4">{item.question}</h4>

                                            <div className="space-y-2.5">
                                                {item.options.map((option: any) => {
                                                    const totalVotes = item.votedUserIds?.length || 0;
                                                    const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                                                    const hasVoted = item.votedUserIds?.includes(currentUser?.id);

                                                    return (
                                                        <div key={option.id} className="relative group">
                                                            <button
                                                                disabled={!item.isActive || hasVoted}
                                                                onClick={() => onVote?.(item.id, option.id)}
                                                                className={`w-full relative overflow-hidden h-11 rounded-xl border transition-all flex items-center px-4 ${hasVoted
                                                                    ? 'border-transparent bg-white/5 cursor-default'
                                                                    : 'border-white/10 hover:border-primary-500/50 hover:bg-primary-500/5'
                                                                    }`}
                                                            >
                                                                {/* Progress Bar Background */}
                                                                {hasVoted && (
                                                                    <div
                                                                        className="absolute inset-y-0 left-0 bg-primary-500/20 transition-all duration-1000 ease-out"
                                                                        style={{ width: `${percentage}%` }}
                                                                    />
                                                                )}

                                                                {/* Option Text and Stats */}
                                                                <div className="relative z-10 w-full flex justify-between items-center">
                                                                    <span className="text-sm font-medium truncate pr-2">
                                                                        {option.text}
                                                                    </span>

                                                                    {hasVoted && (
                                                                        <div className="flex flex-col items-end shrink-0">
                                                                            <span className="text-[10px] font-bold text-primary-400 leading-none">
                                                                                {percentage}%
                                                                            </span>
                                                                            <span className="text-[8px] text-surface-500 font-bold mt-0.5">
                                                                                {option.votes} {option.votes === 1 ? 'vote' : 'votes'}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[9px] text-surface-500 font-bold uppercase tracking-wider">
                                                <span>{item.votedUserIds?.length || 0} Total Votes</span>
                                                <span className="opacity-60 font-medium lowercase">
                                                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        /* --- ORIGINAL MESSAGE BUBBLE LOGIC --- */
                                        <div
                                            onClick={(e) => handleMessageClick(e, item)}
                                            className={`relative px-2 py-2 rounded-2xl shadow-sm border cursor-pointer transition-all min-w-0 outline-none ${isSelected ? 'scale-[1.02]' : ''} ${isMe ? 'bg-primary-600 text-white border-primary-500 rounded-tr-none' : 'bg-surface-900 text-surface-50 border-white/5 rounded-tl-none'}`}
                                        >
                                            {repliedMessage && (
                                                <div className={`mb-1.5 flex flex-col border-l-2 rounded-md px-2 py-1 text-xs ${isMe ? 'bg-black/20 border-white/40' : 'bg-black/30 border-primary-500/80'}`}>
                                                    <span className={`font-bold text-[10px] ${isMe ? 'text-primary-100' : 'text-primary-400'}`}>{repliedMessage.username}</span>
                                                    <p className="truncate opacity-70 italic text-[11px]">{repliedMessage.content}</p>
                                                </div>
                                            )}
                                            <div className="relative">
                                                <span className="text-sm md:text-[15px] leading-relaxed whitespace-pre-wrap wrap-break-words pr-1">{item.content}</span>
                                                <span className="inline-flex items-center gap-1 ml-2 align-baseline translate-y-0.5 opacity-60 select-none">
                                                    {item.editedAt && <span className="text-[9px] italic">edited</span>}
                                                    <span className="text-[9px] font-medium uppercase whitespace-nowrap">{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {!isPoll && (
                                        <button onClick={(e) => { e.stopPropagation(); setReplyTo(item); }} className="p-1.5 text-surface-500 hover:text-primary-400 hover:bg-surface-800 rounded-full opacity-0 group-hover:opacity-100 transition-all shrink-0 mb-1"><Reply size={14} /></button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
                {typingUser && (
                    <div className="flex flex-col items-start mt-4 animate-in fade-in slide-in-from-left-2">
                        <span className="text-[10px] font-bold text-primary-400/80 uppercase ml-3 mb-1">
                            {typingUser} is typing
                        </span>
                        <div className="bg-surface-900/50 border border-white/5 px-4 py-2 rounded-2xl rounded-tl-none flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                )}
            </div>

            {/* 3. Footer */}
            <div className="p-4 bg-surface-950 shrink-0 border-t border-white/5">
                <div className="max-w-6xl mx-auto flex flex-col">
                    {editingMessage && (
                        <div className="flex items-center justify-between bg-primary-500/10 border-l-4 border-primary-500 p-3 rounded-t-xl animate-in slide-in-from-bottom-2">
                            <div className="min-w-0 flex-1">
                                <p className="text-[10px] font-bold text-primary-400 uppercase flex items-center gap-1"><Pencil size={10} /> Editing</p>
                                <p className="text-xs text-surface-400 truncate">{editingMessage.content}</p>
                            </div>
                            <button onClick={onCancelAction} className="p-1 text-surface-500 hover:text-white"><X size={16} /></button>
                        </div>
                    )}
                    {replyTo && !editingMessage && (
                        <div className="flex items-center justify-between bg-surface-900 border-l-4 border-primary-500 p-3 rounded-t-xl animate-in slide-in-from-bottom-2">
                            <div className="min-w-0 flex-1">
                                <p className="text-[10px] font-bold text-primary-400 uppercase">Replying to {replyTo.username}</p>
                                <p className="text-xs text-surface-400 truncate">{replyTo.content}</p>
                            </div>
                            <button onClick={() => setReplyTo(null)} className="p-1 text-surface-500 hover:text-white"><X size={16} /></button>
                        </div>
                    )}
                    <div className={`flex items-center gap-2 bg-surface-900 p-2 border border-white/5 shadow-2xl ${(replyTo || editingMessage) ? 'rounded-b-2xl' : 'rounded-2xl'}`}>
                        <button onClick={onTogglePollModal} className="p-2.5 rounded-xl bg-surface-800 hover:bg-surface-700 text-surface-400 shrink-0 transition-colors"><BarChart3 size={18} /></button>
                        <input type="text" autoFocus value={messageText} onChange={(e) => onInputChange(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onSendMessage()} placeholder={editingMessage ? "Save changes..." : "Type your message..."} className="flex-1 bg-transparent border-none px-2 py-1 text-sm outline-none text-white placeholder:text-surface-500" />
                        <div className="flex items-center gap-1">
                            <button onClick={onSendMessage} disabled={!messageText.trim()} className="p-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white disabled:opacity-30 transition-all active:scale-95">
                                {editingMessage ? <Check size={18} /> : <Send size={18} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {menuData && (
                <MessageDropdown
                    x={menuData.x} y={menuData.y}
                    canEdit={canEditMessage(menuData.msg.createdAt)}
                    isMine={menuData.msg.userId === currentUser?.id}
                    onClose={() => setMenuData(null)}
                    onAction={handleAction}
                />
            )}
        </section>
    );
};

export default ChatArea;