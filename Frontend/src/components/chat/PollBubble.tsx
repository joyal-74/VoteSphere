import { BarChart3 } from "lucide-react";
import PollOption from "./PollOption";

const PollBubble = ({ poll, isMe, currentUserId, onVote }: any) => {
    const totalVotes = poll.votedUserIds?.length || 0;
    const hasVoted = poll.votedUserIds?.includes(currentUserId);
    const userVote = poll.votes?.find((v: any) => v.userId === currentUserId);
    const userVoteOptionId = userVote ? (userVote.optionId || userVote._id) : null;

    return (
        <div className={`border p-4 shadow-xl w-70 md:w-[320px] text-white rounded-2xl animate-in fade-in zoom-in-95 duration-300 
        bg-surface-900/90 backdrop-blur-sm border-white/10 ${isMe ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
            <div className="flex items-center gap-2 text-primary-400 mb-3">
                <BarChart3 size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Poll</span>
            </div>
            <h4 className="text-[15px] font-bold mb-4">{poll.question}</h4>
            <div className="space-y-2.5">
                {poll.options.map((option: any) => {
                    const oId = option.id || option._id;
                    return (
                        <PollOption
                            key={oId}
                            option={option}
                            isUserChoice={!!userVoteOptionId && oId === userVoteOptionId}
                            totalVotes={poll.votedUserIds?.length || 0}
                            isActive={poll.isActive}
                            hasVoted={hasVoted}
                            onVote={() => onVote(poll.id || poll._id, oId)}
                        />
                    );
                })}
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] text-surface-500 font-bold uppercase tracking-wider">
                <span>{totalVotes} {totalVotes === 1 ? 'Vote' : 'Votes'}</span>
                <span className="opacity-60 font-medium lowercase">
                    {new Date(poll.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    );
};

export default PollBubble;