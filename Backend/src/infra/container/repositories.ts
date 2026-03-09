import { container } from "tsyringe";
import { DI_TOKENS } from "../../domain/constants/identifier.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { RoomRepository } from "../repositories/RoomRepository.js";
import { MessageRepository } from "../repositories/MessageRepository.js";

container.register(DI_TOKENS.UserRepository, { useClass: UserRepository });
container.register(DI_TOKENS.RoomRepository, { useClass: RoomRepository });
container.register(DI_TOKENS.MessageRepository, { useClass: MessageRepository });