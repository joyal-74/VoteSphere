import { IRoomRepository } from "../../app/repositories/IRoomRepository";
import { Room } from "../../domain/entities/Room";
import { RoomModel } from "../database/models/RoomModel";
import { RoomMapper } from "../mappers/RoomMapper";

export class RoomRepository implements IRoomRepository {
    async save(room: Room): Promise<any> {
        const persistence = RoomMapper.toPersistence(room);

        const updatedDoc = await RoomModel.findByIdAndUpdate(
            persistence._id,
            { $set: persistence },
            {
                upsert: true,
                runValidators: true
            }
        ).lean();

        return updatedDoc;
    }

    async findById(roomId: string): Promise<Room | null> {
        const doc = await RoomModel.findById(roomId).lean();

        if (!doc) return null;

        return RoomMapper.toDomain(doc);
    }

    async findByUserId(userId: string): Promise<Room[] | null> {
        const docs = await RoomModel.find({ users: userId });

        if (!docs || docs.length === 0) {
            return [];
        }

        return docs.map(doc => RoomMapper.toDomain(doc));
    }

    async delete(roomId: string): Promise<void> {
        await RoomModel.findByIdAndDelete(roomId);
    }

    async findAll(): Promise<Room[]> {
        const docs = await RoomModel.find().lean();
        return docs.map(doc => RoomMapper.toDomain(doc));
    }
}