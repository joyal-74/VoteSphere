import { inject, injectable } from "tsyringe";
import { CreateUserDTO } from "../../../domain/dtos/UserDTO";
import { User } from "../../../domain/entities/User";
import { ILoginUserUseCase } from "../../interfaces/usecases/ICreateUserUseCase";
import { IUserRepository } from "../../repositories/IUserRepository";
import { DI_TOKENS } from "../../../domain/constants/identifier";

@injectable()
export class LoginUserUseCase implements ILoginUserUseCase {
    constructor(
        @inject(DI_TOKENS.UserRepository) private _userRepository: IUserRepository,
    ) {}

    async execute(data: CreateUserDTO): Promise<User> {
        const user = await this._userRepository.findByUsername(data.username);
        if (!user) {
            throw new Error("Username not in use.");
        }

        return user;
    }
}