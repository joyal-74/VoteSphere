export interface UserSnapshot {
    id?: string;
    userId: string;
    avatar: string;
    username: string;
    createdAt?: Date;
}

export class User {
    private _id?: string;
    private _userId: string;
    private _avatar: string;
    private _username: string;
    private _createdAt?: Date;


    constructor(
        userId: string,
        username: string,
        avatar: string,
        id?: string,
        createdAt? : Date
    ) {
        if (!username.trim()) throw new Error("Invalid username");

        this._id = id;
        this._userId = userId;
        this._avatar = avatar;
        this._username = username;
        this._createdAt = createdAt
    }

    get id() {
        return this._id;
    }

    get username() {
        return this._username;
    }

    get userId() {
        return this._userId;
    }

    get avatar() {
        return this._avatar;
    }

    get createdAt() {
        return this._createdAt;
    }

    public getSnapshot(): UserSnapshot {
        return {
            id: this._id,
            userId: this._userId,
            avatar: this._avatar,
            username: this._username,
            createdAt: this._createdAt
        };
    }
}