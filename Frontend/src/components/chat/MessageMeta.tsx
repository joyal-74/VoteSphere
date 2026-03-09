const MessageMeta = ({ item }: { item: any }) => (
    <span className="inline-flex items-center gap-1 ml-2 align-baseline translate-y-0.5 opacity-60 select-none">
        {item.editedAt && <span className="text-[9px] italic">edited</span>}
        <span className="text-[9px] font-medium uppercase whitespace-nowrap">
            {new Date(item.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })}
        </span>
    </span>
);

export default MessageMeta;