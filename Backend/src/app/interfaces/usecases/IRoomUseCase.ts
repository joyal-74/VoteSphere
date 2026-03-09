import { CreatePollDTO } from "../../../domain/dtos/CreatePollDTO";
import { CreateRoomDTO } from "../../../domain/dtos/CreateRoomDTO";
import { JoinRoomDTO, RoomDTO, RoomWithMessages } from "../../../domain/dtos/JoinRoomDTO";
import { VoteDTO } from "../../../domain/dtos/VoteDTO";
import { PollSnapshot } from "../../../domain/entities/Poll";
import { Room, RoomSnapshot } from "../../../domain/entities/Room";

export interface ICreateRoomUseCase {
    execute(data: CreateRoomDTO): Promise<Room>;
}

export interface IJoinRoomUseCase {
    execute(data: JoinRoomDTO): Promise<Room>;
}

export interface IRoomDetailsUseCase {
    execute(data: RoomDTO): Promise<RoomWithMessages | null>;
}

export interface IGetUserRoomsUsecase {
    execute(userId : string): Promise<Room[] | null>;
}

export interface ICreatePollUseCase {
    execute(data: CreatePollDTO): Promise<RoomSnapshot>;
}

export interface IVoteUseCase {
    execute(data: VoteDTO): Promise<PollSnapshot>;
}