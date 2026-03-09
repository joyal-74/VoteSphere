import { Room } from "../../../domain/entities/Room";

import { ICreateRoomUseCase } from "../../interfaces/usecases/IRoomUseCase"; 
import { CreateRoomDTO } from "../../../domain/dtos/CreateRoomDTO";
import { inject, injectable } from "tsyringe";
import { DI_TOKENS } from "../../../domain/constants/identifier";
import { IRoomRepository } from "../../repositories/IRoomRepository";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IIDGenerator } from "../../interfaces/IIDGenerator";

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