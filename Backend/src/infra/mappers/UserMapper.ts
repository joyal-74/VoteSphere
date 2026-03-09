import { User } from "../../domain/entities/User";

export class UserMapper {
    static toDomain(raw: any): User {
        return new User(
            raw.userId,
            raw.username,
            raw._id.toString(),
            raw.createdAt
        );
    }

    static toPersistence(user: User) {
        return {
            userId: user.userId,
            username: user.username,
            _id: user.id,
            createdAt: user.createdAt
        };
    }
}