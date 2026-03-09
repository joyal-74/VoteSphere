import { inject, injectable } from "tsyringe";
import { DI_TOKENS } from "../../../domain/constants/identifier";
import { IMessageRepository } from "../../repositories/IMessageRepository";
import { ForbiddenError, NotFoundError } from "../../../domain/errors";
import { IEditMessageUseCase } from "../../interfaces/usecases/IMessagesUsecase";
import { MessageSnapshot } from "../../../domain/entities/Message";

@injectable()
export class EditMessageUseCase implements IEditMessageUseCase {
    constructor(
        @inject(DI_TOKENS.MessageRepository) private messageRepo: IMessageRepository
    ) { }

    async execute(data: { messageId: string, userId: string, newContent: string }): Promise<MessageSnapshot> {
        console.log(data)
        const message = await this.messageRepo.findById(data.messageId);
        if (!message) throw new NotFoundError("Message not found");

        if (message.userId.toString() !== data.userId.toString()) {
            throw new ForbiddenError("You can only edit your own messages");
        }

        try {
            console.log("5. Attempting entity edit...");
            message.edit(data.newContent);
            console.log("6. Entity edit successful!");
        } catch (error: any) {
            console.error("❌ Entity Edit Failed:", error.message);
            throw error; // Re-throw so the socket handler sees it
        }
        const snapshot = message.getSnapshot();


        await this.messageRepo.updateContent(
            snapshot.id,
            snapshot.content,
            snapshot.editedAt!
        );

        return snapshot;
    }
}