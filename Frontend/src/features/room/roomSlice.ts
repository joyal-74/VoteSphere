import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createRoom, getRoomById, getUserRooms, joinRoom } from './roomThunks';
import type { Message } from '../../domain/interfaces/IMessage';

interface RoomState {
    rooms: any[];
    currentRoom: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: RoomState = {
    rooms: [],
    currentRoom: null,
    loading: false,
    error: null,
};

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        clearRoomError: (state) => { state.error = null; },
        setCurrentRoom: (state, action: PayloadAction<any>) => {
            state.currentRoom = action.payload;
        },
        addMessageToCurrentRoom: (state, action) => {
            if (state.currentRoom) {
                state.currentRoom.messages = [...(state.currentRoom.messages || []), action.payload];
            }
        },
        updateMessageInRoom: (state, action) => {
            const updatedMsg: Message = action.payload;
            if (state.currentRoom) {
                const index = state.currentRoom.messages.findIndex((m: Message) => {
                    const mId = m.id || m._id;
                    const uId = updatedMsg.id || updatedMsg._id;
                    return mId === uId;
                });

                if (index !== -1) {
                    state.currentRoom.messages[index] = {
                        ...state.currentRoom.messages[index],
                        ...updatedMsg
                    };
                } else {
                    console.warn("Match not found for ID:", updatedMsg.id || updatedMsg._id);
                }
            }
        },

        addPollToRoom: (state, action: PayloadAction<any>) => {
            if (state.currentRoom) {
                if (!state.currentRoom.polls) {
                    state.currentRoom.polls = [];
                }

                const exists = state.currentRoom.polls.some(p => p.id === action.payload.id);

                if (!exists) {
                    state.currentRoom.polls.push(action.payload);
                }
            }
        },

        updatePollInRoom: (state, action: PayloadAction<any>) => {
            if (state.currentRoom?.polls) {
                const index = state.currentRoom.polls.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.currentRoom.polls[index] = action.payload;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.loading = false;
                state.currentRoom = action.payload;
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(joinRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(joinRoom.fulfilled, (state, action) => {
                state.loading = false;
                state.currentRoom = action.payload;
            })
            .addCase(joinRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getRoomById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRoomById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentRoom = action.payload;
                console.log(action.payload)
            })
            .addCase(getRoomById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getUserRooms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserRooms.fulfilled, (state, action) => {
                state.loading = false;
                state.rooms = action.payload;
            })
            .addCase(getUserRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

    },
});

export const { clearRoomError, setCurrentRoom, addMessageToCurrentRoom, updateMessageInRoom, addPollToRoom, updatePollInRoom } = roomSlice.actions;
export default roomSlice.reducer;