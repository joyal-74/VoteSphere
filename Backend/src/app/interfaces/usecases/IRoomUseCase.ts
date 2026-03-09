import { CreatePollDTO } from "../../../domain/dtos/CreatePollDTO.js";
import { CreateRoomDTO } from "../../../domain/dtos/CreateRoomDTO.js";
import { JoinRoomDTO, RoomDTO, RoomWithMessages } from "../../../domain/dtos/JoinRoomDTO.js";
import { VoteDTO } from "../../../domain/dtos/VoteDTO.js";
import { PollSnapshot } from "../../../domain/entities/Poll.js";
import { Room, RoomSnapshot } from "../../../domain/entities/Room.js";

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