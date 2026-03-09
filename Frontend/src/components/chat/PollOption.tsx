import { Check } from "lucide-react";

interface PollOptionProps {
    option: any;
    totalVotes: number;
    isActive: boolean;
    hasVoted: boolean;
    isUserChoice: boolean;
    onVote: () => void;
}

const PollOption = ({ option, totalVotes, isActive, hasVoted, isUserChoice, onVote }: PollOptionProps) => {
    const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;

    return (
        <div className="relative group">
            <button
                disabled={!isActive}
                onClick={onVote}
                className={`w-full relative overflow-hidden h-11 rounded-xl border transition-all flex items-center px-4 
                    ${isUserChoice
                        ? 'border-primary-500 bg-primary-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                        : 'border-white/10 hover:border-primary-500/50 hover:bg-primary-500/5'
                    } ${!hasVoted && 'bg-surface-900/40'}`}
            >
                {/* 1. Progress Bar - ALWAYS VISIBLE */}
                <div
                    className={`absolute inset-y-0 left-0 transition-all duration-1000 ease-out 
                        ${isUserChoice ? 'bg-primary-500/25' : 'bg-white/5'}`}
                    style={{ width: `${percentage}%` }}
                />

                <div className="relative z-10 w-full flex justify-between items-center">
                    <div className="flex items-center gap-2 truncate">
                        {/* Checkmark only for the user's actual selection */}
                        {isUserChoice && (
                            <Check size={14} className="text-primary-400 shrink-0 animate-in zoom-in duration-300" />
                        )}
                        <span className={`text-sm font-medium truncate ${isUserChoice ? 'text-primary-100' : 'text-surface-200'}`}>
                            {option.text}
                        </span>
                    </div>

                    {/* 2. Stats - ALWAYS VISIBLE */}
                    <div className="flex flex-col items-end shrink-0">
                        <span className={`text-[10px] font-bold leading-none ${isUserChoice ? 'text-primary-400' : 'text-surface-400'}`}>
                            {percentage}%
                        </span>
                        <span className="text-[8px] text-surface-500 font-bold mt-0.5">
                            {option.votes} {option.votes === 1 ? 'vote' : 'votes'}
                        </span>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default PollOption;