import { BarChart3, Check, Send, Pencil } from "lucide-react";
import ActionBanner from "./ActionBanner";

const ChatInput = ({ text, onChange, onSend, editingMessage, replyTo, onCancel, onTogglePoll }: any) => {
    const isBannerActive = !!(editingMessage || replyTo);

    return (
        <div className="p-4 bg-surface-950 shrink-0 border-t border-white/5">
            <div className="max-w-6xl mx-auto flex flex-col">
                {editingMessage && <ActionBanner type="Editing" content={editingMessage.content} onCancel={onCancel} icon={Pencil} />}
                {replyTo && !editingMessage && <ActionBanner type={`Replying to ${replyTo.username}`} content={replyTo.content} onCancel={onCancel} />}

                <div className={`flex items-center gap-2 bg-surface-900 p-2 border border-white/5 shadow-2xl transition-all ${isBannerActive ? 'rounded-b-2xl border-t-0' : 'rounded-2xl'}`}>
                    <button onClick={onTogglePoll} className="p-2.5 rounded-xl bg-surface-800 hover:bg-surface-700 text-surface-400"><BarChart3 size={18} /></button>
                    <input autoFocus value={text} onChange={(e) => onChange(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onSend()} placeholder="Type something..." className="flex-1 bg-transparent px-2 py-1 text-sm outline-none text-white" />
                    <button onClick={onSend} disabled={!text.trim()} className="p-2.5 rounded-xl bg-primary-500 text-white disabled:opacity-30">
                        {editingMessage ? <Check size={18} /> : <Send size={18} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;