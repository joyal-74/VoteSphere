import { User } from "../../domain/entities/User.js";

export class UserMapper {
    static toDomain(raw: any): User {
        return new User(
            raw.userId,
            raw.username,
            raw.avatar,
            raw._id.toString(),
            raw.createdAt
        );
    }

    static toPersistence(user: User) {
        return {
            userId: user.userId,
            avatar: user.avatar,
            username: user.username,
            _id: user.id,
            createdAt: user.createdAt
        };
    }
}