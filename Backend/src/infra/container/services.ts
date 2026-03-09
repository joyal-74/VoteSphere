import { container } from "tsyringe";
import { DI_TOKENS } from "../../domain/constants/identifier.js";
import { IdGenerator } from "../utils/IdGenerator.js";
import { TokenService } from "../services/TokenService.js";


container.register(DI_TOKENS.IDGenerator, { useClass: IdGenerator });
container.register(DI_TOKENS.TokenService, { useClass: TokenService });