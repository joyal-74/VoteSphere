import { Message } from "../../domain/entities/Message";

export interface IMessageRepository {
    create(message: Message): Promise<Message>;
    updateContent(messageId: string, content: string, editedAt: Date): Promise<void>;
    save(message: Message): Promise<void>;
    findById(id: string): Promise<Message | null>;
    findByRoomId(roomId: string, limit?: number): Promise<Message[]>;
    delete(id: string): Promise<void>;
}