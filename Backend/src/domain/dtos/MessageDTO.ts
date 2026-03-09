export interface SendMessageDTO {
    roomId: string;
    userId: string;
    username: string;
    content: string;
    parentMessageId: string;
}