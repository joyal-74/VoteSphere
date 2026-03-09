import { Message } from "../entities/Message";
import { Room } from "../entities/Room";

export interface RoomDTO {
    roomId: string;
    userId: string;
}

export interface RoomWithMessages {
    room: Room;
    messages: Message[];
}

export interface JoinRoomDTO extends RoomDTO {};