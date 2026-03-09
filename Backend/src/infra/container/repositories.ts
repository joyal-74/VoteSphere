import { container } from "tsyringe";
import { DI_TOKENS } from "../../domain/constants/identifier";
import { UserRepository } from "../repositories/UserRepository";
import { RoomRepository } from "../repositories/RoomRepository";
import { MessageRepository } from "../repositories/MessageRepository";

container.register(DI_TOKENS.UserRepository, { useClass: UserRepository });
container.register(DI_TOKENS.RoomRepository, { useClass: RoomRepository });
container.register(DI_TOKENS.MessageRepository, { useClass: MessageRepository });