import { inject, injectable } from "tsyringe";
import { ILogoutUseCase } from "../../interfaces/usecases/ICreateUserUseCase.js";
import { IUserRepository } from "../../repositories/IUserRepository.js";
import { DI_TOKENS } from "../../../domain/constants/identifier.js";
import { AppError } from "../../../domain/errors/AppError.js";

@injectable()
export class LogoutUseCase implements ILogoutUseCase {
    constructor(
        @inject(DI_TOKENS.UserRepository) private _userRepository: IUserRepository,
    ) {}

    async execute(userId : string): Promise<void> {
        const user = await this._userRepository.findById(userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }
    }
}