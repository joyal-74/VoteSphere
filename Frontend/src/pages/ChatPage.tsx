import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CreatePollModal from "./CreatePollModal";
import LoadingOverlay from "../components/LoadingOverlay";
import { useChatLogic } from "../hooks/useChatLogic";
import ChatArea from "../components/ChatArea";

const ChatPage: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const [isPollModalOpen, setIsPollModalOpen] = useState(false);

    const {
        currentRoom,
        loading,
        messages,
        messageText,
        typingUser,
        scrollRef,
        handleSendMessage,
        handleInputChange,
        user,
        replyTo,
        setReplyTo,
        editingMessage,
        startEditing,
        cancelAction,
        handleCreatePoll,
        handleVote
    } = useChatLogic(roomId);

    const hasRoomData = currentRoom && Object.keys(currentRoom).length > 0;

    if (loading && !hasRoomData) return <LoadingOverlay />;
    if (!hasRoomData) return null;

    return (
        <>
            <CreatePollModal
                isOpen={isPollModalOpen}
                roomId={roomId!}
                userId={user?.id || ''}
                onClose={() => setIsPollModalOpen(false)}
                onLaunch={handleCreatePoll}
            />

            <ChatArea
                room={currentRoom}
                currentUser={user}
                messages={messages}
                messageText={messageText}
                replyTo={replyTo}
                setReplyTo={setReplyTo}
                editingMessage={editingMessage}
                onStartEditing={startEditing}
                onCancelAction={cancelAction}
                typingUser={typingUser}
                scrollRef={scrollRef}
                onTogglePollModal={() => setIsPollModalOpen(true)}
                onSendMessage={handleSendMessage}
                onInputChange={handleInputChange}
                onVote={handleVote}
            />
        </>
    );
};

export default ChatPage;