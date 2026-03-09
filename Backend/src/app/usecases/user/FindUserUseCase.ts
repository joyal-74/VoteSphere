import { inject, injectable } from "tsyringe";
import { User } from "../../../domain/entities/User.js";
import { IUserRepository } from "../../repositories/IUserRepository.js";
import { DI_TOKENS } from "../../../domain/constants/identifier.js";
import { AppError } from "../../../domain/errors/AppError.js";
import { IFindUserUseCase } from "../../interfaces/usecases/ICreateUserUseCase.js";

@injectable()
export class FindUserUseCase implements IFindUserUseCase {
    constructor(
        @inject(DI_TOKENS.UserRepository) private _userRepository: IUserRepository
    ) {}

    async execute(userId: string): Promise<User> {
        if (!userId) {
            throw new AppError("User ID is required", 400);
        }

        const user = await this._userRepository.findById(userId);

        if (!user) {
            throw new AppError("User session not found", 404);
        }

        return user;
    }
}