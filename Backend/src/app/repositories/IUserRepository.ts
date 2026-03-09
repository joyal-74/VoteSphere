import { User } from "../../domain/entities/User.js";

export interface IUserRepository {
    save(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findByUserId(userId: string): Promise<User | null>;
}