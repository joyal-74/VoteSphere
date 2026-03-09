import { IRoomRepository } from "../../repositories/IRoomRepository";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IGetUserRoomsUsecase } from "../../interfaces/usecases/IRoomUseCase";
import { Room } from "../../../domain/entities/Room";
import { inject, injectable } from "tsyringe";
import { DI_TOKENS } from "../../../domain/constants/identifier";

@injectable()
export class GetUserRoomsUsecase implements IGetUserRoomsUsecase {
    constructor(
        @inject(DI_TOKENS.RoomRepository) private roomRepository: IRoomRepository,
        @inject(DI_TOKENS.UserRepository) private userRepository: IUserRepository,
    ) {}

    async execute(userId : string): Promise<Room[] | null> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found.");
        }

        const rooms = await this.roomRepository.findByUserId(userId);

        return rooms;
    }
}