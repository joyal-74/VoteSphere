import { Types } from "mongoose";
import { IMessageRepository } from "../../app/repositories/IMessageRepository.js";
import { Message } from "../../domain/entities/Message.js";
import { MessageModel } from "../database/models/MessageModel.js";
import { MessageMapper } from "../mappers/MessageMapper.js";

export class MessageRepository implements IMessageRepository {

    async create(message: Message): Promise<Message> {
        const snapshot = message.getSnapshot();

        const persistenceData = {
            roomId: snapshot.roomId,
            userId: new Types.ObjectId(snapshot.userId),
            username: snapshot.username,
            content: snapshot.content,
            parentMessageId: snapshot.parentMessageId || undefined,
            createdAt: new Date(),
            isDeleted: false
        };

        const createdDoc = await MessageModel.create(persistenceData);

        return MessageMapper.toDomain(createdDoc);
    }

    // MessageRepository.ts
    async save(message: Message): Promise<void> {
        const snapshot = message.getSnapshot(); 

        const updateData = {
            content: snapshot.content,
            editedAt: snapshot.editedAt,
            isDeleted: snapshot.isDeleted,
            parentMessageId: snapshot.parentMessageId
        };

        const result = await MessageModel.findByIdAndUpdate(
            snapshot.id,
            { $set: updateData },
            { new: true }
        );

        if (!result) {
            throw new Error("Failed to update message in database");
        }
    }

    async updateContent(messageId: string, content: string, editedAt: Date): Promise<void> {
    const result = await MessageModel.findByIdAndUpdate(
        messageId,
        { 
            $set: { 
                content: content, 
                editedAt: editedAt 
            } 
        }
    );

    if (!result) {
        throw new Error("Database update failed: Message not found");
    }
}

    async findById(id: string): Promise<Message | null> {
        const rawMessage = await MessageModel.findById(id).lean();

        if (!rawMessage) return null;

        return MessageMapper.toDomain(rawMessage);
    }

    async findByRoomId(roomId: string, limit: number = 50): Promise<Message[]> {
        const rawMessages = await MessageModel.find({
            roomId,
            isDeleted: false
        })
            .limit(limit)
            .lean();

        return rawMessages.map(raw => MessageMapper.toDomain(raw));
    }

    async delete(id: string): Promise<void> {
        await MessageModel.updateOne(
            { _id: id },
            { $set: { isDeleted: true } }
        );
    }
}