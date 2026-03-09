import { Room } from "../../domain/entities/Room";
import { Poll } from "../../domain/entities/Poll";
import { PollMapper } from "./PollMapper";

export class RoomMapper {
    static toPersistence(room: Room) {
        const snapshot = room.getSnapshot();
        const pollEntities = room["_polls"];
        return {
            _id: snapshot.id,
            title: snapshot.title,
            createdBy: snapshot.createdBy,
            users: snapshot.users,
            polls: pollEntities.map(poll => PollMapper.toPersistence(poll)),
            createdAt: snapshot.createdAt,
        };
    }

    static toDomain(raw: any): Room {
        // 1. Rehydrate all polls from the array
        const polls = (raw.polls || []).map((p: any) =>
            Poll.rehydrate({
                id: p.id,
                question: p.question,
                isActive: p.isActive,
                createdAt: p.createdAt,
                createdBy: p.createdBy,
                options: p.options,
                votedUserIds: p.votedUserIds,
                votes: p.votes
            })
        );

        const room = new Room({
            id: raw._id,
            title: raw.title,
            createdBy: raw.createdBy,
            createdAt: raw.createdAt,
            polls: polls
        });

        raw.users?.forEach((userId: string) => {
            if (userId !== raw.createdBy) room.addUser(userId);
        });

        return room;
    }
}