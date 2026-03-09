import { SendMessageDTO } from "../../../domain/dtos/MessageDTO.js";
import { MessageSnapshot } from "../../../domain/entities/Message.js";

export interface ISendMessageUseCase {
    execute(data: SendMessageDTO): Promise<MessageSnapshot>;
}

export interface IEditMessageUseCase {
    execute(data: { messageId: string, userId: string, newContent: string }) : Promise<MessageSnapshot>;
}