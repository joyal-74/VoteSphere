export interface IIDGenerator {
    roomId(): string;
    pollId(): string;
    userId(): string;
    shortId(): string;
} 