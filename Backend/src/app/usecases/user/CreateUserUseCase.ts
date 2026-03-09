import { inject, injectable } from "tsyringe";
import { CreateUserDTO } from "../../../domain/dtos/UserDTO";
import { User } from "../../../domain/entities/User";
import { IIDGenerator } from "../../interfaces/IIDGenerator";
import { ICreateUserUseCase } from "../../interfaces/usecases/ICreateUserUseCase";
import { IUserRepository } from "../../repositories/IUserRepository";
import { DI_TOKENS } from "../../../domain/constants/identifier";

@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
    constructor(
        @inject(DI_TOKENS.UserRepository) private _userRepository: IUserRepository,
        @inject(DI_TOKENS.IDGenerator) private _idGenerator: IIDGenerator
    ) {}

    async execute(data: CreateUserDTO): Promise<User> {
        console.log(data)
        const existingUser = await this._userRepository.findByUsername(data.username);
        
        if (existingUser) {
            throw new Error("Username is already in use.");
        }

        const userId = this._idGenerator.userId();

        const user = new User(
            userId,
            data.username,
            data.avatar
        );

        await this._userRepository.save(user);

        return user;
    }
}