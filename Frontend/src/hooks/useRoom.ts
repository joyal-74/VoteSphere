import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRoom, getRoomById, joinRoom } from '../features/room/roomThunks';
import type { AppDispatch, RootState } from '../app/store';
import { toast } from 'sonner';
import { useCallback } from 'react';

export const useRoom = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { loading, error, currentRoom, rooms } = useSelector((state: RootState) => state.room);

    const fetchRoomDetails = useCallback(async (roomId: string) => {

        const result = await dispatch(getRoomById(roomId));

        if (getRoomById.rejected.match(result)) {
            toast.error("Room not found or access denied");
            navigate('/rooms');
        }
    }, [dispatch, navigate]);

    const handleCreateRoom = async (roomName: string) => {
        if (!roomName.trim()) return toast.error("Room name is required");

        const result = await dispatch(createRoom(roomName));

        if (createRoom.fulfilled.match(result)) {
            toast.success(`Room "${roomName}" created`);
            navigate(`/room/${result.payload.id}`);
        } else {
            toast.error(result.payload as string || 'Failed to create room');
        }
    };

    const handleJoinRoom = async (roomCode: string) => {
        if (!roomCode.trim()) return toast.error("Enter a valid code");

        const result = await dispatch(joinRoom(roomCode));
        if (joinRoom.fulfilled.match(result)) {
            const data = result.payload;
            toast.success(`Joined "${data?.title || 'Room'}"`);
            navigate(`/room/${data.id}`);
        } else {
            toast.error(result.payload as string || 'Failed to join room');
        }
    };

    return {
        handleCreateRoom,
        handleJoinRoom,
        fetchRoomDetails,
        currentRoom,
        rooms,
        loading,
        error
    };
};