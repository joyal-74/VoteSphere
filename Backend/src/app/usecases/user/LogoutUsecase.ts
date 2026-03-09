import { inject, injectable } from "tsyringe";
import { ILogoutUseCase } from "../../interfaces/usecases/ICreateUserUseCase";
import { IUserRepository } from "../../repositories/IUserRepository";
import { DI_TOKENS } from "../../../domain/constants/identifier";
import { AppError } from "../../../domain/errors/AppError";

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