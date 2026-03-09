import React, { useState } from 'react';
import { RefreshCw, UserCircle } from "lucide-react";
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingOverlay from '../components/LoadingOverlay';

const LandingPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(0);

    const { handleSignUp, loading } = useAuth();

    // Generate avatars
    const avatars = [1, 2, 3, 4, 5, 7, 8, 9, 10].map(id => `https://api.dicebear.com/7.x/avataaars/svg?seed=${id * 13}`);

    const handleRandomize = () => {
        const randomId = Math.floor(Math.random() * avatars.length);
        setSelectedAvatar(randomId);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username.trim() || loading) return;

        // Pass both username and the avatar URL to the hook
        handleSignUp(username, avatars[selectedAvatar]);
    };

    return (
        <div className="min-h-screen bg-surface-950 text-surface-50 flex items-center justify-center p-6 relative overflow-hidden">

            {/* Background lighting */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-500/20 blur-[140px] rounded-full" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent-500/20 blur-[140px] rounded-full" />
            </div>

            <main className="w-full max-w-md relative z-10">

                <header className="text-center mb-10 space-y-4">
                    {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold tracking-widest uppercase">
                        <Sparkles size={12} /> New Profile
                    </div> */}
                    <h1 className="text-5xl font-black tracking-tight bg-linear-to-b from-white via-primary-400 to-accent-400 bg-clip-text text-transparent">
                        VoteSphere
                    </h1>
                    <p className="text-sm text-surface-50/50">Create your player profile to get started</p>
                </header>

                <div className="p-px rounded-container bg-linear-to-br from-primary-500/30 via-transparent to-accent-400/30">
                    <div className="bg-surface-900/70 backdrop-blur-xl border border-border-subtle rounded-container p-8 shadow-2xl relative overflow-hidden">

                        {loading && <LoadingOverlay />}

                        <form className="space-y-8" onSubmit={onSubmit}>

                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative group">
                                    <div className="w-28 h-28 rounded-full border-2 border-primary-500/50 p-1.5 bg-surface-800 shadow-inner overflow-hidden">
                                        <img
                                            src={avatars[selectedAvatar]}
                                            alt="Selected Avatar"
                                            className="w-full h-full rounded-full object-cover bg-surface-900"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleRandomize}
                                        disabled={loading}
                                        className="absolute bottom-1 right-1 bg-primary-500 text-white p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all border-2 border-surface-900 disabled:opacity-50"
                                        title="Randomize Avatar"
                                    >
                                        <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                                    </button>
                                </div>
                                <span className="text-xs font-bold text-primary-400 uppercase tracking-widest">Select icon</span>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="username" className="text-xs font-bold text-primary-400 uppercase tracking-widest ml-1">
                                    Username
                                </label>
                                <div className="relative">
                                    <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400/60" />
                                    <input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        disabled={loading}
                                        placeholder="e.g. striker_07"
                                        className="w-full bg-surface-800 border border-border-subtle rounded-xl py-4 pl-12 pr-4 text-base
                                        text-white placeholder:text-surface-50/20 font-medium
                                        focus:border-primary-400 focus:ring-4 focus:ring-primary-400/20
                                        outline-none transition-all disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-linear-to-r from-primary-500 via-primary-400 to-accent-400
                                hover:brightness-110 active:scale-[0.98]
                                text-white font-bold py-4 rounded-xl shadow-xl shadow-primary-500/20 transition-all disabled:opacity-50"
                            >
                                {loading ? "Creating Sphere..." : "Create Account"}
                            </button>
                        </form>

                        <div className="text-center mt-8">
                            <p className="text-sm text-surface-50/40 font-medium">
                                Already have an account?{' '}
                                <Link to={'/login'} className="text-primary-400 font-bold hover:text-primary-300 transition-colors">
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;