import { container } from "tsyringe";
import { DI_TOKENS } from "../../domain/constants/identifier";
import { IdGenerator } from "../utils/IdGenerator";
import { TokenService } from "../services/TokenService";


container.register(DI_TOKENS.IDGenerator, { useClass: IdGenerator });
container.register(DI_TOKENS.TokenService, { useClass: TokenService });