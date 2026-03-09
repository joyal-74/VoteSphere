import { Poll } from "../../domain/entities/Poll.js";

export class PollMapper {
    static toPersistence(poll: Poll) {
        const snapshot = poll.getSnapshot();

        return {
            id: snapshot.id,
            question: snapshot.question,
            isActive: snapshot.isActive,
            createdAt: snapshot.createdAt,
            createdBy: snapshot.createdBy,
            options: snapshot.options.map(o => ({
                id: o.id,
                text: o.text,
                votes: o.votes
            })),
            votedUserIds: snapshot.votedUserIds,
            votes: snapshot.votes 
        };
    }

    static toDomain(raw: any): Poll {
        const poll = new Poll({
            id: raw.id || raw._id,
            question: raw.question,
            options: raw.options.map((o: any) => ({
                id: o.id || o._id,
                text: o.text
            })),
            createdAt: raw.createdAt,
            createdBy: raw.createdBy
        });

        if (raw.isActive !== undefined) {
            poll["_isActive"] = raw.isActive;
        }

        raw.votedUserIds?.forEach((userId: string) => {
            poll["_votedUserIds"].add(userId);
        });

        raw.votes?.forEach((v: { userId: string, optionId: string }) => {
            poll["_votes"].set(v.userId, v.optionId);
        });

        poll["_options"].forEach(option => {
            const savedOption = raw.options.find((o: any) => (o.id || o._id) === option.id);
            if (savedOption) {
                option.restoreVotes(savedOption.votes);
            }
        });

        return poll;
    }
}