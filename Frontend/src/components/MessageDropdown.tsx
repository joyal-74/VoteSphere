import React from "react";
import { Reply, Pencil, Trash2 } from "lucide-react";

interface MessageDropdownProps {
    x: number;
    y: number;
    onClose: () => void;
    onAction: (action: 'reply' | 'edit' | 'delete') => void;
    isMine: boolean;
    canEdit: boolean;
}

const MessageDropdown: React.FC<MessageDropdownProps> = ({ x, y, onClose, onAction, isMine, canEdit }) => {
    // Determine if the menu should open upwards if too close to the bottom
    const openUpwards = y > window.innerHeight - 200;

    return (
        <>
            {/* Transparent overlay to close on click outside */}
            <div className="fixed inset-0 z-40" onClick={onClose} />

            <div
                className="fixed z-50 w-48 bg-surface-900 border border-white/10 rounded-xl shadow-2xl py-1 animate-in fade-in zoom-in-95 duration-100"
                style={{
                    top: openUpwards ? 'auto' : y,
                    bottom: openUpwards ? (window.innerHeight - y) : 'auto',
                    left: Math.min(x, window.innerWidth - 200) // Prevent going off-screen
                }}
            >
                <button
                    onClick={() => onAction('reply')}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-surface-300 hover:bg-primary-500/10 hover:text-primary-400 transition-colors"
                >
                    <Reply size={16} />
                    <span>Reply</span>
                </button>

                {isMine && (
                    <>
                        {canEdit && (
                            <button
                                onClick={() => onAction('edit')}
                                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-surface-300 hover:bg-primary-500/10 hover:text-primary-400 transition-colors"
                            >
                                <Pencil size={16} />
                                <span>Edit</span>
                            </button>
                        )}

                        <div className="h-px bg-white/5 my-1" />

                        <button
                            onClick={() => onAction('delete')}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                            <Trash2 size={16} />
                            <span>Delete</span>
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default MessageDropdown;