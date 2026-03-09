import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser, signUpUser } from '../features/auth/authThunks';
import type { AppDispatch, RootState } from '../app/store';
import { toast } from 'sonner';
import { getUserRooms } from '../features/room/roomThunks';
import { useCallback } from 'react';
import { logout } from '../features/auth/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state: RootState) => state.auth);

    const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,16}$/;

    const validateUsername = (username: string): string | null => {
        const trimmed = username.trim();
        if (!trimmed) return 'Username is required';
        if (!USERNAME_REGEX.test(trimmed)) {
            return 'Username must be 3-16 characters (letters, numbers, and underscores only)';
        }
        return null;
    };

    const handleLogin = async (username: string) => {
        const validationError = validateUsername(username);
        if (validationError) return toast.error(validationError);

        try {
            await dispatch(loginUser({ username })).unwrap();

            const userRooms = await dispatch(getUserRooms()).unwrap();

            if (userRooms?.length > 0) {
                navigate(`/rooms/${userRooms[0].id}`);
            } else {
                navigate('/lobby');
            }
        } catch (err) {
            toast.error(err as string || 'Login failed');
        }
    };

    const handleSignUp = async (username: string, avatar?: string) => {
        const validationError = validateUsername(username);
        if (validationError) return toast.error(validationError);

        try {
            await dispatch(signUpUser({ username, avatar })).unwrap();
            toast.success('Account created!');
            navigate('/rooms');
        } catch (err) {
            toast.error(err as string || 'Signup failed');
        }
    };

    const handleLogout = useCallback(async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            toast.success('Logged out successfully');
        } catch (err) {
            console.error('Logout error:', err);
            toast.error('Session cleared');
        } finally {
            dispatch(logout());
            navigate('/login');
        }
    }, [dispatch, navigate]);

    return { handleLogin, handleSignUp, handleLogout, loading, user, error };
};