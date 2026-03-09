import { Poll } from "./Poll.js";

export interface RoomSnapshot {
    id: string;
    title: string;
    createdBy: string;
    users: string[];
    polls: ReturnType<Poll["getSnapshot"]>[];
    createdAt: Date;
}

export class Room {
    private readonly _id: string;
    private readonly _title: string;
    private readonly _createdBy: string;
    private readonly _createdAt: Date;

    private _users: Set<string>;
    private _polls: Poll[];

    constructor(params: {
        id: string;
        title: string;
        createdBy: string;
        createdAt?: Date;
        polls?: Poll[];
    }) {
        if (!params.title || !params.title.trim()) {
            throw new Error("Room title cannot be empty.");
        }

        this._id = params.id;
        this._title = params.title.trim();
        this._createdBy = params.createdBy;
        this._createdAt = params.createdAt ?? new Date();

        this._users = new Set([params.createdBy]);
        this._polls = params.polls ?? [];
    }

    // ---------- Getters ----------
    get id(): string { return this._id; }
    get title(): string { return this._title; }
    get createdBy(): string { return this._createdBy; }
    get createdAt(): Date { return this._createdAt; }

    public addUser(userId: string): void {
        if (!userId || !userId.trim()) throw new Error("Invalid user.");
        this._users.add(userId);
    }

    public hasUser(userId: string): boolean {
        return this._users.has(userId);
    }

    // ---------- Poll Logic ----------

    public createPoll(poll: Poll): void {
        const hasActive = this._polls.some(p => p.isActive);
        if (hasActive) {
            throw new Error("There is already an active poll. Close it first.");
        }
        this._polls.push(poll);
    }

    private getActivePoll(): Poll | undefined {
        return this._polls.find(p => p.isActive);
    }

    public vote(pollId: string, optionId: string, userId: string): void {
        if (!this.hasUser(userId)) {
            throw new Error("User is not part of this room.");
        }
        const poll = this._polls.find(p => p.id === pollId);

        if (!poll) {
            throw new Error("Poll not found.");
        }

        poll.vote(optionId, userId);
    }

    public closePoll(): void {
        const activePoll = this.getActivePoll();
        if (!activePoll) {
            throw new Error("No active poll to close.");
        }
        activePoll.close();
    }

    public getSnapshot(): RoomSnapshot {
        return {
            id: this._id,
            title: this._title,
            createdBy: this._createdBy,
            users: Array.from(this._users),
            polls: this._polls.map(poll => poll.getSnapshot()),
            createdAt: this._createdAt
        };
    }
}