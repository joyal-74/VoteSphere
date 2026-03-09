import React, { useState } from 'react';
import { LogIn, UserCircle } from "lucide-react";
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingOverlay from '../components/LoadingOverlay';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const { handleLogin, loading } = useAuth();

    const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username.trim() || loading) return; 
        handleLogin(username);
    };

    return (
        <div className="min-h-screen bg-surface-950 text-surface-50 flex items-center justify-center p-6 relative overflow-hidden">
            
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-500/20 blur-[140px] rounded-full" />
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent-500/20 blur-[140px] rounded-full" />
            </div>

            <main className="w-full max-w-md relative z-10">
                <header className="text-center mb-10 space-y-4">
                    {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold tracking-widest uppercase">
                        <Sparkles size={12} /> Welcome Back
                    </div> */}
                    <h1 className="text-5xl font-black tracking-tight bg-linear-to-b from-white via-primary-400 to-accent-400 bg-clip-text text-transparent">
                        VoteSphere
                    </h1>
                    <p className="text-sm text-surface-50/50">Enter your username to resume voting</p>
                </header>

                <div className="p-px rounded-container bg-linear-to-br from-primary-500/30 via-transparent to-accent-400/30">
                    <div className="bg-surface-900/70 backdrop-blur-xl border border-border-subtle rounded-container p-8 shadow-2xl relative overflow-hidden">
                        
                        {loading && <LoadingOverlay />}

                        <form className="space-y-8" onSubmit={onSubmit}>

                            <div className="flex justify-center">
                                <div className="w-20 h-20 rounded-full bg-surface-800 border border-border-subtle flex items-center justify-center text-primary-400 shadow-inner">
                                    <UserCircle size={40} strokeWidth={1.5} />
                                </div>
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
                                        placeholder="Enter your username"
                                        className="w-full bg-surface-800 border border-border-subtle rounded-xl py-4 pl-12 pr-4 text-base
                                        text-white placeholder:text-surface-50/20 font-medium
                                        focus:border-primary-400 focus:ring-4 focus:ring-primary-400/20
                                        outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-linear-to-r from-primary-500 via-primary-400 to-accent-400
                                hover:brightness-110 active:scale-[0.98]
                                text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2
                                shadow-xl shadow-primary-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Sign In
                                <LogIn size={18} />
                            </button>
                        </form>

                        <div className="text-center mt-8">
                            <p className="text-sm text-surface-50/40 font-medium">
                                New to the sphere?{' '}
                                <Link to={'/signup'} className="text-primary-400 font-bold hover:text-primary-300 transition-colors">
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;