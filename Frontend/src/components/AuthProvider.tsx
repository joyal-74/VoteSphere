import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "./LoadingOverlay";
import { getCurrentUser } from "../features/auth/authThunks";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../app/store";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { isInitialized } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

    if (!isInitialized) {
        return <LoadingOverlay />; 
    }

    return <>{children}</>;
};

export default AuthProvider;