import MessageMeta from "./MessageMeta";
import ReplyPreview from "./ReplyPreview";

const MessageBubble = ({ item, isMe, isSelected, repliedMessage, onClick }: any) => (
    <div
        onClick={onClick}
        className={`relative px-2 py-2 rounded-2xl shadow-sm border cursor-pointer transition-all ${isSelected ? 'scale-[1.02]' : ''} ${isMe ? 'bg-primary-600 text-white border-primary-500 rounded-tr-none' : 'bg-surface-900 text-surface-50 border-white/5 rounded-tl-none'}`}
    >
        {repliedMessage && <ReplyPreview message={repliedMessage} isMe={isMe} />}
        <div className="relative">
            <span className="text-sm md:text-[15px] whitespace-pre-wrap">{item.content}</span>
            <MessageMeta item={item} />
        </div>
    </div>
);

export default MessageBubble;