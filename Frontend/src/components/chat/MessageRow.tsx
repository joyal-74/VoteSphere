interface MessageRowProps {
    item: any;
    isMe: boolean;
    isSameUserAsPrev: boolean;
    children: React.ReactNode;
}

const MessageRow: React.FC<MessageRowProps> = ({ item, isMe, isSameUserAsPrev, children }) => {
    return (
        <div className={`flex w-full animate-in fade-in duration-300 
      ${isMe ? 'justify-end' : 'justify-start'} 
      ${isSameUserAsPrev ? 'mt-0.5' : 'mt-4'}`}
        >
            <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                {!isMe && !isSameUserAsPrev && (
                    <span className="text-[10px] font-bold text-primary-400/80 uppercase ml-3 mb-1">
                        {item.username}
                    </span>
                )}

                <div className={`flex items-end gap-2 group ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MessageRow;