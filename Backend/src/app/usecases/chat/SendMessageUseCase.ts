import { injectable, inject } from "tsyringe";
import { DI_TOKENS } from "../../../domain/constants/identifier";
import { IMessageRepository } from "../../repositories/IMessageRepository";
import { IRoomRepository } from "../../repositories/IRoomRepository";
import { Message, MessageSnapshot } from "../../../domain/entities/Message";
import { BadRequestError, NotFoundError } from "../../../domain/errors";
import { SendMessageDTO } from "../../../domain/dtos/MessageDTO";
import { ISendMessageUseCase } from "../../interfaces/usecases/IMessagesUsecase";


@injectable()
export class SendMessageUseCase implements ISendMessageUseCase {
    constructor(
        @inject(DI_TOKENS.MessageRepository) private messageRepo: IMessageRepository,
        @inject(DI_TOKENS.RoomRepository) private roomRepo: IRoomRepository
    ) {}

    async execute(data: SendMessageDTO): Promise<MessageSnapshot> {
        const room = await this.roomRepo.findById(data.roomId);
        if (!room) {
            throw new NotFoundError("Room not found.");
        }

        if (!room.hasUser(data.userId)) {
            throw new BadRequestError("You must join the room before chatting.");
        }

        const message = new Message({
            roomId: data.roomId,
            userId: data.userId,
            username: data.username,
            content: data.content,
            createdAt: new Date(),
            parentMessageId: data.parentMessageId
        });

        const savedMessage = await this.messageRepo.create(message);

        return savedMessage.getSnapshot();
    }
}