import { customAlphabet } from 'nanoid';
import { IIDGenerator } from '../../app/interfaces/IIDGenerator';

const alphabet = '2346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnopqrstuvwxyz';

const generator = customAlphabet(alphabet, 10);

export class IdGenerator implements IIDGenerator {
    roomId(): string {
        return `RM_${generator()}`;
    }

    pollId(): string {
        return `PL_${generator()}`;
    }

    userId(): string {
        return `UR_${generator()}`;
    }

    shortId(): string {
        return generator();
    }
}