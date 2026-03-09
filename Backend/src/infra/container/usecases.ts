import { container } from "tsyringe";
import { DI_TOKENS } from "../../domain/constants/identifier";
import { CreateUserUseCase } from "../../app/usecases/user/CreateUserUseCase";
import { SendMessageUseCase } from "../../app/usecases/chat/SendMessageUseCase";
import { CreateRoomUseCase } from "../../app/usecases/room/CreateRoomUseCase";
import { JoinRoomUseCase } from "../../app/usecases/room/JoinRoomUseCases";
import { CreatePollUseCase } from "../../app/usecases/poll/CreatePollUseCase";
import { VoteUseCase } from "../../app/usecases/poll/VoteUseCase";
import { EditMessageUseCase } from "../../app/usecases/chat/EditMessageUseCase";
import { LoginUserUseCase } from "../../app/usecases/user/LoginUserUseCase";
import { FindUserUseCase } from "../../app/usecases/user/FindUserUseCase";
import { RoomDetailsUseCase } from "../../app/usecases/room/RoomDetailsUseCase";
import { GetUserRoomsUsecase } from "../../app/usecases/room/GetUserRoomsUsecase";

// user
container.register(DI_TOKENS.CreateUserUseCase, { useClass: CreateUserUseCase });
container.register(DI_TOKENS.LoginUserUseCase, { useClass: LoginUserUseCase });
container.register(DI_TOKENS.FindUserUseCase, { useClass: FindUserUseCase });

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