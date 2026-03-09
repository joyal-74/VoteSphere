import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router";
import { Toaster } from "sonner";
import AuthProvider from "./components/AuthProvider";
import { SocketProvider } from "./components/SocketProvider";


function App() {
    return (
        <>
            <Toaster
                expand={false}
                position="top-right"
                toastOptions={{
                    unstyled: true,
                    classNames: {
                        toast: 'w-full max-w-[320px] min-h-[60px] flex items-center gap-3 p-4 rounded-xl bg-surface-900/90 backdrop-blur-xl border border-border-subtle shadow-2xl shadow-black/40 overflow-hidden relative transition-all duration-300',
                        title: 'text-sm font-bold text-surface-50 tracking-tight',
                        success: 'text-primary-400',
                        error: 'text-accent-400',
                    },
                }}
            />

            <AuthProvider>
                <SocketProvider>
                    <RouterProvider router={router} />
                </SocketProvider>
            </AuthProvider>
        </>
    )
}

export default App
