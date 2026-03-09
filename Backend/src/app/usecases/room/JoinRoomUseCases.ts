import { IRoomRepository } from "../../repositories/IRoomRepository";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IJoinRoomUseCase } from "../../interfaces/usecases/IRoomUseCase";
import { JoinRoomDTO } from "../../../domain/dtos/JoinRoomDTO";
import { Room } from "../../../domain/entities/Room";
import { inject, injectable } from "tsyringe";
import { DI_TOKENS } from "../../../domain/constants/identifier";

@injectable()
export class JoinRoomUseCase implements IJoinRoomUseCase {
    constructor(
        @inject(DI_TOKENS.RoomRepository) private roomRepository: IRoomRepository,
        @inject(DI_TOKENS.UserRepository) private userRepository: IUserRepository
    ) {}

    async execute(data: JoinRoomDTO): Promise<Room> {
        const room = await this.roomRepository.findById(data.roomId);
        if (!room) {
            throw new Error("Room not found.");
        }

        const user = await this.userRepository.findById(data.userId);
        if (!user) {
            throw new Error("User not found.");
        }

        if (room.hasUser(data.userId)) {
            return room;
        }

        room.addUser(data.userId);

        await this.roomRepository.save(room);

        return room;
    }
}