import { IRoomRepository } from "../../repositories/IRoomRepository.js";
import { IUserRepository } from "../../repositories/IUserRepository.js";
import { IRoomDetailsUseCase } from "../../interfaces/usecases/IRoomUseCase.js";
import { RoomDTO, RoomWithMessages } from "../../../domain/dtos/JoinRoomDTO.js";
import { inject, injectable } from "tsyringe";
import { DI_TOKENS } from "../../../domain/constants/identifier.js";
import { IMessageRepository } from "../../repositories/IMessageRepository.js";

@injectable()
export class RoomDetailsUseCase implements IRoomDetailsUseCase {
    constructor(
        @inject(DI_TOKENS.RoomRepository) private roomRepository: IRoomRepository,
        @inject(DI_TOKENS.UserRepository) private userRepository: IUserRepository,
        @inject(DI_TOKENS.MessageRepository) private messageRepository: IMessageRepository
    ) {}

    async execute(data: RoomDTO): Promise<RoomWithMessages | null> {
        const room = await this.roomRepository.findById(data.roomId);
        if (!room) {
            throw new Error("Room not found.");
        }

        const user = await this.userRepository.findById(data.userId);
        if (!user) {
            throw new Error("User not found.");
        }

        if (!room.hasUser(data.userId)) {
            return null;
        }

        const messages = await this.messageRepository.findByRoomId(data.roomId, 50);

        return {room, messages};
    }
}