import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

export const createRoom = createAsyncThunk(
    'room/createRoom',
    async (roomName: string, { rejectWithValue }) => {
        try {
            const response = await api.post('/rooms/create', { title: roomName });
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to create room');
        }
    }
);

export const joinRoom = createAsyncThunk(
    'room/joinTeam',
    async (roomCode: string, { rejectWithValue }) => {
        try {
            const response = await api.post('/rooms/join', { code: roomCode });
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to join room');
        }
    }
);

export const getRoomById = createAsyncThunk(
    'rooms/getById',
    async (roomId: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`/rooms/${roomId}`);
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const getUserRooms = createAsyncThunk(
    'room/getUserRooms',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`/rooms/user`);
            console.log(response.data)
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch rooms');
        }
    }
);

export const getRoomMessages = createAsyncThunk(
    'room/getMessages',
    async (roomId: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`/room/${roomId}/messages`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);