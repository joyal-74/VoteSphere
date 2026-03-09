export interface CreatePollDTO {
    roomId: string;
    userId: string;
    question: string;
    options: { id: string; text: string }[];
}