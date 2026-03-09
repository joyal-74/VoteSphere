export class PollOption {
    private readonly _id: string;
    private readonly _text: string;
    private _votes: number;

    constructor(id: string, text: string) {
        if (!text || !text.trim()) {
            throw new Error("Poll option text cannot be empty.");
        }

        this._id = id;
        this._text = text.trim();
        this._votes = 0;
    }

    get id(): string {
        return this._id;
    }

    get text(): string {
        return this._text;
    }

    get votes(): number {
        return this._votes;
    }

    public addVote(): void {
        this._votes++;
    }

    removeVote(): void {
        if (this._votes > 0) this._votes--;
    }

    restoreVotes(count: number): void {
        this._votes = count;
    }
}