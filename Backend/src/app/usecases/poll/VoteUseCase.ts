import { inject, injectable } from "tsyringe";
import { VoteDTO } from "../../../domain/dtos/VoteDTO.js";
import { IVoteUseCase } from "../../interfaces/usecases/IRoomUseCase.js";
import { IRoomRepository } from "../../repositories/IRoomRepository.js";
import { DI_TOKENS } from "../../../domain/constants/identifier.js";
import { Poll, PollSnapshot } from "../../../domain/entities/Poll.js";
import { NotFoundError } from "../../../domain/errors/index.js";

@injectable()
export class VoteUseCase implements IVoteUseCase {
    constructor(
        @inject(DI_TOKENS.RoomRepository) private roomRepository: IRoomRepository
    ) { }

    async execute(data: VoteDTO): Promise<PollSnapshot> {
        const room = await this.roomRepository.findById(data.roomId);
        if (!room) throw new Error("Room not found.");

        room.vote(data.pollId, data.optionId, data.userId);

        await this.roomRepository.save(room);

        const snapshot = room.getSnapshot();
        const poll = snapshot.polls.find((p) => p.id === data.pollId);

        if(!poll) {
            throw new NotFoundError('Poll not found') 
        }

        return poll;
    }
}