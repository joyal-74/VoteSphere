import { injectable, inject } from "tsyringe";
import { DI_TOKENS } from "../../../domain/constants/identifier";
import { ICreateUserUseCase, IFindUserUseCase, ILoginUserUseCase, ILogoutUseCase } from "../../../app/interfaces/usecases/ICreateUserUseCase";
import { IHttpRequest } from "../interfaces/IHttp";
import { HttpResponse, IHttpResult } from "../../../infra/utils/HttpResponse";
import { TokenService } from "../../../infra/services/TokenService";
import { AppError } from "../../../domain/errors/AppError";

@injectable()
export class AuthController {
    constructor(
        @inject(DI_TOKENS.CreateUserUseCase) private _createUserUseCase: ICreateUserUseCase,
        @inject(DI_TOKENS.LoginUserUseCase) private _loginUserUseCase: ILoginUserUseCase,
        @inject(DI_TOKENS.FindUserUseCase) private _findUserUseCase: IFindUserUseCase,
        @inject(DI_TOKENS.LogoutUseCase) private _logoutUseCase: ILogoutUseCase,
        @inject(DI_TOKENS.TokenService) private _tokenService: TokenService
    ) { }

    public login = async (request: IHttpRequest): Promise<IHttpResult> => {
        const { username } = request.body;
        const user = await this._loginUserUseCase.execute({ username });
        const snapshot = user.getSnapshot();

        const tokens = this._tokenService.generateTokens({
            userId: snapshot.id!,
            username: snapshot.username
        });

        return HttpResponse.ok({
            user: snapshot,
            ...tokens
        });
    };

    public signup = async (request: IHttpRequest): Promise<IHttpResult> => {
        const { username, avathar } = request.body;
        const user = await this._createUserUseCase.execute({ username, avathar });
        const snapshot = user.getSnapshot();

        const tokens = this._tokenService.generateTokens({
            userId: snapshot.id!,
            username: snapshot.username
        });

        return HttpResponse.created({
            user: snapshot,
            ...tokens
        });
    };


    public refresh = async (request: IHttpRequest): Promise<IHttpResult> => {
        const refreshToken = request.cookies?.refreshToken;

        if (!refreshToken) throw new AppError("Refresh token missing", 401);

        const decoded = this._tokenService.verifyRefreshToken(refreshToken) as any;
        if (!decoded) throw new AppError("Invalid or expired refresh token", 403);

        const tokens = this._tokenService.generateTokens({
            userId: decoded.userId,
            username: decoded.username
        });

        return HttpResponse.ok({ ...tokens });
    };

    public findUser = async (request: IHttpRequest): Promise<IHttpResult> => {
        const userId = request.userId;

        if (!userId) {
            throw new AppError("Not authenticated", 401);
        }

        const user = await this._findUserUseCase.execute(userId);

        return HttpResponse.ok({ user: user.getSnapshot() });
    };

    public logout = async (request: IHttpRequest): Promise<IHttpResult> => {
        const userId = request.userId;

        if (!userId) {
            throw new AppError("Not authenticated", 401);
        }

        await this._logoutUseCase.execute(userId);

        return HttpResponse.ok({ message: "Logged out successfully" });
    };
}