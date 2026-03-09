import React, { useState } from "react";
import { X, Plus, Trash2, BarChart3, } from "lucide-react";

interface PollModalProps {
    isOpen: boolean;
    roomId: string;
    userId: string;
    onClose: () => void;
    onLaunch: (data: any, userId : string) => void;
}

const CreatePollModal: React.FC<PollModalProps> = ({ isOpen, roomId, userId, onClose, onLaunch }) => {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);

    const handleSubmit = () => {
        // 1. Double check validation with trimming
        const trimmedQuestion = question.trim();
        const validOptions = options.map(opt => opt.trim()).filter(opt => opt !== "");

        if (!trimmedQuestion || validOptions.length < 2) return;

        const pollData = {
            roomId: roomId,
            question: question.trim(),
            options: options.map(opt => ({ text: opt.trim() }))
        };

        onLaunch(pollData, userId);
        handleResetAndClose();
    };

    const handleResetAndClose = () => {
        setQuestion("");
        setOptions(["", ""]);
        onClose();
    };

    const addOption = () => {
        if (options.length < 6) {
            setOptions([...options, ""]);
        }
    };

    const removeOption = (index: number) => {
        if (options.length > 2) {
            const newOptions = options.filter((_, i) => i !== index);
            setOptions(newOptions);
        }
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-surface-950/80 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-md bg-surface-900 border border-white/10 rounded-container shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-400">
                            <BarChart3 size={22} />
                        </div>
                        <h2 className="text-xl font-bold text-white tracking-tight">Create Poll</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-surface-800 rounded-full text-surface-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="px-8 py-4 space-y-6">

                    {/* Question Input */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-surface-500 uppercase tracking-widest ml-1">
                            Your Question
                        </label>
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="What are we voting on?"
                            className="w-full bg-surface-800 border border-white/5 rounded-2xl px-5 py-4 text-sm text-white outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/50 transition-all placeholder:text-surface-600"
                        />
                    </div>

                    {/* Options List */}
                    <div className="space-y-3">
                        <label className="text-[11px] font-bold text-surface-500 uppercase tracking-widest ml-1">
                            Poll Options
                        </label>

                        <div className="space-y-3 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
                            {options.map((option, index) => (
                                <div key={index} className="flex items-center gap-3 group">
                                    <div className="flex-1 relative flex items-center">
                                        <span className="absolute left-4 text-[10px] font-bold text-surface-600">
                                            {index + 1}
                                        </span>
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                            placeholder={`Option ${index + 1}`}
                                            className="w-full bg-surface-800/50 border border-white/5 rounded-xl pl-9 pr-4 py-3 text-sm text-white outline-none focus:bg-surface-800 focus:border-primary-500/30 transition-all"
                                        />
                                    </div>

                                    {options.length > 2 && (
                                        <button
                                            onClick={() => removeOption(index)}
                                            className="p-2.5 text-surface-500 hover:text-accent-400 hover:bg-accent-400/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {options.length < 6 && (
                            <button
                                onClick={addOption}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/10 text-surface-400 hover:text-primary-400 hover:border-primary-400/50 hover:bg-primary-400/5 transition-all text-sm font-medium"
                            >
                                <Plus size={16} />
                                Add Option
                            </button>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-8 bg-surface-950/50 border-t border-white/5 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3.5 rounded-2xl text-sm font-bold text-surface-400 hover:text-white hover:bg-surface-800 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={!question.trim() || options.filter(opt => opt.trim() !== "").length < 2}
                        onClick={handleSubmit}
                        className="flex-1 py-3.5 rounded-2xl bg-linear-to-r from-primary-500 to-primary-600 text-white text-sm font-bold shadow-lg shadow-primary-500/20 hover:opacity-90 disabled:opacity-30 disabled:shadow-none transition-all active:scale-95"
                    >
                        Launch Poll
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePollModal;