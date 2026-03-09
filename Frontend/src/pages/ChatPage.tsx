import React, { useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import CreatePollModal from "./CreatePollModal";
import LoadingOverlay from "../components/LoadingOverlay";
import { useChatLogic } from "../hooks/useChatLogic";
import ChatArea from "../components/ChatArea";

const ChatPage: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();

    const { setIsSidebarOpen } = useOutletContext<{ setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>> }>();

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
                roomTitle={currentRoom.title}
                roomInitial={currentRoom.title.charAt(0).toUpperCase()}
                currentUser={user}
                messages={messages}
                polls={currentRoom.polls}
                replyTo={replyTo}
                onVote={handleVote}
                editingMessage={editingMessage}
                onStartEditing={startEditing}
                onCancelAction={cancelAction}
                setReplyTo={setReplyTo}
                messageText={messageText}
                typingUser={typingUser}
                scrollRef={scrollRef}
                onToggleSidebar={() => setIsSidebarOpen(true)}
                onTogglePollModal={() => setIsPollModalOpen(true)}
                onSendMessage={handleSendMessage}
                onInputChange={handleInputChange}
            />
        </>
    );
};

export default ChatPage;