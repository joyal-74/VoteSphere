import { Room } from "../../../domain/entities/Room.js";

import { ICreateRoomUseCase } from "../../interfaces/usecases/IRoomUseCase.js"; 
import { CreateRoomDTO } from "../../../domain/dtos/CreateRoomDTO.js";
import { inject, injectable } from "tsyringe";
import { DI_TOKENS } from "../../../domain/constants/identifier.js";
import { IRoomRepository } from "../../repositories/IRoomRepository.js";
import { IUserRepository } from "../../repositories/IUserRepository.js";
import { IIDGenerator } from "../../interfaces/IIDGenerator.js";

@injectable()
export class CreateRoomUseCase implements ICreateRoomUseCase {
    constructor(
        @inject(DI_TOKENS.RoomRepository) private roomRepository: IRoomRepository,
        @inject(DI_TOKENS.UserRepository) private userRepository: IUserRepository,
        @inject(DI_TOKENS.IDGenerator) private idGenerator: IIDGenerator
    ) {}

    async execute(data: CreateRoomDTO): Promise<Room> {
        const creator = await this.userRepository.findById(data.createdBy);
        if (!creator) {
            throw new Error("Creator user not found.");
        }

        const roomId = this.idGenerator.roomId();

        const room = new Room({
            id: roomId,
            title: data.title,
            createdBy: data.createdBy,
        });


        await this.roomRepository.save(room);

        return room;
    }
}