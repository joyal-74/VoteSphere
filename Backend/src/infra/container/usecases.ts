import { container } from "tsyringe";
import { DI_TOKENS } from "../../domain/constants/identifier.js";
import { CreateUserUseCase } from "../../app/usecases/user/CreateUserUseCase.js";
import { SendMessageUseCase } from "../../app/usecases/chat/SendMessageUseCase.js";
import { CreateRoomUseCase } from "../../app/usecases/room/CreateRoomUseCase.js";
import { JoinRoomUseCase } from "../../app/usecases/room/JoinRoomUseCases.js";
import { CreatePollUseCase } from "../../app/usecases/poll/CreatePollUseCase.js";
import { VoteUseCase } from "../../app/usecases/poll/VoteUseCase.js";
import { EditMessageUseCase } from "../../app/usecases/chat/EditMessageUseCase.js";
import { LoginUserUseCase } from "../../app/usecases/user/LoginUserUseCase.js";
import { FindUserUseCase } from "../../app/usecases/user/FindUserUseCase.js";
import { RoomDetailsUseCase } from "../../app/usecases/room/RoomDetailsUseCase.js";
import { GetUserRoomsUsecase } from "../../app/usecases/room/GetUserRoomsUsecase.js";
import { LogoutUseCase } from "../../app/usecases/user/LogoutUsecase.js";

// user
container.register(DI_TOKENS.CreateUserUseCase, { useClass: CreateUserUseCase });
container.register(DI_TOKENS.LoginUserUseCase, { useClass: LoginUserUseCase });
container.register(DI_TOKENS.FindUserUseCase, { useClass: FindUserUseCase });
container.register(DI_TOKENS.LogoutUseCase, { useClass: LogoutUseCase });

//room
container.register(DI_TOKENS.CreateRoomUseCase, { useClass: CreateRoomUseCase });
container.register(DI_TOKENS.JoinRoomUseCase, { useClass: JoinRoomUseCase });
container.register(DI_TOKENS.RoomDetailsUseCase, { useClass: RoomDetailsUseCase });
container.register(DI_TOKENS.GetUserRoomsUsecase, { useClass: GetUserRoomsUsecase });

// poll
container.register(DI_TOKENS.CreatePollUseCase, { useClass: CreatePollUseCase });
container.register(DI_TOKENS.VoteUseCase, { useClass: VoteUseCase });

// chat
container.register(DI_TOKENS.SendMessageUseCase, { useClass: SendMessageUseCase });
container.register(DI_TOKENS.EditMessageUseCase, { useClass: EditMessageUseCase });