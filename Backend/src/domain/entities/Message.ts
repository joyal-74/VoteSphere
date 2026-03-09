export interface MessageSnapshot {
    id: string;
    roomId: string;
    userId: string;
    username: string;
    content: string;
    createdAt: Date;
    parentMessageId?: string;
    editedAt?: Date;
    isDeleted: boolean;
}


export class Message {
    private _id?: string;
    private _roomId: string;
    private _userId: string;
    private _username: string;
    private _content: string;
    private _parentMessageId?: string;
    private _createdAt: Date;
    private _editedAt?: Date;
    private _isDeleted: boolean = false;

    constructor(params: {
        id?: string;
        roomId: string;
        userId: string;
        username: string;
        content: string;
        parentMessageId?: string;
        createdAt?: Date;
        editedAt?: Date;
        isDeleted?: boolean;
    }) {
        if (!params.content || params.content.trim().length === 0) {
            throw new Error("Message content cannot be empty.");
        }

        if (params.content.length > 500) {
            throw new Error("Message exceeds maximum length (500 characters).");
        }

        this._id = params.id;
        this._roomId = params.roomId;
        this._userId = params.userId;
        this._username = params.username;
        this._content = params.content.trim();
        this._parentMessageId = params.parentMessageId;
        this._isDeleted = params.isDeleted ?? false
        this._createdAt = params.createdAt ?? new Date();
        this._editedAt = params.editedAt;
    }

    // Getters
    get id() {
        return this._id;
    }

    get roomId() {
        return this._roomId;
    }

    get userId() {
        return this._userId;
    }

    get username() {
        return this._username;
    }

    get content() {
        return this._content;
    }

    get createdAt() {
        return this._createdAt;
    }

    get editedAt() {
        return this._editedAt;
    }

    get isDeleted() {
        return this._isDeleted;
    }

    delete() {
        this._isDeleted = true;
    }

    // Domain behavior
    edit(newContent: string) {
        console.log("Domain Entity: Editing content to", newContent);
        if (!newContent || newContent.trim().length === 0) {
            throw new Error("Edited message cannot be empty.");
        }

        if (newContent.length > 500) {
            throw new Error("Message exceeds maximum length (500 characters).");
        }

        this._content = newContent.trim();
        this._editedAt = new Date();
    }

    public getSnapshot(): MessageSnapshot {
        return {
            id: this._id || "",
            roomId: this._roomId,
            userId: this._userId,
            username: this._username,
            content: this._content,
            parentMessageId: this._parentMessageId,
            createdAt: this._createdAt,
            editedAt: this._editedAt,
            isDeleted: this._isDeleted
        };
    }
}