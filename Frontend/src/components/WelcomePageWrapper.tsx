import { useOutletContext } from "react-router-dom";
import WelcomeState from "./WelcomeState";

export const WelcomePageWrapper = () => {
    const { setIsSidebarOpen } = useOutletContext<{ setIsSidebarOpen: (val: boolean) => void }>();
    return <WelcomeState onToggleSidebar={() => setIsSidebarOpen(true)} />;
};