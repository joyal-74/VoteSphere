import { inject, injectable } from "tsyringe";
import { CreateUserDTO } from "../../../domain/dtos/UserDTO.js";
import { User } from "../../../domain/entities/User.js";
import { IIDGenerator } from "../../interfaces/IIDGenerator.js";
import { ICreateUserUseCase } from "../../interfaces/usecases/ICreateUserUseCase.js";
import { IUserRepository } from "../../repositories/IUserRepository.js";
import { DI_TOKENS } from "../../../domain/constants/identifier.js";
import { BadRequestError } from "../../../domain/errors/index.js";

@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
    constructor(
        @inject(DI_TOKENS.UserRepository) private _userRepository: IUserRepository,
        @inject(DI_TOKENS.IDGenerator) private _idGenerator: IIDGenerator
    ) { }

    async execute(data: CreateUserDTO): Promise<User> {
        const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,16}$/;

        if (!data.username || !USERNAME_REGEX.test(data.username)) {
            throw new BadRequestError("Username must be 3-16 characters and contain only letters, numbers, or underscores.");
        }

        const existingUser = await this._userRepository.findByUsername(data.username);

        if (existingUser) {
            throw new BadRequestError("Username is already in use.");
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