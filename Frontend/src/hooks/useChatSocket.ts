import { useEffect, useCallback } from "react";
import { useSocket } from "../contexts/SocketContext";
import type { Message } from "../domain/interfaces/IMessage";

interface UseChatSocketProps {
    roomId: string;
    onMessageReceived: (message: Message) => void;
    onTypingReceived: (data: { username: string }) => void;
    onMessageUpdated?: (data: { messageId: string; content: string; editedAt: string }) => void;
    onPollCreated?: (poll: any) => void;
    onPollUpdated?: (updatedPoll: any) => void;
}

export const useChatSocket = ({ roomId, onMessageReceived, onTypingReceived, onMessageUpdated, onPollCreated, onPollUpdated }: UseChatSocketProps) => {
    const { socket, isConnected } = useSocket();

    useEffect(() => {
        if (!socket || !isConnected || !roomId) return;

        socket.emit("join_room", roomId);

        const handleNewMessage = (msg: Message) => {
            onMessageReceived(msg);
        };

        const handleMessageUpdated = (data: { messageId: string; content: string; editedAt: string }) => {
            if (onMessageUpdated) onMessageUpdated(data);
        };

        const handlePollCreated = (data: { poll: any }) => {
            if (onPollCreated) onPollCreated(data.poll);
        };

        const handlePollUpdated = (updatedPoll: any) => {
            if (onPollUpdated) onPollUpdated(updatedPoll);
        };
        
        socket.on("new_message", handleNewMessage);
        socket.on("display_typing", onTypingReceived);
        socket.on("message_updated", handleMessageUpdated);
        socket.on("poll_created", handlePollCreated);
        socket.on("poll_updated", handlePollUpdated);

        return () => {
            socket.emit("leave_room", roomId);
            socket.off("new_message", handleNewMessage);
            socket.off("display_typing", onTypingReceived);
            socket.off("message_updated", handleMessageUpdated);
            socket.off("poll_created", handlePollCreated);
            socket.off("poll_updated", handlePollUpdated);
        };
    }, [socket, isConnected, roomId, onMessageReceived, onTypingReceived, onMessageUpdated, onPollCreated, onPollUpdated]);

    const sendMessage = useCallback(
        (content: string, userId: string, username: string, parentMessageId?: string) => {
            if (!socket || !isConnected) return;

            socket.emit("send_message", {
                roomId,
                content,
                userId,
                username,
                parentMessageId
            });
        },
        [socket, isConnected, roomId]
    );

    const editMessage = useCallback(
        (messageId: string,userId : string, newContent: string) => {
            if (!socket || !isConnected) return;

            socket.emit("edit_message", {
                messageId,
                userId,
                newContent
            });
        },
        [socket, isConnected]
    );

    const sendTyping = useCallback((username: string) => {
        if (socket?.connected) {
            socket.emit("typing", { roomId, username });
        }
    }, [socket, roomId]);


    const createPoll = useCallback((pollData: any, userId : string) => {
        if (socket?.connected) {
            socket.emit("create_poll", { roomId, userId, poll: pollData });
        }
    }, [socket, roomId]);

    const castVote = useCallback((pollId: string, optionId: string, userId: string) => {
        if (socket?.connected) {
            socket.emit("cast_vote", { roomId, pollId, optionId, userId });
        }
    }, [socket, roomId]);

    return { sendMessage, editMessage, sendTyping, isConnected, createPoll, castVote };
};