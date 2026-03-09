import { singleton, inject } from "tsyringe";
import { Server, Socket } from "socket.io";
import http from "http";
import { ICreatePollUseCase, IVoteUseCase } from "../../app/interfaces/usecases/IRoomUseCase";
import { DI_TOKENS } from "../../domain/constants/identifier";
import { VoteDTO } from "../../domain/dtos/VoteDTO";
import { IEditMessageUseCase, ISendMessageUseCase } from "../../app/interfaces/usecases/IMessagesUsecase";
import { SendMessageDTO } from "../../domain/dtos/MessageDTO";
import { CreatePollDTO } from "../../domain/dtos/CreatePollDTO";

@singleton()
export class SocketServer {
    private io: Server | null = null;

    constructor(
        @inject(DI_TOKENS.VoteUseCase) private _voteUseCase: IVoteUseCase,
        @inject(DI_TOKENS.SendMessageUseCase) private _sendMessageUseCase: ISendMessageUseCase,
        @inject(DI_TOKENS.CreatePollUseCase) private _createPollUseCase: ICreatePollUseCase,
        @inject(DI_TOKENS.EditMessageUseCase) private _editMessageUseCase: IEditMessageUseCase
    ) { }

    public init(server: http.Server) {
        const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
        this.io = new Server(server, {
            cors: {
                origin: clientUrl,
                credentials: true
            }
        });

        this.setupHandlers();
        return this.io;
    }

    public getIO(): Server {
        if (!this.io) throw new Error("Socket.IO not initialized");
        return this.io;
    }

    private setupHandlers() {
        const io = this.io;
        if (!io) return;

        io.on("connection", (socket: Socket) => {

            socket.on("cast_vote", async (data: VoteDTO) => {
                try {
                    const updatedPoll = await this._voteUseCase.execute(data);

                    io.to(data.roomId).emit("poll_updated", updatedPoll);

                } catch (error: any) {
                    socket.emit("error", error.message);
                }
            });

            socket.on("send_message", async (data: SendMessageDTO) => {

                try {
                    const savedMessage = await this._sendMessageUseCase.execute(data);

                    io.to(data.roomId).emit("new_message", savedMessage);

                } catch (error: any) {
                    socket.emit("error", { message: error.message });
                }
            });

            socket.on("edit_message", async (data: { messageId: string; userId: string; newContent: string }) => {
                try {
                    const updatedMessage = await this._editMessageUseCase.execute(data);

                    io.to(updatedMessage.roomId).emit("message_updated", updatedMessage);

                } catch (error: any) {
                    socket.emit("error", { message: error.message });
                }
            });

            socket.on("create_poll", async (incomingData: any) => {
                try {
                    // Flatten the nested structure
                    const dto: CreatePollDTO = {
                        roomId: incomingData.roomId,
                        userId: incomingData.userId,
                        question: incomingData.poll.question,
                        options: incomingData.poll.options
                    };

                    const roomSnapshot = await this._createPollUseCase.execute(dto);

                    // Broadcast the last poll added
                    const latestPoll = roomSnapshot.polls[roomSnapshot.polls.length - 1];
                    io.to(dto.roomId).emit("poll_created", { poll: latestPoll });

                } catch (error: any) {
                    socket.emit("error", { message: error.message });
                }
            });

            socket.on("typing", (data: { roomId: string; username: string }) => {
                socket.to(data.roomId).emit("display_typing", data);
            });

            socket.on("join_room", (roomId: string) => {
                socket.join(roomId);
            });

            socket.on("leave_room", (roomId: string) => {
                socket.leave(roomId);
            });

        });
    }
}