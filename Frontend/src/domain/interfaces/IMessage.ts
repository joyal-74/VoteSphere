export interface Message {
    _id: string;
    id: string;
    roomId: string;
    userId: string;
    username: string;
    content: string;
    parentMessageId?: string;
    createdAt: string;
    isDeleted: boolean;
}