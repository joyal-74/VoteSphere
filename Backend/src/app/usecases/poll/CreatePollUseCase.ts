import { inject, injectable } from "tsyringe";
import { CreatePollDTO } from "../../../domain/dtos/CreatePollDTO.js";
import { Poll } from "../../../domain/entities/Poll.js";
import { IIDGenerator } from "../../interfaces/IIDGenerator.js";
import { ICreatePollUseCase } from "../../interfaces/usecases/IRoomUseCase.js";
import { IRoomRepository } from "../../repositories/IRoomRepository.js";
import { DI_TOKENS } from "../../../domain/constants/identifier.js";
import { RoomSnapshot } from "../../../domain/entities/Room.js";

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