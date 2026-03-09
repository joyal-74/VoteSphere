import { PollOption } from "../valueobjects/PollOption.js";

export interface PollSnapshot {
    id: string;
    question: string;
    createdBy: string;
    isActive: boolean;
    createdAt: Date;
    options: {
        id: string;
        text: string;
        votes: number;
    }[];
    votedUserIds : string[];
    votes: { userId: string; optionId: string }[];
}

export class Poll {
    private readonly _id: string;
    private readonly _question: string;
    private readonly _createdBy: string;
    private readonly _options: PollOption[];
    private _isActive: boolean;
    private readonly _createdAt: Date;
    private readonly _votedUserIds: Set<string>;
    private _votes: Map<string, string>;

    constructor(params: {
        id: string;
        question: string;
        createdBy: string;
        options: { id: string; text: string }[];
        createdAt?: Date;
    }) {
        if (!params.question || !params.question.trim()) {
            throw new Error("Poll question cannot be empty.");
        }

        if (!params.options || params.options.length < 2) {
            throw new Error("Poll must have at least 2 options.");
        }

        const optionIds = new Set(params.options.map(o => o.id));
        if (optionIds.size !== params.options.length) {
            throw new Error("Poll options must have unique IDs.");
        }

        this._id = params.id;
        this._question = params.question.trim();
        this._createdBy = params.createdBy;
        this._options = params.options.map(
            opt => new PollOption(opt.id, opt.text)
        );
        this._isActive = true;
        this._createdAt = params.createdAt ?? new Date();
        this._votedUserIds = new Set();
        this._votes = new Map();
    }

    get id(): string {
        return this._id;
    }

    get question(): string {
        return this._question;
    }

    get isActive(): boolean {
        return this._isActive;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get createdBy(): string { return this._createdBy; }


    public vote(optionId: string, userId: string): void {
        if (!this._isActive) throw new Error("Poll is closed.");
        
        const option = this._options.find(o => o.id === optionId);
        if (!option) throw new Error("Invalid poll option.");

        // TOGGLE LOGIC: Check if user already voted
        if (this._votedUserIds.has(userId)) {
            const existingOptionId = this._votes.get(userId);

            if (existingOptionId === optionId) {
                option.removeVote();
                this._votedUserIds.delete(userId);
                this._votes.delete(userId);
                return;
            } else {
                const oldOption = this._options.find(o => o.id === existingOptionId);
                oldOption?.removeVote();
                option.addVote();
                this._votes.set(userId, optionId);
                return;
            }
        }

        // CASE: New Vote
        option.addVote();
        this._votedUserIds.add(userId);
        this._votes.set(userId, optionId);
    }

    public close(): void {
        this._isActive = false;
    }

    static rehydrate(data: any): Poll {
        const poll = new Poll({
            id: data.id,
            question: data.question,
            createdBy: data.createdBy,
            options: data.options.map((o: any) => ({ id: o.id, text: o.text })),
            createdAt: data.createdAt
        });

        poll._isActive = data.isActive;
        
        data.votes?.forEach((v: any) => {
            poll._votedUserIds.add(v.userId);
            poll._votes.set(v.userId, v.optionId);
        });

        poll._options.forEach(option => {
            const savedOption = data.options.find((o: any) => o.id === option.id);
            if (savedOption) option.restoreVotes(savedOption.votes);
        });

        return poll;
    }

    public getSnapshot(): PollSnapshot {
        return {
            id: this._id,
            question: this._question,
            isActive: this._isActive,
            createdBy: this._createdBy,
            createdAt: this._createdAt,
            options: this._options.map(option => ({
                id: option.id,
                text: option.text,
                votes: option.votes
            })),
            votedUserIds: Array.from(this._votedUserIds),

            votes: Array.from(this._votes.entries()).map(([userId, optionId]) => ({
                userId,
                optionId
            }))
        };
    }
}