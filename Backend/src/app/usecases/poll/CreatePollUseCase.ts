import { inject, injectable } from "tsyringe";
import { CreatePollDTO } from "../../../domain/dtos/CreatePollDTO";
import { Poll } from "../../../domain/entities/Poll";
import { IIDGenerator } from "../../interfaces/IIDGenerator";
import { ICreatePollUseCase } from "../../interfaces/usecases/IRoomUseCase";
import { IRoomRepository } from "../../repositories/IRoomRepository";
import { DI_TOKENS } from "../../../domain/constants/identifier";
import { RoomSnapshot } from "../../../domain/entities/Room";

@injectable()
export class CreatePollUseCase implements ICreatePollUseCase {
    constructor(
        @inject(DI_TOKENS.RoomRepository) private roomRepository: IRoomRepository,
        @inject(DI_TOKENS.IDGenerator) private idGenerator: IIDGenerator
    ) { }

    async execute(data: CreatePollDTO): Promise<RoomSnapshot> {
        console.log(data)
        const room = await this.roomRepository.findById(data.roomId);
        if (!room) {
            throw new Error("Room not found.");
        }

        const optionsWithIds = data.options.map(opt => ({
            id: this.idGenerator.shortId(),
            text: opt.text,
            votes: 0
        }));

        const poll = new Poll({
            id: this.idGenerator.pollId(),
            question: data.question,
            createdBy: data.userId,
            options: optionsWithIds,
        });

        room.createPoll(poll);
        await this.roomRepository.save(room);

        return room.getSnapshot();
    }
}