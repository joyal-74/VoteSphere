import { injectable, inject } from "tsyringe";
import { DI_TOKENS } from "../../../domain/constants/identifier";
import { ICreateRoomUseCase, IGetUserRoomsUsecase, IJoinRoomUseCase, IRoomDetailsUseCase, IVoteUseCase } from "../../../app/interfaces/usecases/IRoomUseCase";
import { IHttpRequest } from "../interfaces/IHttp";
import { HttpResponse } from "../../../infra/utils/HttpResponse";
import { AppError } from "../../../domain/errors/AppError";


@injectable()
export class RoomController {
    constructor(
        @inject(DI_TOKENS.CreateRoomUseCase) private createRoomUseCase: ICreateRoomUseCase,
        @inject(DI_TOKENS.JoinRoomUseCase) private joinRoomUseCase: IJoinRoomUseCase,
        @inject(DI_TOKENS.RoomDetailsUseCase) private roomDetailsUseCase: IRoomDetailsUseCase,
        @inject(DI_TOKENS.GetUserRoomsUsecase) private getUserRoomsUsecase: IGetUserRoomsUsecase,
        @inject(DI_TOKENS.VoteUseCase) private voteUseCase: IVoteUseCase
    ) { }

    create = async (request: IHttpRequest) => {
        const title = request.body.title;
        const userId = request.userId;

        if (!userId) throw new AppError("Authentication required", 401);

        const room = await this.createRoomUseCase.execute({ title, createdBy: userId });

        return HttpResponse.created(room.getSnapshot());
    }

    join = async (request: IHttpRequest) => {
        const roomId = request.body.code;
        const userId = request.userId;

        if (!userId) throw new AppError("Authentication required", 401);

        const room = await this.joinRoomUseCase.execute({ roomId, userId });

        return HttpResponse.ok(room.getSnapshot());
    }

    details = async (request: IHttpRequest) => {
        const roomId = request.params.roomId;
        const userId = request.userId;

        if (!userId) throw new AppError("Authentication required", 401);

        const result = await this.roomDetailsUseCase.execute({ roomId, userId });

        if (!result) throw new AppError("User not in this room", 404);

        const { room, messages } = result;

        const cleanMessages = messages.map(message => message.getSnapshot());

        return HttpResponse.ok({ ...room.getSnapshot(), messages: cleanMessages });
    }

    myRooms = async (request: IHttpRequest) => {
        const userId = request.userId;

        if (!userId) throw new AppError("Authentication required", 401);

        const rooms = await this.getUserRoomsUsecase.execute(userId);

        if (!rooms) return HttpResponse.ok([]);

        const cleanRooms = rooms.map(room => room.getSnapshot());

        return HttpResponse.ok(cleanRooms);
    }


    vote = async (request: IHttpRequest) => {
        const { roomId } = request.params;
        const { pollId, optionId, userId } = request.body;

        await this.voteUseCase.execute({ roomId, pollId, optionId, userId });

        return HttpResponse.ok({ message: "Vote cast successfully" });
    }
}