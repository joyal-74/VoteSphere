import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRoom } from "./useRoom";
import { useChatSocket } from "./useChatSocket";
import { useAuth } from "./useAuth";
import { getUserRooms } from "../features/room/roomThunks";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { addMessageToCurrentRoom, addPollToRoom, updateMessageInRoom, updatePollInRoom } from "../features/room/roomSlice";

export const useChatLogic = (roomId: string | undefined) => {
    const { user } = useAuth();
    const { currentRoom, fetchRoomDetails, rooms, loading } = useRoom();
    const dispatch = useDispatch<AppDispatch>();

    const messages = useMemo(() => {
        return currentRoom?.messages || [];
    }, [currentRoom?.messages]);
    console.log(messages)

    const [messageText, setMessageText] = useState("");
    const [typingUser, setTypingUser] = useState<string | null>(null);
    const [replyTo, setReplyTo] = useState<any | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [editingMessage, setEditingMessage] = useState<any | null>(null);

    useEffect(() => {
        if (user && rooms.length === 0) {
            dispatch(getUserRooms());
        }
    }, [user, rooms.length, dispatch]);

    useEffect(() => {
        if (roomId && currentRoom?.id !== roomId) {
            fetchRoomDetails(roomId);
        }
    }, [roomId, currentRoom?.id, fetchRoomDetails]);

    const handleNewMessage = useCallback((newMessage: any) => {
        dispatch(addMessageToCurrentRoom(newMessage));
    }, [dispatch])

    const handleTyping = useCallback(({ username }: { username: string }) => {
        if (username === user?.username) return;
        setTypingUser(username);

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => setTypingUser(null), 3000);
    }, [user?.username]);

    const cancelAction = () => {
        setEditingMessage(null);
        setReplyTo(null);
        setMessageText("");
    };

    const startEditing = (msg: any) => {
        setReplyTo(null);
        setEditingMessage(msg);
        setMessageText(msg.content);
    };

    const handleCreatePoll = (pollData: any, userId : string) => {
        createPoll(pollData, userId);
    };

    const handlePollUpdated = useCallback((updatedPoll: any) => {
        dispatch(updatePollInRoom(updatedPoll));
    }, [dispatch]);

    const handlePollCreated = useCallback((newPoll: any) => {
        dispatch(addPollToRoom(newPoll));
    }, [dispatch]);

    const { sendMessage, sendTyping, editMessage, createPoll, castVote } = useChatSocket({
        roomId: roomId || "",
        onMessageReceived: handleNewMessage,
        onTypingReceived: handleTyping,
        onMessageUpdated: (updatedData) => {
            dispatch(updateMessageInRoom(updatedData));
        },
        onPollCreated: handlePollCreated,
        onPollUpdated: handlePollUpdated
    });

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (!messageText.trim() || !user) return;

        if (editingMessage) {
            editMessage(editingMessage.id || editingMessage._id, user.id, messageText);
            setEditingMessage(null);
        } else {
            // Standard SEND logic
            sendMessage(
                messageText,
                user.id,
                user.username,
                replyTo?.id || undefined
            );
            setReplyTo(null);
        }

        setMessageText("");
    };

    const handleVote = useCallback((pollId: string, optionId: string) => {
        if (!user) return;
        castVote(pollId, optionId, user.id);
    }, [castVote, user]);


    const handleInputChange = (val: string) => {
        setMessageText(val);
        if (user?.username) sendTyping(user.username);
    };

    return {
        currentRoom,
        rooms,
        loading,
        messages,
        messageText,
        typingUser,
        scrollRef,
        handleSendMessage,
        handleInputChange,
        handleCreatePoll,
        handleVote,
        user,
        replyTo,
        setReplyTo,
        editingMessage,
        startEditing,
        cancelAction
    };
};