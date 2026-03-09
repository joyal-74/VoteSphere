import { IUserRepository } from "../../app/repositories/IUserRepository.js";
import { User } from "../../domain/entities/User.js";
import { UserModel } from "../database/models/UserModel.js";
import { UserMapper } from "../mappers/UserMapper.js";

export class UserRepository implements IUserRepository {

    async save(user: User): Promise<User> {
        const data = UserMapper.toPersistence(user);

        let doc;
        if (data._id) {
            doc = await UserModel.findByIdAndUpdate(
                data._id,
                { $set: data },
                { returnDocument: 'after' }
            ).lean();
        } else {
            doc = await UserModel.create(data);
        }

        if (!doc) throw new Error("Failed to save user");
        
        return UserMapper.toDomain(doc);
    }

    async findById(id: string): Promise<User | null> {
        const doc = await UserModel.findById(id).lean();
        return doc ? UserMapper.toDomain(doc) : null;
    }

    async findByUserId(userId: string): Promise<User | null> {
        const doc = await UserModel.findOne({ userId }).lean();
        return doc ? UserMapper.toDomain(doc) : null;
    }

    async findByUsername(userName: string): Promise<User | null> {
        const doc = await UserModel.findOne({ username: userName }).lean();
        return doc ? UserMapper.toDomain(doc) : null;
    }
}