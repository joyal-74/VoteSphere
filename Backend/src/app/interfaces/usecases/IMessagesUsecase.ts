import { SendMessageDTO } from "../../../domain/dtos/MessageDTO";
import { MessageSnapshot } from "../../../domain/entities/Message";

export interface ISendMessageUseCase {
    execute(data: SendMessageDTO): Promise<MessageSnapshot>;
}

export interface IEditMessageUseCase {
    execute(data: { messageId: string, userId: string, newContent: string }) : Promise<MessageSnapshot>;
}