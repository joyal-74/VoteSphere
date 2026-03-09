import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (payload: { username: string; avatar?: string }, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/login', payload);
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

export const signUpUser = createAsyncThunk(
    'auth/signUpUser',
    async (payload: { username: string; avatar?: string }, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/signup', payload);
            return response.data.user;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Signup failed');
        }
    }
);

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/auth/me');
            return response.data.data; 
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Session expired');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await api.post('/auth/logout'); 
            return true;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Logout failed');
        }
    }
);