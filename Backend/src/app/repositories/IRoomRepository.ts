import { Room } from "../../domain/entities/Room.js";

export interface IRoomRepository {
    save(room: Room): Promise<void>;

    findById(roomId: string): Promise<Room | null>;

    findByUserId(userId: string): Promise<Room[] | null>;

    delete(roomId: string): Promise<void>;

    findAll(): Promise<Room[]>;
}