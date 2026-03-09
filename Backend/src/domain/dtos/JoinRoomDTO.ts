import { Message } from "../entities/Message.js";
import { Room } from "../entities/Room.js";

export interface RoomDTO {
    roomId: string;
    userId: string;
}

export interface RoomWithMessages {
    room: Room;
    messages: Message[];
}

export interface JoinRoomDTO extends RoomDTO {};