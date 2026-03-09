import { Message } from "../../domain/entities/Message.js";

export class MessageMapper {
    static toPersistence(message: Message) {
        const snapshot = message.getSnapshot();

        return {
            _id: snapshot.id,
            roomId: snapshot.roomId,
            userId: snapshot.userId,
            username: snapshot.username,
            content: snapshot.content,
            parentMessageId: snapshot.parentMessageId,
            createdAt: snapshot.createdAt,
            editedAt: snapshot.editedAt,
            isDeleted: snapshot.isDeleted
        };
    }

    static toDomain(raw: any): Message {
        return new Message({
            id: raw._id,
            roomId: raw.roomId,
            userId: raw.userId,
            username: raw.username,
            content: raw.content,
            parentMessageId: raw.parentMessageId,
            createdAt: raw.createdAt,
            isDeleted: raw.isDeleted,
            editedAt: raw.editedAt,
        });
    }
}