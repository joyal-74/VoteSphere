import { User } from "../../domain/entities/User";

export interface IUserRepository {
    save(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findByUserId(userId: string): Promise<User | null>;
}