import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, signUpUser } from '../features/auth/authThunks';
import type { AppDispatch, RootState } from '../app/store';
import { toast } from 'sonner';
import { getUserRooms } from '../features/room/roomThunks';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state: RootState) => state.auth);

    const handleLogin = async (username: string) => {
        if (!username.trim()) return toast.error('Enter a username');

        const result = await dispatch(loginUser({ username }));

        if (loginUser.fulfilled.match(result)) {
            const roomsAction = await dispatch(getUserRooms());
            const userRooms = roomsAction.payload;
            
            if (userRooms && userRooms.length > 0) {
                navigate(`/rooms/${userRooms[0].id}`);
            } else {
                navigate('/lobby');
            }
        } else {
            toast.error(result.payload as string || 'Login failed');
        }
    };

    const handleSignUp = async (username: string, avatar?: string) => {
        if (!username.trim()) return toast.error('Username is required');

        const result = await dispatch(signUpUser({ username, avatar }));

        if (signUpUser.fulfilled.match(result)) {
            toast.success('Account created!');
            navigate('/rooms');
        } else {
            toast.error(result.payload as string || 'Signup failed');
        }
    };

    return { handleLogin, handleSignUp, loading, user, error };
};