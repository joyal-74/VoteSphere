import { Poll } from "../../domain/entities/Poll";

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
            votedUserIds: Array.from(poll["_votedUserIds"])
        };
    }

    static toDomain(raw: any): Poll {
        const poll = new Poll({
            id: raw._id,
            question: raw.question,
            options: raw.options.map((o: any) => ({
                id: o._id,
                text: o.text
            })),
            createdAt: raw.createdAt,
            createdBy : raw.createdBy
        });

        raw.votedUserIds?.forEach((userId: string) => {
            poll["_votedUserIds"].add(userId);
        });

        return poll;
    }
}