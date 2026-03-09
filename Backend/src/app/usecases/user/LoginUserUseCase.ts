import { inject, injectable } from "tsyringe";
import { CreateUserDTO } from "../../../domain/dtos/UserDTO";
import { User } from "../../../domain/entities/User";
import { ILoginUserUseCase } from "../../interfaces/usecases/ICreateUserUseCase";
import { IUserRepository } from "../../repositories/IUserRepository";
import { DI_TOKENS } from "../../../domain/constants/identifier";
import { BadRequestError } from "../../../domain/errors";

@injectable()
export class LoginUserUseCase implements ILoginUserUseCase {
    constructor(
        @inject(DI_TOKENS.UserRepository) private _userRepository: IUserRepository,
    ) {}

    async execute(data: CreateUserDTO): Promise<User> {
        const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,16}$/;
        
        if (!data.username || !USERNAME_REGEX.test(data.username)) {
            throw new BadRequestError("Invalid username or password."); 
        }

        const user = await this._userRepository.findByUsername(data.username);
        if (!user) {
            throw new Error("Username not in use.");
        }

        return user;
    }
}