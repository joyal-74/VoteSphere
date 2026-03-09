import React, { useState } from "react";
import { PlusCircle, Key, MoveRight } from "lucide-react";
import { useRoom } from "../hooks/useRoom";
import LoadingOverlay from "../components/LoadingOverlay";

const EntryLobby: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"join" | "create">("join");
    const [inputValue, setInputValue] = useState("");

    const { handleCreateRoom, handleJoinRoom, loading } = useRoom();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (activeTab === "create") {
            handleCreateRoom(inputValue);
        } else {
            handleJoinRoom(inputValue);
        }
    };

    return (
        <div className="min-h-screen bg-surface-950 text-surface-50 flex items-center justify-center p-6 relative overflow-hidden">

            {/* Background lighting - Using Tailwind spacing scale */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-500/25 blur-[140px] rounded-full" />
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent-500/25 blur-[140px] rounded-full" />
            </div>

            <main className="w-full max-w-md relative z-10">

                {/* Header */}
                <header className="text-center mb-10 space-y-4">
                    {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold tracking-widest uppercase">
                        <Sparkles size={12} /> Live Consensus
                    </div> */}

                    <h1 className="text-5xl font-black tracking-tight bg-linear-to-b from-white via-primary-400 to-accent-400 bg-clip-text text-transparent">
                        VoteSphere
                    </h1>

                    <p className="text-sm text-surface-50/50">
                        Create or join a real-time voting room
                    </p>
                </header>

                {/* Gradient border wrapper using theme radius */}
                <div className="p-px rounded-container bg-linear-to-br from-primary-500/30 via-transparent to-accent-400/30">

                    {/* Card */}
                    <div className="bg-surface-900/70 backdrop-blur-xl border border-border-subtle rounded-container p-8 shadow-2xl">
                        {loading && <LoadingOverlay />}

                        {/* Tabs */}
                        <div className="flex bg-surface-800 rounded-xl p-1 mb-8">
                            {(["join", "create"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200
                                    ${activeTab === tab
                                            ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                                            : "text-surface-50/50 hover:text-surface-50"
                                        }`}
                                >
                                    {tab === "join" ? "Join Room" : "Create Room"}
                                </button>
                            ))}
                        </div>

                        {/* Form */}
                        <form className="space-y-6" onSubmit={onSubmit}>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-primary-400 font-bold ml-1">
                                    {activeTab === "create" ? "Room Name" : "Room Code"}
                                </label>

                                <div className="relative">
                                    {activeTab === "create" ? (
                                        <PlusCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400/60" />
                                    ) : (
                                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400/60" />
                                    )}

                                    <input
                                        type="text"
                                        placeholder={activeTab === "create" ? "Enter room name" : "VS-000-000"}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="w-full bg-surface-800 border border-border-subtle rounded-xl py-4 pl-12 pr-4 text-base
                                        text-white placeholder:text-surface-50/20 font-medium
                                        focus:border-primary-400 focus:ring-4 focus:ring-primary-400/20
                                        outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* CTA */}
                            <button
                                type="submit"
                                className="w-full bg-linear-to-r from-primary-500 via-primary-400 to-accent-400
                hover:brightness-110 active:scale-[0.98]
                text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2
                shadow-xl shadow-primary-500/20 transition-all"
                            >
                                {activeTab === "create" ? "Create Room" : "Join Room"}
                                <MoveRight className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>

                <p className="mt-10 text-center text-surface-50/30 text-xs font-medium tracking-[0.2em] uppercase">
                    fast &middot; anonymous &middot; real-time
                </p>
            </main>
        </div>
    );
};

export default EntryLobby;