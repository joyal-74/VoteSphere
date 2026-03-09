import { CreateUserDTO, LoginUserDTO } from "../../../domain/dtos/UserDTO";
import { User } from "../../../domain/entities/User";

export interface ICreateUserUseCase {
    execute(data: CreateUserDTO): Promise<User>;
}

export interface ILoginUserUseCase {
    execute(data: LoginUserDTO): Promise<User>;
}

export interface ILogoutUseCase {
    execute(userId: string): Promise<void>;
}

export interface IFindUserUseCase {
    execute(userId: string): Promise<User>;
}