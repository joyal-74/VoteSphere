import { inject, injectable } from "tsyringe";
import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { DI_TOKENS } from "../../../domain/constants/identifier";
import { AppError } from "../../../domain/errors/AppError";
import { IFindUserUseCase } from "../../interfaces/usecases/ICreateUserUseCase";

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