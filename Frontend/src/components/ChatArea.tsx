import React, { useMemo, useState } from "react";
import { Reply } from "lucide-react";
import MessageDropdown from "./MessageDropdown";
import ChatInput from "./chat/ChatInput";
import ChatHeader from "./chat/ChatHeader";
import MessageRow from "./chat/MessageRow";
import PollBubble from "./chat/PollBubble";
import MessageBubble from "./chat/MessageBubble";
import TypingIndicator from "./chat/TypingIndicator";

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
    onVote: (pollId: string, optionId: string) => void;
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
        <section className="flex-1 flex flex-col bg-surface-950 relative h-full overflow-hidden">
            <ChatHeader title={room.title} userCount={room.users.length} />

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-1 custom-scrollbar flex flex-col">
                {combinedStream.map((item, index) => {
                    // 1. Calculate logic for this specific iteration
                    const itemId = item.id || item._id;
                    const isMe = (item.userId || item.createdBy) === currentUser?.id;
                    const isPoll = item.streamType === 'poll';
                    const isSelected = !isPoll && menuData?.msg?.id === itemId;

                    const isSameUserAsPrev = index > 0 &&
                        (combinedStream[index - 1].userId || combinedStream[index - 1].createdBy) ===
                        (item.userId || item.createdBy);

                    // Find replied message context if it exists
                    const repliedMessage = !isPoll && item.parentMessageId
                        ? messages.find(m => (m.id === item.parentMessageId || m._id === item.parentMessageId))
                        : null;

                    return (
                        <MessageRow
                            key={item.id || item._id || index}
                            item={item}
                            isMe={isMe}
                            isSameUserAsPrev={isSameUserAsPrev}
                        >
                            {isPoll ? (
                                <PollBubble
                                    poll={item}
                                    isMe={isMe}
                                    currentUserId={currentUser?.id}
                                    onVote={onVote}
                                />
                            ) : (
                                <div className={`flex items-end gap-2 group ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <MessageBubble
                                        item={item}
                                        isMe={isMe}
                                        isSelected={isSelected}
                                        repliedMessage={repliedMessage}
                                        onClick={(e: any) => handleMessageClick(e, item)}
                                    />

                                    <button
                                        onClick={(e) => { e.stopPropagation(); setReplyTo(item); }}
                                        className="p-1.5 text-surface-500 hover:text-primary-400 hover:bg-surface-800 rounded-full opacity-0 group-hover:opacity-100 transition-all shrink-0 mb-1"
                                    >
                                        <Reply size={14} />
                                    </button>
                                </div>
                            )}
                        </MessageRow>
                    );
                })}

                {typingUser && <TypingIndicator username={typingUser} />}
            </div>

            <ChatInput
                text={messageText}
                onChange={onInputChange}
                onSend={onSendMessage}
                editingMessage={editingMessage}
                replyTo={replyTo}
                onCancel={onCancelAction}
                onTogglePoll={onTogglePollModal}
            />

            {menuData && (
                <MessageDropdown
                    x={menuData.x}
                    y={menuData.y}
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