import { CreateUserDTO, LoginUserDTO } from "../../../domain/dtos/UserDTO";
import { User } from "../../../domain/entities/User";

export interface ICreateUserUseCase {
    execute(data: CreateUserDTO): Promise<User>;
}

export interface ILoginUserUseCase {
    execute(data: LoginUserDTO): Promise<User>;
}

export interface IFindUserUseCase {
    execute(userId: string): Promise<User>;
}